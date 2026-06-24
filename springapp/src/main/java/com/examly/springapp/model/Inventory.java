package com.examly.springapp.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "inventory")
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
@JoinColumn(name = "product_id", nullable = false, unique = true)
private VeganSnack product;


    @Column(name = "current_stock", nullable = false)
    private Integer currentStock = 0;

    @Column(name = "reorder_point", columnDefinition = "INT DEFAULT 10")
    private Integer reorderPoint = 10;

    @Column(name = "max_stock", columnDefinition = "INT DEFAULT 1000")
    private Integer maxStock = 1000;

    @Column(name = "cost_per_unit", precision = 10, scale = 2)
    private BigDecimal costPerUnit;

    @Column(name = "last_restock_date")
    private LocalDateTime lastRestockDate;

    @Column(name = "last_updated", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime lastUpdated;

    @Column(name = "location", length = 100)
    private String location;

    public Inventory() {}

    public Inventory(VeganSnack product, Integer currentStock, Integer reorderPoint, Integer maxStock,
                     BigDecimal costPerUnit, LocalDateTime lastRestockDate, LocalDateTime lastUpdated, String location) {
        this.product = product;
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

    public VeganSnack getProduct() { return product; }
    public void setProduct(VeganSnack product) { this.product = product; }

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
