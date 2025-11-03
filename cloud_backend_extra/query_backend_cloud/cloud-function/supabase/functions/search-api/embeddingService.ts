import { GoogleGenerativeAI } from "npm:@google/generative-ai";
import { MODEL_EMBEDDING } from './config.ts';

export class EmbeddingService {
    private genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') ?? '');
    private embedModel = this.genAI.getGenerativeModel({ model: MODEL_EMBEDDING });

    async createEmbedding(text: string): Promise<number[]> {
        const result = await this.embedModel.embedContent(text);
        return result.embedding.values;
    }

    async generateProductEmbeddings(supabaseClient: any): Promise<{ message: string; processed: number }> {
        const { data: productos, error: rpcError } = await supabaseClient.rpc("generar_embeddings_productos");

        if (rpcError) throw rpcError;
        if (!productos?.length) return { message: "No hay productos para procesar", processed: 0 };

        let processed = 0;
        for (const p of productos) {
            try {
                const { texto, producto_id } = p;
                const embedding = await this.createEmbedding(texto);

                const { error } = await supabaseClient
                    .from("productos")
                    .update({ embedding })
                    .eq("id", producto_id);

                if (!error) processed++;
            } catch (error) {
                console.error(`Error procesando producto ID ${p.producto_id}:`, error);
            }
        }

        return {
            message: `Embeddings generados para ${processed}/${productos.length} productos`,
            processed
        };
    }
}