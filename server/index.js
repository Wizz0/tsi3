import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let products = [
    { id: 1, title: "Пример товара", description: "Пример описания", price: "5000" }
];

app.get('/api/data', (req,res) => {
    res.json(products);
});

app.post('/api/data', (req,res) => {
    const newProduct = {
        id: products.length + 1,
        ...req.body
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});