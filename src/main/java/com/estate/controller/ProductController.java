package com.estate.controller;

import com.estate.entity.ProductDto;
import com.estate.entity.ProductEntity;
import com.estate.exception.ProductNotFoundException;
import com.estate.service.ProductService;
import com.estate.service.UserProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })
public class ProductController {

    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private ProductService productService;

    @Autowired
    private UserProductService userProductService;

    @GetMapping("/welcome")
    public String welcome() {
        return "Hello World!";
    }

@PostMapping("/add")
@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_SELLER')")
public ResponseEntity<String> addProduct(@RequestBody ProductDto productDto) {
    try {
        
       
        // Map fields from productDto to ProductEntity
        ProductEntity product = new ProductEntity();
        product.setPname(productDto.getPname());
        product.setPrice(productDto.getPrice());
        product.setImage_link(productDto.getImageLink());
        product.setCategory(productDto.getCategory());
        product.setBrand(productDto.getBrand());
        product.setSize(productDto.getSize());
      
        // Save the product using productService
        productService.saveProduct(product);

        return ResponseEntity.ok("Product added successfully");
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add product");
    }
}



    @GetMapping("/getAllProduct")
    public ResponseEntity<List<ProductEntity>> getAllProducts() {
        List<ProductEntity> products = productService.getAllProducts();
        return ResponseEntity.ok().body(products);
    }

    
    @GetMapping("/product/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long id) {
        ProductDto product = productService.getProductById(id);

        if (product == null) {
            throw new ProductNotFoundException("Product not found with id: " + id);
        }

        return ResponseEntity.ok(product);
    }

    @GetMapping("/user/{userId}/products")
    public ResponseEntity<List<ProductDto>> getProductsByUserId(@PathVariable int userId) {
        try {
            List<ProductDto> productDTOs = productService.getProductsByUserId(userId);
            if (!productDTOs.isEmpty()) {
                return new ResponseEntity<>(productDTOs, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception ex) {
            logger.error("Error fetching products for user ID {}: {}", userId, ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/user/{userId}/products/deleteProductByProductId/{id}")
    public ResponseEntity<String> deleteUserProductByProductId(@PathVariable Long pid) {
        try {
            userProductService.deleteUserProductByProductId(pid);
            return ResponseEntity.ok("{\"status\":\"Product deleted successfully!!\"}");
        } catch (Exception ex) {
            logger.error("Error deleting user product with ID {}: {}", pid, ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"status\":\"Failed to delete product\"}");
        }
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_SELLER')")
    public ResponseEntity<String> updateProduct(@PathVariable long id, @RequestBody ProductDto productDto) {
        try {
            productService.updateProduct(productDto, id);
            return ResponseEntity.ok("Product updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update product");
        }
    }

    @DeleteMapping("/deleteProduct/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_SELLER')")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        try {
            productService.deleteByProductId(id);
            return ResponseEntity.ok("{\"status\":\"Product deleted successfully!!\"}");
        } catch (Exception ex) {
            logger.error("Error deleting product with ID {}: {}", id, ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"status\":\"Failed to delete product\"}");
        }
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<ProductEntity>> getProductsByCategory(@PathVariable String category) {
        List<ProductEntity> products = productService.getProductsByCategory(category);
        if (products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(products, HttpStatus.OK);
        }
    }

    @GetMapping("/products/brand/{brand}")
    public ResponseEntity<List<ProductEntity>> getProductsByBrand(@PathVariable String brand) {
        try {
            List<ProductEntity> products = productService.searchByBrand(brand);
            if (products.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(products, HttpStatus.OK);
            }
        } catch (Exception ex) {
            logger.error("Error fetching products by brand {}: {}", brand, ex.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @GetMapping("/products/size/{size}")
    public ResponseEntity<List<ProductEntity>> getProductsBySize(@PathVariable int size) {
        try {
            List<ProductEntity> products = productService.searchBySize(size);
            if (products.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(products, HttpStatus.OK);
            }
        } catch (Exception ex) {
            logger.error("Error fetching products by size {}: {}", size, ex.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

 
    @GetMapping("/products/brand-size/{brand}/{size}")
    public ResponseEntity<List<ProductEntity>> getProductsByBrandSize(
            @PathVariable String brand,
            @PathVariable int size) {
        try {
            List<ProductEntity> products = productService.searchByBrandSize(brand, size);
            if (products.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(products, HttpStatus.OK);
            }
        } catch (Exception ex) {
            logger.error("Error fetching products by brand {} and size {}: {}", brand, size, ex.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
   

}
