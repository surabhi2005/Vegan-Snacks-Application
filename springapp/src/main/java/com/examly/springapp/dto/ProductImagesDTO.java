package com.examly.springapp.dto;

import java.time.LocalDateTime;

public class ProductImagesDTO {
    private Long id;
    private Long productId;
    private String productName;
    private String imageUrl;
    private String imageType;
    private String altText;
    private Long fileSize;
    private LocalDateTime uploadDate;
    private boolean isActive;

    public ProductImagesDTO(Long id, Long productId, String productName,
                            String imageUrl, String imageType, String altText,
                            Long fileSize, LocalDateTime uploadDate, boolean isActive) {
        this.id = id;
        this.productId = productId;
        this.productName = productName;
        this.imageUrl = imageUrl;
        this.imageType = imageType;
        this.altText = altText;
        this.fileSize = fileSize;
        this.uploadDate = uploadDate;
        this.isActive = isActive;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getImageType() { return imageType; }
    public void setImageType(String imageType) { this.imageType = imageType; }

    public String getAltText() { return altText; }
    public void setAltText(String altText) { this.altText = altText; }

    public Long getFileSize() { return fileSize; }
    public void setFileSize(Long fileSize) { this.fileSize = fileSize; }

    public LocalDateTime getUploadDate() { return uploadDate; }
    public void setUploadDate(LocalDateTime uploadDate) { this.uploadDate = uploadDate; }

    public boolean getIsActive() { return isActive; }
    public void setIsActive(boolean isActive) { this.isActive = isActive; }
}
