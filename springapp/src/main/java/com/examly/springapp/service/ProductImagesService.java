// package com.examly.springapp.service;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
// import com.examly.springapp.dto.ProductImagesDTO;
// import com.examly.springapp.model.ProductImages;
// import com.examly.springapp.repository.ProductImagesRepository;
// import java.util.List;
// import java.util.stream.Collectors;

// @Service
// public class ProductImagesService {

//     @Autowired
//     private ProductImagesRepository productImagesRepo;

//     public ProductImagesDTO addImage(ProductImages image) {
//         ProductImages saved = productImagesRepo.save(image);
//         return new ProductImagesDTO(
//                 saved.getId(),
//                 saved.getProduct() != null ? saved.getProduct().getId() : null,
//                 saved.getProduct() != null ? saved.getProduct().getSnackName() : null,
//                 saved.getImageUrl(),
//                 saved.getImageType() != null ? saved.getImageType().name() : null,
//                 saved.getAltText(),
//                 saved.getFileSize(),
//                 saved.getUploadDate(),
//                 saved.getIsActive()
//         );
//     }

//     public List<ProductImagesDTO> getAllImages() {
//         return productImagesRepo.findAll().stream()
//                 .map(img -> new ProductImagesDTO(
//                         img.getId(),
//                         img.getProduct() != null ? img.getProduct().getId() : null,
//                         img.getProduct() != null ? img.getProduct().getSnackName() : null,
//                         img.getImageUrl(),
//                         img.getImageType() != null ? img.getImageType().name() : null,
//                         img.getAltText(),
//                         img.getFileSize(),
//                         img.getUploadDate(),
//                         img.getIsActive()
//                 ))
//                 .collect(Collectors.toList());
//     }

//     public ProductImagesDTO updateImage(Long id, ProductImages image) {
//         ProductImages existingImage = productImagesRepo.findById(id)
//                 .orElseThrow(() -> new RuntimeException("Product image not found"));

//         existingImage.setProduct(image.getProduct());
//         existingImage.setImageUrl(image.getImageUrl());
//         existingImage.setImageType(image.getImageType());
//         existingImage.setAltText(image.getAltText());
//         existingImage.setFileSize(image.getFileSize());
//         existingImage.setUploadDate(image.getUploadDate());
//         existingImage.setIsActive(image.getIsActive());

//         ProductImages updated = productImagesRepo.save(existingImage);

//         return new ProductImagesDTO(
//                 updated.getId(),
//                 updated.getProduct() != null ? updated.getProduct().getId() : null,
//                 updated.getProduct() != null ? updated.getProduct().getSnackName() : null,
//                 updated.getImageUrl(),
//                 updated.getImageType() != null ? updated.getImageType().name() : null,
//                 updated.getAltText(),
//                 updated.getFileSize(),
//                 updated.getUploadDate(),
//                 updated.getIsActive()
//         );
//     }

//     public String deleteImage(Long id) {
//         productImagesRepo.deleteById(id);
//         return "Product image deleted successfully";
//     }
// }
package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.examly.springapp.dto.ProductImagesDTO;
import com.examly.springapp.model.ProductImages;
import com.examly.springapp.repository.ProductImagesRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductImagesService {

    @Autowired
    private ProductImagesRepository productImagesRepo;

    public ProductImagesDTO addImage(ProductImages image) {
        ProductImages saved = productImagesRepo.save(image);
        return convertToDTO(saved);
    }

    public List<ProductImagesDTO> getAllImages() {
        return productImagesRepo.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // ✅ Fetch all images belonging to a productId
    public List<ProductImagesDTO> getImagesByProductId(Long productId) {
        return productImagesRepo.findByProductId(productId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ProductImagesDTO updateImage(Long id, ProductImages image) {
        ProductImages existingImage = productImagesRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product image not found"));

        existingImage.setProduct(image.getProduct());
        existingImage.setImageUrl(image.getImageUrl());
        existingImage.setImageType(image.getImageType());
        existingImage.setAltText(image.getAltText());
        existingImage.setFileSize(image.getFileSize());
        existingImage.setUploadDate(image.getUploadDate());
        existingImage.setIsActive(image.getIsActive());

        ProductImages updated = productImagesRepo.save(existingImage);

        return convertToDTO(updated);
    }

    public String deleteImage(Long id) {
        productImagesRepo.deleteById(id);
        return "Product image deleted successfully";
    }

    // ✅ Reusable DTO converter
    private ProductImagesDTO convertToDTO(ProductImages img) {
        return new ProductImagesDTO(
                img.getId(),
                img.getProduct() != null ? img.getProduct().getId() : null,
                img.getProduct() != null ? img.getProduct().getSnackName() : null,
                img.getImageUrl(),
                img.getImageType() != null ? img.getImageType().name() : null,
                img.getAltText(),
                img.getFileSize(),
                img.getUploadDate(),
                img.getIsActive()
        );
    }
}
