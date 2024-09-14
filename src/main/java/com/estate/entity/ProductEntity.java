package com.estate.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "product_entity") // Ensure this matches your DB table
public class ProductEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "pname")
    private String pname;

    @Column(name = "price")
    private Double price;

    @Column(name = "image_Link")
    private String image_link;

    @Column(name = "category")
    private String category;

    @Column(name = "brand")
    private String brand;

    @Column(name = "size")
    private Integer size;

    @Column(name = "seller_id")
    private Integer seller_id;


   


    // Constructor without 'id' (for new products)
    public ProductEntity(String pname, Double price, String image_link, String category, String brand, Integer size,
            Integer seller_id) {
        this.pname = pname;
        this.price = price;
        this.image_link = image_link;
        this.category = category;
        this.brand = brand;
        this.size = size;
        this.seller_id = seller_id;
    }
}
