package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.dto.ProductReviewsDTO;
import com.examly.springapp.model.ProductReviews;
import com.examly.springapp.repository.ProductReviewsRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductReviewsService {

    @Autowired
    private ProductReviewsRepository reviewsRepo;

    public ProductReviewsDTO addReview(ProductReviews review) {
        ProductReviews saved = reviewsRepo.save(review);
        return new ProductReviewsDTO(
                saved.getId(),
                saved.getProduct() != null ? saved.getProduct().getId() : null,
                saved.getProduct() != null ? saved.getProduct().getSnackName() : null,
                saved.getCustomer() != null ? saved.getCustomer().getId() : null,
                saved.getCustomer() != null ? saved.getCustomer().getUsername() : null,
                saved.getRating(),
                saved.getReviewTitle(),
                saved.getReviewText(),
                saved.getReviewDate(),
                saved.getIsVerifiedPurchase(),
                saved.getHelpfulVotes(),
                saved.getIsApproved()
        );
    }

    public List<ProductReviewsDTO> getReviewByCustomerId(Long id) {
    List<ProductReviews> reviews = reviewsRepo.findByCustomerId(id);
    return reviews.stream()
                  .map(ProductReviewsDTO::fromEntity)
                  .collect(Collectors.toList()); // use collect instead of toList() for Java 8+
    }

    public List<ProductReviewsDTO> getAllReviews() {
        return reviewsRepo.findAll().stream()
                .map(r -> new ProductReviewsDTO(
                        r.getId(),
                        r.getProduct() != null ? r.getProduct().getId() : null,
                        r.getProduct() != null ? r.getProduct().getSnackName() : null,
                        r.getCustomer() != null ? r.getCustomer().getId() : null,
                        r.getCustomer() != null ? r.getCustomer().getUsername() : null,
                        r.getRating(),
                        r.getReviewTitle(),
                        r.getReviewText(),
                        r.getReviewDate(),
                        r.getIsVerifiedPurchase(),
                        r.getHelpfulVotes(),
                        r.getIsApproved()
                ))
                .collect(Collectors.toList());
    }

//     public ProductReviewsDTO updateReview(Long id, ProductReviews review) {
//     ProductReviews existingReview = reviewsRepo.findById(id)
//             .orElseThrow(() -> new RuntimeException("Review not found"));

//     existingReview.setProduct(review.getProduct());
//     existingReview.setCustomer(review.getCustomer());
//     existingReview.setRating(review.getRating());
//     existingReview.setReviewTitle(review.getReviewTitle());
//     existingReview.setReviewText(review.getReviewText());
//     existingReview.setReviewDate(review.getReviewDate());
//     existingReview.setIsVerifiedPurchase(review.getIsVerifiedPurchase());
//     existingReview.setHelpfulVotes(review.getHelpfulVotes());
//     existingReview.setIsApproved(review.getIsApproved());

//     ProductReviews updated = reviewsRepo.save(existingReview);

//     return new ProductReviewsDTO(
//             updated.getId(),
//             updated.getProduct() != null ? updated.getProduct().getId() : null,
//             updated.getProduct() != null ? updated.getProduct().getSnackName() : null,
//             updated.getCustomer() != null ? updated.getCustomer().getId() : null,
//             updated.getCustomer() != null ? updated.getCustomer().getUsername() : null,
//             updated.getRating(),
//             updated.getReviewTitle(),
//             updated.getReviewText(),
//             updated.getReviewDate(),
//             updated.getIsVerifiedPurchase(),
//             updated.getHelpfulVotes(),
//             updated.getIsApproved()
//     );
// }
public ProductReviewsDTO updateReview(Long id, ProductReviews review) {
    ProductReviews existingReview = reviewsRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Review not found"));

    // Only update editable fields
    if (review.getRating() != null) existingReview.setRating(review.getRating());
    if (review.getReviewTitle() != null) existingReview.setReviewTitle(review.getReviewTitle());
    if (review.getReviewText() != null) existingReview.setReviewText(review.getReviewText());

    // Optionally, update the reviewDate to now
    existingReview.setReviewDate(LocalDateTime.now());

    ProductReviews updated = reviewsRepo.save(existingReview);

    return new ProductReviewsDTO(
            updated.getId(),
            updated.getProduct() != null ? updated.getProduct().getId() : null,
            updated.getProduct() != null ? updated.getProduct().getSnackName() : null,
            updated.getCustomer() != null ? updated.getCustomer().getId() : null,
            updated.getCustomer() != null ? updated.getCustomer().getUsername() : null,
            updated.getRating(),
            updated.getReviewTitle(),
            updated.getReviewText(),
            updated.getReviewDate(),
            updated.getIsVerifiedPurchase(),
            updated.getHelpfulVotes(),
            updated.getIsApproved()
    );
}



    public String deleteReview(Long id) {
        reviewsRepo.deleteById(id);
        return "Review deleted successfully";
    }
}
