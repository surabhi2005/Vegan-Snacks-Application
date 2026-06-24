package com.examly.springapp.service;

import com.examly.springapp.model.ProductCategories;
import com.examly.springapp.repository.ProductCategoriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductCategoriesService {

    @Autowired
    private ProductCategoriesRepository categoriesRepository;

    public ProductCategories addCategory(ProductCategories category) {
        return categoriesRepository.save(category);
    }

    public List<ProductCategories> getAllCategories() {
        return categoriesRepository.findAll();
    }

    public ProductCategories getCategoryById(Long id) {
        return categoriesRepository.findById(id).orElse(null);
    }

    public ProductCategories updateCategory(Long id, ProductCategories category) {
        ProductCategories existing = categoriesRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setCategoryName(category.getCategoryName());
            existing.setDescription(category.getDescription());
            existing.setParentCategory(category.getParentCategory());
            return categoriesRepository.save(existing);
        }
        return null;
    }

    public String deleteCategory(Long id) {
        if (categoriesRepository.existsById(id)) {
            categoriesRepository.deleteById(id);
            return "Category deleted successfully.";
        }
        return "Category not found.";
    }
}
