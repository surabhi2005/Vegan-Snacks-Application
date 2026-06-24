package com.examly.springapp.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class VeganSnackDTO {
    private Long id;
    private Long vendorId;
    private String vendorName;
    private String snackName;
    private String snackType;
    private String description;
    private String ingredients;
    private String nutritionalInfo;
    private String quantity;
    private BigDecimal price;
    private Integer expiryInMonths;
    private String sku;
    private String status;
    private LocalDateTime createdDate;
    private LocalDateTime lastModified;
    private Long approvedById;
    private String approvedByName;
    private LocalDateTime approvalDate;

    public VeganSnackDTO(Long id, Long vendorId, String vendorName, String snackName,
                          String snackType, String description, String ingredients,
                          String nutritionalInfo, String quantity, BigDecimal price,
                          Integer expiryInMonths, String sku, String status,
                          LocalDateTime createdDate, LocalDateTime lastModified,
                          Long approvedById, String approvedByName, LocalDateTime approvalDate) {
        this.id = id;
        this.vendorId = vendorId;
        this.vendorName = vendorName;
        this.snackName = snackName;
        this.snackType = snackType;
        this.description = description;
        this.ingredients = ingredients;
        this.nutritionalInfo = nutritionalInfo;
        this.quantity = quantity;
        this.price = price;
        this.expiryInMonths = expiryInMonths;
        this.sku = sku;
        this.status = status;
        this.createdDate = createdDate;
        this.lastModified = lastModified;
        this.approvedById = approvedById;
        this.approvedByName = approvedByName;
        this.approvalDate = approvalDate;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getVendorId() { return vendorId; }
    public void setVendorId(Long vendorId) { this.vendorId = vendorId; }
    public String getVendorName() { return vendorName; }
    public void setVendorName(String vendorName) { this.vendorName = vendorName; }
    public String getSnackName() { return snackName; }
    public void setSnackName(String snackName) { this.snackName = snackName; }
    public String getSnackType() { return snackType; }
    public void setSnackType(String snackType) { this.snackType = snackType; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getIngredients() { return ingredients; }
    public void setIngredients(String ingredients) { this.ingredients = ingredients; }
    public String getNutritionalInfo() { return nutritionalInfo; }
    public void setNutritionalInfo(String nutritionalInfo) { this.nutritionalInfo = nutritionalInfo; }
    public String getQuantity() { return quantity; }
    public void setQuantity(String quantity) { this.quantity = quantity; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public Integer getExpiryInMonths() { return expiryInMonths; }
    public void setExpiryInMonths(Integer expiryInMonths) { this.expiryInMonths = expiryInMonths; }
    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getCreatedDate() { return createdDate; }
    public void setCreatedDate(LocalDateTime createdDate) { this.createdDate = createdDate; }
    public LocalDateTime getLastModified() { return lastModified; }
    public void setLastModified(LocalDateTime lastModified) { this.lastModified = lastModified; }
    public Long getApprovedById() { return approvedById; }
    public void setApprovedById(Long approvedById) { this.approvedById = approvedById; }
    public String getApprovedByName() { return approvedByName; }
    public void setApprovedByName(String approvedByName) { this.approvedByName = approvedByName; }
    public LocalDateTime getApprovalDate() { return approvalDate; }
    public void setApprovalDate(LocalDateTime approvalDate) { this.approvalDate = approvalDate; }
}
