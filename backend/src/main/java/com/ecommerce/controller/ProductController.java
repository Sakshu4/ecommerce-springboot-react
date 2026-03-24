package com.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;

import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.model.Product;
import com.ecommerce.service.ProductService;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // 1. Get All Products (User + Admin)
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts(@RequestHeader(value = "Role", required = false) String role) {
        if (!"USER".equals(role) && !"ADMIN".equals(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    // 2. Get Product by ID (User + Admin)
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id, @RequestHeader(value = "Role", required = false) String role) {
        if (!"USER".equals(role) && !"ADMIN".equals(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        Product product = productService.getProductById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        return ResponseEntity.ok(product);
    }

    // 3. Add Product (Admin Only)
    @PostMapping
    public ResponseEntity<?> addProduct(@Valid @RequestBody Product product, @RequestHeader(value = "Role", required = false) String role) {
        if (!"ADMIN".equals(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access Denied: Only Admins can add products.");
        }
        Product newProduct = productService.addProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(newProduct);
    }

    // 4. Update Product (Admin Only)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @Valid @RequestBody Product productDetails, @RequestHeader(value = "Role", required = false) String role) {
        if (!"ADMIN".equals(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access Denied: Only Admins can update products.");
        }
        Product updatedProduct = productService.updateProduct(id, productDetails);
        if (updatedProduct == null) {
            throw new ResourceNotFoundException("Product not found with id: " + id);
        }
        return ResponseEntity.ok(updatedProduct);
    }

    // 5. Delete Product (Admin Only)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id, @RequestHeader(value = "Role", required = false) String role) {
        if (!"ADMIN".equals(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access Denied: Only Admins can delete products.");
        }
        boolean deleted = productService.deleteProduct(id);
        if (!deleted) {
            throw new ResourceNotFoundException("Product not found with id: " + id);
        }
        return ResponseEntity.noContent().build();
    }
}
