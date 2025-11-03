import { EmbeddingService } from './embeddingService.ts';

export class SearchService {
    private embeddingService = new EmbeddingService();

    async searchProducts(supabaseClient: any, query: string, matchCount: number = 10) {
        const embedding = await this.embeddingService.createEmbedding(query);

        const { data, error } = await supabaseClient.rpc("match_productos", {
            query_embedding: embedding,
            match_count: matchCount
        });

        if (error) throw error;
        return data;
    }
}