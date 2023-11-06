import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const app = express();
dotenv.config();
const port = process.env.PORT;

app.get('/products', async (req, res) => {
    const products = await prisma.product.findMany();
    res.send(products);
});

app.listen(port, () => {
    console.log(`port bejalan di http://localhost:${port}`);
});
