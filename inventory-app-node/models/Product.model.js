// models/Product.model.js

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio.'],
        trim: true
    },
    sku: {
        type: String,
        required: false,
        unique: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: [true, 'La cantidad es obligatoria.'],
        min: 0
    },
    price: {
        type: Number,
        required: false,
        min: 0
    },
    supplier: {
        type: String,
        required: false
    }
}, {
    timestamps: true // Añade campos createdAt y updatedAt
});

module.exports = mongoose.model('Product', ProductSchema);