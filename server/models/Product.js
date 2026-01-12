const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        trim: true
    },
    description: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true,
        min: 0
    },
    stock: { 
        type: Number, 
        required: true,
        min: 0,
        default: 0
    },
    category: { 
        type: String, 
        required: true,
        enum: ['Microcontrôleurs', 'Capteurs', 'Modules', 'Outils', 'Afficheurs', 'Résistances', 'Condensateurs', 'Connecteurs']
    },
    image: { 
        type: String, 
        required: true 
    },
    tag: { 
        type: String,
        enum: ['POPULAIRE', 'NOUVEAU', 'PROMOTION', null],
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);