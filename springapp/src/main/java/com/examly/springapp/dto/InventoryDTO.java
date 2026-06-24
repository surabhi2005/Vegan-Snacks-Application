package com.examly.springapp.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class InventoryDTO {
    private Long id;
    private Long productId;
    private String productName;
    private Integer currentStock;
    private Integer reorderPoint;
    private Integer maxStock;
    private BigDecimal costPerUnit;
    private LocalDateTime lastRestockDate;
    private LocalDateTime lastUpdated;
    private String location;

    public InventoryDTO(Long id, Long productId, String productName,
                        Integer currentStock, Integer reorderPoint, Integer maxStock,
                        BigDecimal costPerUnit, LocalDateTime lastRestockDate,
                        LocalDateTime lastUpdated, String location) {
        this.id = id;
        this.productId = productId;
        this.productName = productName;
        this.currentStock = currentStock;
        this.reorderPoint = reorderPoint;
        this.maxStock = maxStock;
        this.costPerUnit = costPerUnit;
        this.lastRestockDate = lastRestockDate;
        this.lastUpdated = lastUpdated;
        this.location = location;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public Integer getCurrentStock() { return currentStock; }
    public void setCurrentStock(Integer currentStock) { this.currentStock = currentStock; }

    public Integer getReorderPoint() { return reorderPoint; }
    public void setReorderPoint(Integer reorderPoint) { this.reorderPoint = reorderPoint; }

    public Integer getMaxStock() { return maxStock; }
    public void setMaxStock(Integer maxStock) { this.maxStock = maxStock; }

    public BigDecimal getCostPerUnit() { return costPerUnit; }
    public void setCostPerUnit(BigDecimal costPerUnit) { this.costPerUnit = costPerUnit; }

    public LocalDateTime getLastRestockDate() { return lastRestockDate; }
    public void setLastRestockDate(LocalDateTime lastRestockDate) { this.lastRestockDate = lastRestockDate; }

    public LocalDateTime getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(LocalDateTime lastUpdated) { this.lastUpdated = lastUpdated; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
}

