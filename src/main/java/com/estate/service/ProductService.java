package com.estate.service;

import com.estate.entity.ProductDto;
import com.estate.entity.ProductEntity;

import java.util.List;

public interface ProductService {

    void updateProduct(ProductDto productDto, long id);

    void saveProduct(ProductEntity product);

    List<ProductEntity> getAllProducts();

    ProductDto getProductById(long id);

    List<ProductDto> getProductsByUserId(int userId);

    List<ProductEntity> getProductsByCategory(String category);


    void deleteByProductId(Long id);

    List<ProductEntity> searchByPname(String pname);

    List<ProductEntity> searchByPrice(Double price);

    List<ProductEntity> searchByCategoryPrice(String category, Double price);

    List<ProductEntity> searchBySize(Integer size);

    List<ProductEntity> searchByBrand(String brand);

    List<ProductEntity> searchByBrandSize(String brand, Integer size);


  
}
