import path from 'path';
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { apiReference } from '@scalar/express-api-reference'

dotenv.config();
const app = express();


const PORT = process.env.PORT ?? 3001
const HOST = process.env.HOST ?? '0.0.0.0'

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const embedModel = genAI.getGenerativeModel({ model: process.env.MODEL_EMBEDDING });


const morganFormat = morgan(':method :url :status :res[content-length] - :response-time ms')



app.use(express.json());



app.use(morganFormat)

app.use('/openapi.yml', express.static(path.join(process.cwd(), 'openapi.yml')));

app.use('/docs',
    apiReference({
        theme: 'purple',
        url: '/openapi.yml',
    }),
)

async function createEmbedding(text) {
    const result = await embedModel.embedContent(text);
    return result.embedding.values;
}

app.get("/", async (req, res) => {
    try {
        return res.json({
            name: "Ferretería Search API",
            description: "API para búsqueda semántica de productos utilizando embeddings.",
            version: "1.0.0",
            status: "OK",
            environment: process.env.NODE_ENV || "development",
            endpoints: {
                docs: "/docs",
                run_embedding: "POST /system/run_embedding",
                search: "POST /search"
            },
            embedding_model: MODEL_EMBEDDING,
            database: process.env.SUPABASE_URL ? "Connected" : "Not configured"
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Unexpected error" });
    }
});


app.post("/system/run_embedding", async (req, res) => {
    try {
        console.log("Iniciando proceso de embeddings...");

        const { data: productos, error: rpcError } = await supabase.rpc("generar_embeddings_productos");

        if (rpcError) {
            console.error("Error al ejecutar la función RPC:", rpcError);
            return res.status(500).json({ error: rpcError.message });
        }

        if (!productos || productos.length === 0) {
            console.log("No hay productos pendientes para generar embeddings.");
            return res.status(200).json({ message: "No hay productos para procesar" });
        }

        console.log(`Procesando embeddings para ${productos.length} productos...`);

        for (const p of productos) {
            
            const {texto, producto_id} = p
            const embedding = await createEmbedding(texto);

            const { data, error } = await supabase
                .from("productos")
                .update({ embedding })
                .eq("id", producto_id)
                .select("id")
                .single();

            if (error) {
                console.error(`Error guardando embedding para ID ${producto_id}`, error);
            } else {
                console.log(`Embedding actualizado para ID ${producto_id}`);
            }
        }

        return res.status(200).json({ message: "Embeddings generados correctamente" });

    } catch (err) {
        console.error("Error general en el endpoint:", err);
        return res.status(500).json({ error: err.message });
    }
});



app.get("/system/status_embeddings", async (req, res) => {

    const { data, error } = await supabase.rpc("match_products", {
        query_embedding: Array(768).fill(0), // Solo para chequear función, NO realiza búsqueda real
        match_count: 1
    });

    const count = await supabase
        .from("productos")
        .select("id", { count: "exact", head: true })
        .not("embedding", "is", null);

    const total = await supabase
        .from("productos")
        .select("id", { count: "exact", head: true });

    return res.json({
        status: "OK",
        productos_con_embedding: count.count,
        productos_totales: total.count,
        pendientes: total.count - count.count
    });
});



app.post("/search", async (req, res) => {
    const { query } = req.body;

    const result = await embedModel.embedContent(query);
    const embedding = result.embedding.values;

    const { data, error } = await supabase.rpc("match_productos", {
        query_embedding: embedding,
        match_count: 10
    });

    if (error) return res.status(400).json({ error });
    return res.json({ results: data });
});



app.listen(PORT, () => console.log(`API SERVE: http://${HOST}:${PORT}`));
