package com.inventario.inventoryappspring.controller;

import com.inventario.inventoryappspring.model.Product;
import com.inventario.inventoryappspring.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products") // Endpoint base
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    // READ ALL (GET)
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // CREATE (POST)
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Product createProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    // READ BY ID (GET) - Opcional
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable String id) {
         return productRepository.findById(id).orElseThrow(() -> 
             new RuntimeException("Product not found with id " + id));
    }

    // UPDATE (PUT)
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable String id, @RequestBody Product productDetails) {
        Product product = productRepository.findById(id).orElseThrow(() -> 
            new RuntimeException("Product not found with id " + id));

        product.setName(productDetails.getName());
        product.setSku(productDetails.getSku());
        product.setQuantity(productDetails.getQuantity());
        product.setPrice(productDetails.getPrice());
        product.setSupplier(productDetails.getSupplier());

        return productRepository.save(product);
    }

    // DELETE (DELETE)
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProduct(@PathVariable String id) {
        productRepository.deleteById(id);
    }
}
