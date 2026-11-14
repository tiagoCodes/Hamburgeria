import "dotenv/config";

import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL);

// Cria o cliente Prisma usando o adapter de conexão com o MariaDB e adiciona uma extensão.
const prisma = new PrismaClient({ adapter }).$extends({
    result: { // Define campos calculados que serão incluídos nos resultados das consultas.
        products: { // Aplica a extensão aos resultados do modelo Products.
            url: { // Define o campo calculado chamado "url".
                needs: { path: true }, // Solicita o campo "path", necessário para calcular a URL.
                compute(products) { // Calcula o valor de "url" para cada produto retornado.
                    return `http://localhost:3000/products-file/${products.path}` // Monta a URL usando o caminho do arquivo do produto.
                }, 
            }, 
        },
    }, 
});

 export default prisma
