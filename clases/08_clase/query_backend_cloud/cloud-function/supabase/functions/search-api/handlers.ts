import { SearchService } from './searchService.ts';
import { EmbeddingService } from './embeddingService.ts';
import { corsHeaders } from './config.ts';

const searchService = new SearchService();
const embeddingService = new EmbeddingService();

export async function handleSearch(req: Request, supabaseClient: any) {
    const { query } = await req.json();

    if (!query) {
        throw new Error('Query parameter is required');
    }

    const results = await searchService.searchProducts(supabaseClient, query);
    return Response.json({ results }, { headers: corsHeaders });
}

export async function handleRunEmbedding(req: Request, supabaseClient: any) {
    const { message, processed } = await embeddingService.generateProductEmbeddings(supabaseClient);

    return Response.json({
        message,
        processed,
        timestamp: new Date().toISOString()
    }, { headers: corsHeaders });
}

export function handleHealthCheck() {
    return Response.json({
        name: "Ferretería Search API",
        status: "OK",
        environment: "production",
        version: "1.0.0",
        timestamp: new Date().toISOString()
    }, { headers: corsHeaders });
}

export function handleNotFound(): Response {
    return new Response(
        JSON.stringify({ 
            error: 'Endpoint not found',
            timestamp: new Date().toISOString()
        }),
        { 
            status: 404,
            headers: {
                ...corsHeaders, // Asegúrate de importar corsHeaders aquí también
                'Content-Type': 'application/json'
            }
        }
    );
}