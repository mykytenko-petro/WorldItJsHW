const express = require("express");
const moment = require("moment");

const HOST = "127.0.0.1";
const PORT = 8000;

const app = express();

const products = [
    {
        id: 1,
        name: "product 1",
        price: 2232,
        category: "some category"
    },
    {
        id: 2,
        name: "product 2",
        price: 2232,
        category: "some category"
    },
    {
        id: 3,
        name: "product 3",
        price: 2232,
        category: "some category"
    },
    {
        id: 4,
        name: "product 4",
        price: 2232,
        category: "some category"
    },
    {
        id: 5,
        name: "product 5",
        price: 2232,
        category: "some category"
    },
]

app.get("/timestamp", (_, res) => {
    res.json({
        timestamp: moment().unix()
    });
});

app.get('/health', (_, res) => {
    res.json({
        status: "ok"
    });
});

app.get('/stats', (_, res) => {
    res.json({
        uptime: Math.floor(process.uptime()),
        nodeVersion: process.version,
        timestamp: moment().toISOString()
    });
});

app.get('/products', (req, res) => {
    const { category, take } = req.query;
    let result = [...products];

    if (category) {
        result = result.filter(
            p => p.category.toLowerCase() === category.toLowerCase()
        );
    }

    if (take !== undefined) {
        const limit = parseInt(take);
        
        if (!isNaN(limit) && limit > 0) {
            result = result.slice(0, limit);
        }
    }

    res.status(200).json(result);
});

app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid product ID' });
    }

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
});

app.listen(PORT, HOST, () => {
    console.log(`listening on http://${HOST}:${PORT}`);
});