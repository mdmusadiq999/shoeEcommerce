package com.estate.repo;

import com.estate.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<ProductEntity, Long> {
   

    List<ProductEntity> findByCategory(String category);

    List<ProductEntity> findByPnameContaining(String pname);

    List<ProductEntity> findByPriceLessThanEqual(Double price);

    List<ProductEntity> findByCategoryContainingAndPriceLessThanEqual(String category, Double price);
    
    List<ProductEntity> findByBrand(String brand);

    List<ProductEntity> findBySize(int size);;

    List<ProductEntity> findByBrandAndSize(String brand, int size);
    
    List<ProductEntity> findByCategoryAndPriceBetween(String category, double minPrice, double maxPrice);
    

}
