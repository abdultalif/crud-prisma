import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {
    const products = await prisma.product.findMany();
    res.send(products);
});

app.get('/product/:id', async (req, res) => {
    const productId = req.params.id;
    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    })
    res.send(product);
});

app.post('/products', async (req, res) => {
    const { name, price, description, image } = req.body;
    await prisma.product.create({
        data: {
            name: name,
            price: price,
            description: description,
            image: image
        }
    });
    res.status(201).send("sukses menyimpan");
});


app.put('/products/:id', async (req, res) => {
    const { name, price, description, image } = req.body;
    const productId = req.params.id;
    await prisma.product.update({
        where: {
            id: productId
        },
        data: {
            name: name,
            price: price,
            description: description,
            image: image
        }
    })
    res.status(201).send("sukses update");
});

app.patch('/products/:id', async (req, res) => {
    const { name, price, description, image } = req.body;
    const productId = req.params.id;
    await prisma.product.update({
        where: {
            id: productId
        },
        data: {
            name: name,
            price: price,
            description: description,
            image: image
        }
    })
    res.status(201).send("sukses update dengan patch");
});


app.delete('/products/:id', async (req, res) => {
    const id = req.params.id;
    await prisma.product.delete({
        where: {
            id: id
        }
    })
    res.status(200).send('berhasil hapus')
});

app.listen(port, () => {
    console.log(`port bejalan di http://localhost:${port}`);
});
