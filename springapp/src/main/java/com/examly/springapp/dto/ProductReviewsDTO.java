package com.examly.springapp.dto;

import java.time.LocalDateTime;
import com.examly.springapp.model.ProductReviews;

public class ProductReviewsDTO {
    private Long id;
    private Long productId;
    private String productName;
    private Long customerId;
    private String customerUsername;
    private Integer rating;
    private String reviewTitle;
    private String reviewText;
    private LocalDateTime reviewDate;
    private boolean isVerifiedPurchase;
    private Integer helpfulVotes;
    private boolean isApproved;

    // No-args constructor
    public ProductReviewsDTO() {}

    // All-args constructor
    public ProductReviewsDTO(Long id, Long productId, String productName,
                             Long customerId, String customerUsername,
                             Integer rating, String reviewTitle, String reviewText,
                             LocalDateTime reviewDate, boolean isVerifiedPurchase,
                             Integer helpfulVotes, boolean isApproved) {
        this.id = id;
        this.productId = productId;
        this.productName = productName;
        this.customerId = customerId;
        this.customerUsername = customerUsername;
        this.rating = rating;
        this.reviewTitle = reviewTitle;
        this.reviewText = reviewText;
        this.reviewDate = reviewDate;
        this.isVerifiedPurchase = isVerifiedPurchase;
        this.helpfulVotes = helpfulVotes;
        this.isApproved = isApproved;
    }

    // Static method to convert entity to DTO
    public static ProductReviewsDTO fromEntity(ProductReviews review) {
        return new ProductReviewsDTO(
            review.getId(),
            review.getProduct().getId(),
            review.getProduct().getSnackName(),
            review.getCustomer().getId(),
            review.getCustomer().getUsername(),
            review.getRating(),
            review.getReviewTitle(),
            review.getReviewText(),
            review.getReviewDate(),
            review.getIsVerifiedPurchase(),
            review.getHelpfulVotes(),
            review.getIsApproved()
        );
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }

    public String getCustomerUsername() { return customerUsername; }
    public void setCustomerUsername(String customerUsername) { this.customerUsername = customerUsername; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getReviewTitle() { return reviewTitle; }
    public void setReviewTitle(String reviewTitle) { this.reviewTitle = reviewTitle; }

    public String getReviewText() { return reviewText; }
    public void setReviewText(String reviewText) { this.reviewText = reviewText; }

    public LocalDateTime getReviewDate() { return reviewDate; }
    public void setReviewDate(LocalDateTime reviewDate) { this.reviewDate = reviewDate; }

    public boolean getIsVerifiedPurchase() { return isVerifiedPurchase; }
    public void setIsVerifiedPurchase(boolean isVerifiedPurchase) { this.isVerifiedPurchase = isVerifiedPurchase; }

    public Integer getHelpfulVotes() { return helpfulVotes; }
    public void setHelpfulVotes(Integer helpfulVotes) { this.helpfulVotes = helpfulVotes; }

    public boolean getIsApproved() { return isApproved; }
    public void setIsApproved(boolean isApproved) { this.isApproved = isApproved; }
}

