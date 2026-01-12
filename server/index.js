const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Middleware pour Ngrok - supprime l'avertissement
app.use((req, res, next) => {
    res.setHeader('ngrok-skip-browser-warning', 'true');
    next();
});

// Servir les fichiers statiques du frontend
app.use(express.static(path.join(__dirname, '../client')));

// Import du modèle Product
const Product = require('./models/Product');

// Routes API
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Routes pour les pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/panier.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/panier.html'));
});

app.get('/suivi.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/suivi.html'));
});

// Route 404 pour les fichiers manquants
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../client/404.html'));
});

// Connexion MongoDB - VERSION CORRIGÉE (sans options dépréciées)
mongoose.connect('mongodb://127.0.0.1:27017/electrobenin')
.then(() => console.log('✅ MongoDB connecté !'))
.catch(err => console.log('❌ Erreur MongoDB:', err));

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
    console.log(`📦 API: http://localhost:${PORT}/api/products`);
    console.log(`🌐 Site: http://localhost:${PORT}`);
    console.log(`🛒 Panier: http://localhost:${PORT}/panier.html`);
    console.log(`📦 Suivi: http://localhost:${PORT}/suivi.html`);
});