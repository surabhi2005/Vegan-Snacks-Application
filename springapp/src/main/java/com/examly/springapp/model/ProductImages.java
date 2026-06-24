package com.examly.springapp.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "product_images")
public class ProductImages {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private VeganSnack product;

    @Column(name = "image_url", nullable = false, length = 500)
    private String imageUrl;

    public enum ImageType {
        PRIMARY, SECONDARY, INGREDIENT, NUTRITIONAL
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "image_type")
    private ImageType imageType;

    @Column(name = "alt_text", length = 255)
    private String altText;

    @Column(name = "file_size")
    private Long fileSize;

    @Column(name = "upload_date", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime uploadDate;

    @Column(name = "is_active", columnDefinition = "BOOLEAN DEFAULT TRUE")
    private boolean isActive = true;

    public ProductImages() {}

    public ProductImages(VeganSnack product, String imageUrl, ImageType imageType, String altText, Long fileSize, LocalDateTime uploadDate, boolean isActive) {
        this.product = product;
        this.imageUrl = imageUrl;
        this.imageType = imageType;
        this.altText = altText;
        this.fileSize = fileSize;
        this.uploadDate = uploadDate;
        this.isActive = isActive;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public VeganSnack getProduct() {
        return product;
    }
    public void setProduct(VeganSnack product) {
        this.product = product;
    }
    public String getImageUrl() {
        return imageUrl;
    }
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    public ImageType getImageType() {
        return imageType;
    }
    public void setImageType(ImageType imageType) {
        this.imageType = imageType;
    }
    public String getAltText() {
        return altText;
    }
    public void setAltText(String altText) {
        this.altText = altText;
    }
    public Long getFileSize() {
        return fileSize;
    }
    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }
    public LocalDateTime getUploadDate() {
        return uploadDate;
    }
    public void setUploadDate(LocalDateTime uploadDate) {
        this.uploadDate = uploadDate;
    }
    public boolean getIsActive() {
        return isActive;
    }
    public void setIsActive(boolean isActive) {
        this.isActive = isActive;
    }
}
