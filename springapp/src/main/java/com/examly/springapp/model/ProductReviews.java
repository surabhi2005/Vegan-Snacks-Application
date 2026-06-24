package com.examly.springapp.model;

import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
@Table(name = "product_reviews")
public class ProductReviews {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private VeganSnack product;
    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Users customer;

    @Column(name = "rating")
    private Integer rating; 

    @Column(name = "review_title", length = 100)
    private String reviewTitle;

    @Column(name = "review_text", columnDefinition = "TEXT")
    private String reviewText;

    @Column(name = "review_date", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime reviewDate;

    @Column(name = "is_verified_purchase", columnDefinition = "BOOLEAN DEFAULT FALSE")
    private boolean isVerifiedPurchase = false;

    @Column(name = "helpful_votes", columnDefinition = "INT DEFAULT 0")
    private Integer helpfulVotes = 0;

    @Column(name = "is_approved", columnDefinition = "BOOLEAN DEFAULT FALSE")
    private boolean isApproved = false;

    public ProductReviews() {}

    public ProductReviews(VeganSnack product, Users customer, Integer rating, String reviewTitle, String reviewText,
                          LocalDateTime reviewDate, boolean isVerifiedPurchase, Integer helpfulVotes, boolean isApproved) {
        this.product = product;
        this.customer = customer;
        this.rating = rating;
        this.reviewTitle = reviewTitle;
        this.reviewText = reviewText;
        this.reviewDate = reviewDate;
        this.isVerifiedPurchase = isVerifiedPurchase;
        this.helpfulVotes = helpfulVotes;
        this.isApproved = isApproved;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public VeganSnack getProduct() { return product; }
    public void setProduct(VeganSnack product) { this.product = product; }

    public Users getCustomer() { return customer; }
    public void setCustomer(Users customer) { this.customer = customer; }

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

