const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3000;

// MongoDB Atlas connection string
const uri = 'mongodb+srv://admin:admin@cluster0.ybjpmi5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// MongoDB client and DB reference
const client = new MongoClient(uri);
let db;

// Connect to MongoDB once
async function connectToDatabase() {
    try {
        await client.connect();
        db = client.db('watch_store');
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error);
    }
}
connectToDatabase();

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Route to load your products (example)
app.get('/api/products', async (req, res) => {
    try {
        const collection = db.collection('products'); // 🔁 Collection name
        const products = await collection.find().toArray();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Load individual pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/products', (req, res) => res.sendFile(path.join(__dirname, 'public/products.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'public/about.html')));
app.get('/basket', (req, res) => res.sendFile(path.join(__dirname, 'public/basket.html')));
app.use('/images', express.static(__dirname + '/public/js/assets/images')); // allows Images to be displayed

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
