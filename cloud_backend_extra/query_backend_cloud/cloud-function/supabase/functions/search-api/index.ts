import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createSupabaseClient, corsHeaders } from './config.ts';
import { handleSearch, handleRunEmbedding, handleHealthCheck, handleNotFound } from './handlers.ts';

Deno.serve(async (req: Request) => {
    // Manejar CORS preflight
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    const url = new URL(req.url);
    const method = req.method;
    
    // Extraer el path después del nombre de la función
    // URL: /functions/v1/search-api/search -> extraemos "/search"
    const pathParts = url.pathname.split('/');
    const functionNameIndex = pathParts.indexOf('search-api');
    
    let pathname = '/';
    if (functionNameIndex !== -1 && pathParts.length > functionNameIndex + 1) {
        // Reconstruir path desde después del nombre de la función
        pathname = '/' + pathParts.slice(functionNameIndex + 1).join('/');
    }

    console.log('=== REQUEST DEBUG ===');
    console.log('Method:', method);
    console.log('Full URL:', req.url);
    console.log('Original pathname:', url.pathname);
    console.log('Extracted pathname:', pathname);
    console.log('Path parts:', pathParts);
    console.log('===================');

    try {
        const supabaseClient = createSupabaseClient(req.headers.get('Authorization')!);

        // Health check
        if (method === 'GET' && pathname === '/') {
            console.log('✓ Matched: GET /');
            return await handleHealthCheck(req, supabaseClient);
        }

        // Search endpoint
        if (method === 'POST' && pathname === '/search') {
            console.log('✓ Matched: POST /search');
            return await handleSearch(req, supabaseClient);
        }

        // Run embedding endpoint
        if (method === 'POST' && pathname === '/system/run_embedding') {
            console.log('✓ Matched: POST /system/run_embedding');
            return await handleRunEmbedding(req, supabaseClient);
        }

        // No route matched
        console.log('✗ No route matched');
        console.log('Available routes:');
        console.log('  GET /');
        console.log('  POST /search');
        console.log('  POST /system/run_embedding');
        
        return handleNotFound();

    } catch (error) {
        console.error('Error general:', error);
        return new Response(
            JSON.stringify({ 
                error: error.message, 
                stack: error.stack,
                timestamp: new Date().toISOString() 
            }),
            { 
                status: 500, 
                headers: {
                    ...corsHeaders,
                    'Content-Type': 'application/json'
                }
            }
        );
    }
});