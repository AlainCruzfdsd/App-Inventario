package com.inventario.inventoryappspring.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "products") // Esto mapea a una colección en MongoDB
public class Product {
    @Id
    private String id;
    private String name;
    private String sku;
    private int quantity;
    private double price;
    private String supplier;
}
