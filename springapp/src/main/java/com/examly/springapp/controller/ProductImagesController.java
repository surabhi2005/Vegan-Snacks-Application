// package com.examly.springapp.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;
// import com.examly.springapp.dto.ProductImagesDTO;
// import com.examly.springapp.model.ProductImages;
// import com.examly.springapp.service.ProductImagesService;
// import java.util.List;

// @RestController
// @RequestMapping("/product-images")
// public class ProductImagesController {

//     @Autowired
//     private ProductImagesService productImagesService;

//     @PostMapping("/add")
//     public ProductImagesDTO createImage(@RequestBody ProductImages image) {
//         return productImagesService.addImage(image);
//     }

//     @GetMapping("/all")
//     public List<ProductImagesDTO> getAllImages() {
//         return productImagesService.getAllImages();
//     }

//     @PutMapping("/update/{id}")
//     public ProductImagesDTO modifyImage(@PathVariable Long id, @RequestBody ProductImages image) {
//         return productImagesService.updateImage(id, image);
//     }

//     @DeleteMapping("/delete/{id}")
//     public String removeImage(@PathVariable Long id) {
//         return productImagesService.deleteImage(id);
//     }
// }
package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.examly.springapp.dto.ProductImagesDTO;
import com.examly.springapp.model.ProductImages;
import com.examly.springapp.service.ProductImagesService;

import java.util.List;

@RestController
@RequestMapping("/product-images")
public class ProductImagesController {

    @Autowired
    private ProductImagesService productImagesService;

    @PostMapping("/add")
    public ProductImagesDTO createImage(@RequestBody ProductImages image) {
        return productImagesService.addImage(image);
    }

    @GetMapping("/all")
    public List<ProductImagesDTO> getAllImages() {
        return productImagesService.getAllImages();
    }

    // ✅ Fetch images by product_id
    @GetMapping("/product/{productId}")
    public List<ProductImagesDTO> getImagesByProduct(@PathVariable Long productId) {
        return productImagesService.getImagesByProductId(productId);
    }

    @PutMapping("/update/{id}")
    public ProductImagesDTO modifyImage(@PathVariable Long id, @RequestBody ProductImages image) {
        return productImagesService.updateImage(id, image);
    }

    @DeleteMapping("/delete/{id}")
    public String removeImage(@PathVariable Long id) {
        return productImagesService.deleteImage(id);
    }
}
