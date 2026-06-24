
package com.examly.springapp.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Lob;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "vegan_snacks")
public class VeganSnack {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "vendor_id", nullable = false)
    private Vendors vendor;

    @Column(name = "snack_name", nullable = false, length = 100)
    private String snackName;

    @Column(name = "snack_type", nullable = false, length = 50)
    private String snackType;

    @Lob
    @Column(name = "description")
    private String description;

    @Lob
    @Column(name = "ingredients", nullable = false)
    private String ingredients;
    @Column(name = "nutritional_info", columnDefinition = "JSON")
    private String nutritionalInfo; 

    @Column(name = "quantity", nullable = false, length = 20)
    private String quantity;

    @Column(name = "price", nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "expiry_in_months", nullable = false)
    private Integer expiryInMonths;

    @Column(name = "sku", unique = true, length = 50)
    private String sku;

    public enum SnackStatus {
        DRAFT, PENDING_APPROVAL, APPROVED, REJECTED, DISCONTINUED
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 20)
    private SnackStatus status = SnackStatus.DRAFT;

    @Column(name = "created_date", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdDate;

    @Column(name = "last_modified", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime lastModified;
   @OneToOne(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private Inventory inventory;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductImages> images;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductReviews> reviews;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItems> orderItems;
    @ManyToOne
@JoinColumn(name = "category_id")
@JsonBackReference // Prevent recursion when serializing category inside snack
private ProductCategories category;


    @ManyToOne
    @JoinColumn(name = "approved_by")
    private Users approvedBy;

    @Column(name = "approval_date")
    private LocalDateTime approvalDate;

    public VeganSnack() {}

    public VeganSnack(Vendors vendor, String snackName, String snackType, String description,
                       String ingredients, String nutritionalInfo, String quantity, BigDecimal price,
                       Integer expiryInMonths, String sku, SnackStatus status, LocalDateTime createdDate,
                       LocalDateTime lastModified, Users approvedBy, LocalDateTime approvalDate) {
        this.vendor = vendor;
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
        this.approvedBy = approvedBy;
        this.approvalDate = approvalDate;
    }

    

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Vendors getVendor() {
        return vendor;
    }

    public void setVendor(Vendors vendor) {
        this.vendor = vendor;
    }

    public String getSnackName() {
        return snackName;
    }

    public void setSnackName(String snackName) {
        this.snackName = snackName;
    }

    public String getSnackType() {
        return snackType;
    }

    public void setSnackType(String snackType) {
        this.snackType = snackType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public String getNutritionalInfo() {
        return nutritionalInfo;
    }

    public void setNutritionalInfo(String nutritionalInfo) {
        this.nutritionalInfo = nutritionalInfo;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getExpiryInMonths() {
        return expiryInMonths;
    }

    public void setExpiryInMonths(Integer expiryInMonths) {
        this.expiryInMonths = expiryInMonths;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public SnackStatus getStatus() {
        return status;
    }

    public void setStatus(SnackStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDateTime getLastModified() {
        return lastModified;
    }

    public void setLastModified(LocalDateTime lastModified) {
        this.lastModified = lastModified;
    }

    public Users getApprovedBy() {
        return approvedBy;
    }

    public void setApprovedBy(Users approvedBy) {
        this.approvedBy = approvedBy;
    }

    public LocalDateTime getApprovalDate() {
        return approvalDate;
    }

    public void setApprovalDate(LocalDateTime approvalDate) {
        this.approvalDate = approvalDate;
    }
}
