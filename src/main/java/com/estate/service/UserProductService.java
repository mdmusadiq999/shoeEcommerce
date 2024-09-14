package com.estate.service;

import com.estate.entity.ProductEntity;
import com.estate.entity.UserProduct;
import com.estate.entity.UsersEntity;

import java.util.List;

public interface UserProductService {
    void addUserProduct(UserProduct userProduct);
    void addSelectedProductsToUser(UsersEntity user, List<ProductEntity> products);
    void deleteUserProductByProductId(Long pid);
}
