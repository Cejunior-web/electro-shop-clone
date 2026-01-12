const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
    {
        name: "Arduino Uno R3",
        description: "Carte de développement idéale pour débutants avec microcontrôleur ATmega328P",
        price: 12500,
        stock: 45,
        category: "Microcontrôleurs",
        image: "https://store-usa.arduino.cc/cdn/shop/files/A000073_00.front_1200x900.jpg",
        tag: "POPULAIRE"
    },
    {
        name: "ESP32 Dev Board",
        description: "Carte de développement avec WiFi et Bluetooth intégrés, double cœur",
        price: 18500,
        stock: 32,
        category: "Microcontrôleurs",
        image: "https://m.media-amazon.com/images/I/61Y9EwKCj1L._AC_SL1500_.jpg",
        tag: "POPULAIRE"
    },
    {
        name: "Raspberry Pi 4 Model B",
        description: "Mini ordinateur 4GB RAM, idéal pour projets IoT et embarqués",
        price: 45000,
        stock: 15,
        category: "Microcontrôleurs",
        image: "https://m.media-amazon.com/images/I/61n17rVxXtL._AC_SL1500_.jpg"
    },
    {
        name: "Capteur Ultrason HC-SR04",
        description: "Capteur de distance par ultrasons, portée 2cm à 4m",
        price: 3800,
        stock: 120,
        category: "Capteurs",
        image: "https://m.media-amazon.com/images/I/61R1A7CuHTL._AC_SL1500_.jpg",
        tag: "POPULAIRE"
    },
    {
        name: "Capteur DHT22",
        description: "Capteur de température et humidité haute précision",
        price: 4500,
        stock: 65,
        category: "Capteurs",
        image: "https://m.media-amazon.com/images/I/61DGhJ1nTQL._AC_SL1500_.jpg"
    },
    {
        name: "LCD 16x2 avec I2C",
        description: "Écran LCD 16 caractères x 2 lignes avec interface I2C",
        price: 6800,
        stock: 42,
        category: "Afficheurs",
        image: "https://m.media-amazon.com/images/I/71z8VnS2bAL._AC_SL1500_.jpg"
    },
    {
        name: "Module Relais 5V 4 Canaux",
        description: "Module relais pour contrôler charges AC/DC, 4 canaux indépendants",
        price: 3200,
        stock: 78,
        category: "Modules",
        image: "https://m.media-amazon.com/images/I/71O-7U58WGL._AC_SL1500_.jpg"
    },
    {
        name: "Pack Résistances 500 Pièces",
        description: "Assortiment de résistances 30 valeurs différentes",
        price: 2800,
        stock: 56,
        category: "Résistances",
        image: "https://m.media-amazon.com/images/I/71YtGZ2PqRL._AC_SL1500_.jpg",
        tag: "NOUVEAU"
    },
    {
        name: "Fer à Souder 60W",
        description: "Fer à souder avec contrôle de température, pointe interchangeable",
        price: 9800,
        stock: 28,
        category: "Outils",
        image: "https://m.media-amazon.com/images/I/71cTlLWHtmL._AC_SL1500_.jpg"
    },
    {
        name: "Multimètre Numérique",
        description: "Multimètre avec testeur de continuité, diode et transistor",
        price: 12500,
        stock: 22,
        category: "Outils",
        image: "https://m.media-amazon.com/images/I/71Ebj2lJawL._AC_SL1500_.jpg"
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/electrobenin');
        console.log('✅ Connecté à MongoDB');
        
        // Nettoyer la collection
        await Product.deleteMany({});
        console.log('🗑️ Anciens produits supprimés');
        
        // Insérer les nouveaux produits
        await Product.insertMany(products);
        console.log(`✅ ${products.length} produits ajoutés`);
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Erreur:', error);
        process.exit(1);
    }
}

seedDatabase();