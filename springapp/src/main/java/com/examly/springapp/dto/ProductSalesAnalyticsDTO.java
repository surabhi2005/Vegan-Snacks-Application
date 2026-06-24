package com.examly.springapp.dto;

import java.math.BigDecimal;

public class ProductSalesAnalyticsDTO {
    private Long productId;
    private String productName;
    private Long totalUnitsSold;
    private BigDecimal totalRevenue;
    private Double averageRating;

    public ProductSalesAnalyticsDTO(Long productId, String productName, Long totalUnitsSold, BigDecimal totalRevenue, Double averageRating) {
        this.productId = productId;
        this.productName = productName;
        this.totalUnitsSold = totalUnitsSold;
        this.totalRevenue = totalRevenue;
        this.averageRating = averageRating;
    }

    public Long getProductId() {
        return productId;
    }
    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }
    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Long getTotalUnitsSold() {
        return totalUnitsSold;
    }
    public void setTotalUnitsSold(Long totalUnitsSold) {
        this.totalUnitsSold = totalUnitsSold;
    }

    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }
    public void setTotalRevenue(BigDecimal totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public Double getAverageRating() {
        return averageRating;
    }
    public void setAverageRating(Double averageRating) {
        this.averageRating = averageRating;
    }
}
