package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.dto.ProductReviewsDTO;
import com.examly.springapp.model.ProductReviews;
import com.examly.springapp.service.ProductReviewsService;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/product-reviews")
public class ProductReviewsController {

    @Autowired
    private ProductReviewsService reviewsService;

    @PostMapping("/add")
    public ProductReviewsDTO createReview(@RequestBody ProductReviews review) {
        return reviewsService.addReview(review); 
    }
    @GetMapping("/bycustomer/{id}")
   public List<ProductReviewsDTO> reviewbyId(@PathVariable Long id)
   {
      return reviewsService.getReviewByCustomerId(id);
   }

    @GetMapping("/all")
    public List<ProductReviewsDTO> getAllReviews() {
        return reviewsService.getAllReviews();
    }

    @PutMapping("/update/{id}")
    public ProductReviewsDTO modifyReview(@PathVariable Long id, @RequestBody ProductReviews review) {
        return reviewsService.updateReview(id, review);
    }

    @DeleteMapping("/delete/{id}")
    public String removeReview(@PathVariable Long id) {
        return reviewsService.deleteReview(id);
    }
}
