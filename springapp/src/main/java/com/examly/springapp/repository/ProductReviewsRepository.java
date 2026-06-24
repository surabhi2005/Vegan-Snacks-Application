package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.examly.springapp.model.ProductReviews;
import java.util.List;


public interface ProductReviewsRepository extends JpaRepository<ProductReviews, Long> {
   @Query("SELECT r FROM ProductReviews r WHERE r.customer.id = :id")
    List<ProductReviews> findByCustomerId(@Param("id") Long id);
}

