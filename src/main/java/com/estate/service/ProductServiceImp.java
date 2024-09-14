package com.estate.service;

import com.estate.entity.ProductEntity;
import com.estate.entity.ProductDto;
import com.estate.entity.UsersEntity;
import com.estate.exception.ProductNotFoundException;
import com.estate.repo.ProductRepo;
import com.estate.repo.UserProductRepo;
import com.estate.repo.UserRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImp implements ProductService {

    private static final Logger logger = LoggerFactory.getLogger(ProductServiceImp.class);

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private UserProductRepo userProductRepo;

    @Override
    public void saveProduct(ProductEntity product) {
        logger.info("Saving product: {}", product);
        productRepo.save(product);
    }

    @Override
    public void updateProduct(ProductDto productDto, long id) {
        ProductEntity existingProduct = productRepo.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product with ID " + id + " not found"));

        if (productDto.getPname() != null) {
            existingProduct.setPname(productDto.getPname());
        }
        if (productDto.getPrice() != null) {
            existingProduct.setPrice(productDto.getPrice());
        }
        if (productDto.getImageLink() != null) {
            existingProduct.setImage_link(productDto.getImageLink());
        }
        if (productDto.getCategory() != null) {
            existingProduct.setCategory(productDto.getCategory());
        }
        if (productDto.getBrand() != null) {
            existingProduct.setBrand(productDto.getBrand());
        }
        if (productDto.getSize() != null) {
            existingProduct.setSize(productDto.getSize());
        }

        productRepo.save(existingProduct);
    }

    @Override
    public List<ProductEntity> getAllProducts() {
        try {
            return productRepo.findAll();
        } catch (Exception ex) {
            logger.error("Error fetching products: {}", ex.getMessage(), ex);
            throw new RuntimeException("Error fetching products", ex);
        }
    }

    @Override
    public ProductDto getProductById(long id) {
        ProductEntity productEntity = productRepo.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product with ID " + id + " not found"));

        return new ProductDto(
                productEntity.getId(),
                productEntity.getPname(),
                productEntity.getPrice(),
                productEntity.getImage_link(),
                productEntity.getCategory(),
                productEntity.getBrand(),
                productEntity.getSize());
    }

    @Override
    public List<ProductDto> getProductsByUserId(int userId) {
        UsersEntity user = userRepo.findByUserId(userId);
        if (user != null) {
            return user.getSelectedProducts().stream()
                    .map(userProduct -> {
                        ProductEntity product = userProduct.getProduct();
                        return new ProductDto(
                                product.getId(),
                                product.getPname(),
                                product.getPrice(),
                                product.getImage_link(),
                                product.getCategory(),
                                product.getBrand(),
                                product.getSize());
                    })
                    .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    @Override
    public List<ProductEntity> getProductsByCategory(String category) {
        return productRepo.findByCategory(category);
    }

    @Override
    @Transactional
    public void deleteByProductId(Long id) {
        try {
            ProductEntity product = productRepo.findById(id)
                    .orElseThrow(() -> new ProductNotFoundException("Product with ID " + id + " not found"));

            userProductRepo.deleteByProduct(product);
            productRepo.delete(product);
        } catch (Exception ex) {
            logger.error("Failed to delete product with ID {}: {}", id, ex.getMessage(), ex);
            throw new RuntimeException("Failed to delete product with ID " + id, ex);
        }
    }

    @Override
    public List<ProductEntity> searchByPname(String pname) {
        try {
            return productRepo.findByPnameContaining(pname);
        } catch (Exception ex) {
            logger.error("Failed to fetch products by name {}: {}", pname, ex.getMessage(), ex);
            throw new RuntimeException("Failed to fetch products by name", ex);
        }
    }

    @Override
    public List<ProductEntity> searchByPrice(Double price) {
        try {
            return productRepo.findByPriceLessThanEqual(price);
        } catch (Exception ex) {
            logger.error("Failed to fetch products by price {}: {}", price, ex.getMessage(), ex);
            throw new RuntimeException("Failed to fetch products by price", ex);
        }
    }

    @Override
    public List<ProductEntity> searchByCategoryPrice(String category, Double price) {
        try {
            return productRepo.findByCategoryContainingAndPriceLessThanEqual(category, price);
        } catch (Exception ex) {
            logger.error("Failed to fetch products by category {} and price {}: {}", category, price, ex.getMessage(),
                    ex);
            throw new RuntimeException("Failed to fetch products by category and price", ex);
        }
    }

    @Override
    public List<ProductEntity> searchByBrand(String brand) {
        try {
            return productRepo.findByBrand(brand);
        } catch (Exception ex) {
            logger.error("Failed to fetch products by brand {}: {}", brand, ex.getMessage(), ex);
            throw new RuntimeException("Failed to fetch products by brand", ex);
        }
    }

    @Override
    public List<ProductEntity> searchBySize(Integer size) {
        try {
            return productRepo.findBySize(size);
        } catch (Exception ex) {
            logger.error("Failed to fetch products by size {}: {}", size, ex.getMessage(), ex);
            throw new RuntimeException("Failed to fetch products by size", ex);
        }
    }

    @Override
    public List<ProductEntity> searchByBrandSize(String brand, Integer size) {
        try {
            return productRepo.findByBrandAndSize(brand, size);
        } catch (Exception ex) {
            logger.error("Failed to fetch products by brand {} and size {}: {}", brand, size, ex.getMessage(), ex);
            throw new RuntimeException("Failed to fetch products by brand and size", ex);
        }
    }
    
   


}
