import express from "express";
import dotenv from "dotenv";
const app = express();
dotenv.config();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('test')
});

app.listen(port, () => {
    console.log(`port bejalan di http://localhost:${port}`);
});
