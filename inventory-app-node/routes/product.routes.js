// routes/product.routes.js

const express = require('express');
const router = express.Router();
const Product = require('../models/Product.model');


// GET /api/products - Listar todos
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// POST /api/products - Crear nuevo producto
router.post('/', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear producto', error: error.message });
    }
});


// GET /api/products/:id - Obtener por ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// PUT /api/products/:id - Actualizar
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true } // {new: true} retorna el documento actualizado
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado para actualizar' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar producto', error: error.message });
    }
});


// DELETE /api/products/:id - Eliminar
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado para eliminar' });
        }
        // Responder 204 No Content
        res.status(204).send(); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;