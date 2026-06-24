package com.examly.springapp.model;

import jakarta.persistence.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "product_categories")
public class ProductCategories {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "parent_category_id")
    @JsonBackReference // Prevent recursion from child to parent
    private ProductCategories parentCategory;

    @OneToMany(mappedBy = "parentCategory", cascade = CascadeType.ALL)
    @JsonManagedReference // Serialize subcategories normally
    private List<ProductCategories> subCategories;
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
@JsonManagedReference // Allow serializing snacks list in category
private List<VeganSnack> snacks;


    @Column(nullable = false, length = 100)
    private String categoryName;

    @Column(columnDefinition = "TEXT")
    private String description;

    // Constructors
    public ProductCategories() {}

    public ProductCategories(String categoryName, String description, ProductCategories parentCategory) {
        this.categoryName = categoryName;
        this.description = description;
        this.parentCategory = parentCategory;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public ProductCategories getParentCategory() { return parentCategory; }
    public void setParentCategory(ProductCategories parentCategory) { this.parentCategory = parentCategory; }

    public List<ProductCategories> getSubCategories() { return subCategories; }
    public void setSubCategories(List<ProductCategories> subCategories) { this.subCategories = subCategories; }

    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
