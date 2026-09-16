const express = require("express");
const moment = require("moment");

const HOST = "127.0.0.1";
const PORT = 8000;

const app = express();

app.use(express.json());

const products = []

function addProduct(name, price, category, image, fail) {
    return new Promise((resolve, reject) => {
        if (fail === "true") {
            return reject();
        }

        products.push({
            name: name,
            price: price,
            category: category,
            image: image ? image : ""
        });

        console.log(products);

        resolve();
    });
}

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

app.post('/products', (req, res) => {
    const { fail } = req.query;
    const { name, price, category, image } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(422).json({ message: 'Invalid product data' });
    }

    const numericPrice = Number(price);
    if (price === undefined || isNaN(numericPrice) || numericPrice < 0) {
        return res.status(422).json({ message: 'Invalid product data' });
    }

    if (!category || typeof category !== 'string' || category.trim() === '') {
        return res.status(422).json({ message: 'Invalid product data' });
    }

    const duplicate = products.find(
        p => p.name.toLowerCase() === name.toLowerCase()
    );

    if (duplicate) {
        return res.status(409).json({ message: 'Conflict' });
    }

    addProduct(name.trim(), numericPrice, category.trim(), image, fail)
        .then(() => {
            res.status(201).json({ message: 'Created' });
        })
        .catch(() => {
            res.status(500).json({ message: 'Internal server error' });
        });
});

app.listen(PORT, HOST, () => {
    console.log(`listening on http://${HOST}:${PORT}`);
});