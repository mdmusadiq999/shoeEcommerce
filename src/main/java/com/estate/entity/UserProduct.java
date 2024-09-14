package com.estate.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UsersEntity user;

    @ManyToOne
    @JoinColumn
    (name = "product_id")
    private ProductEntity product;

    @Column(name = "username")
    private String username;

    @Column(name = "productName")
    private String productName;

    @Column(name = "productPrice")
    private double productPrice;

}
