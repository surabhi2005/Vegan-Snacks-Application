package com.examly.springapp.controller;

import com.examly.springapp.model.ProductCategories;
import com.examly.springapp.service.ProductCategoriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class ProductCategoriesController {

    @Autowired
    private ProductCategoriesService categoriesService;

    @PostMapping("/add")
    public ProductCategories addCategory(@RequestBody ProductCategories category) {
        return categoriesService.addCategory(category);
    }

    @GetMapping("/all")
    public List<ProductCategories> getAllCategories() {
        return categoriesService.getAllCategories();
    }

    @PutMapping("/update/{id}")
    public ProductCategories updateCategory(@PathVariable Long id, @RequestBody ProductCategories category) {
        return categoriesService.updateCategory(id, category);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteCategory(@PathVariable Long id) {
        return categoriesService.deleteCategory(id);
    }
}

