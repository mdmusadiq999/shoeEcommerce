package com.estate.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class ProductDto {
    private Long pid;
    private String pname;
    private Double price;
    private String imageLink;
    private String category;
    private String brand;
    private Integer size;


}
