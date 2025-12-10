package com.inventario.inventoryappspring.repository;

import com.inventario.inventoryappspring.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {
    // Spring Data MongoDB provee automáticamente el CRUD
}