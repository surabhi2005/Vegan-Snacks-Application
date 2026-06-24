package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.examly.springapp.model.ProductImages;
import java.util.List;

public interface ProductImagesRepository extends JpaRepository<ProductImages, Long> {
    List<ProductImages> findByProductId(Long productId);
}
