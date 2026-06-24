// package com.examly.springapp.dto;

// import java.math.BigDecimal;

// public class OrderItemsDTO {

//     private Long id;
//     private Long orderId;
//     private Long productId;
//     private String productName;
//     private Integer quantity;
//     private BigDecimal unitPrice;
//     private BigDecimal totalPrice;

//     public OrderItemsDTO(Long id, Long orderId, Long productId, String productName,
//                          Integer quantity, BigDecimal unitPrice, BigDecimal totalPrice) {
//         this.id = id;
//         this.orderId = orderId;
//         this.productId = productId;
//         this.productName = productName;
//         this.quantity = quantity;
//         this.unitPrice = unitPrice;
//         this.totalPrice = totalPrice;
//     }

//     public Long getId() { return id; }
//     public void setId(Long id) { this.id = id; }

//     public Long getOrderId() { return orderId; }
//     public void setOrderId(Long orderId) { this.orderId = orderId; }

//     public Long getProductId() { return productId; }
//     public void setProductId(Long productId) { this.productId = productId; }

//     public String getProductName() { return productName; }
//     public void setProductName(String productName) { this.productName = productName; }

//     public Integer getQuantity() { return quantity; }
//     public void setQuantity(Integer quantity) { this.quantity = quantity; }

//     public BigDecimal getUnitPrice() { return unitPrice; }
//     public void setUnitPrice(BigDecimal unitPrice) { this.unitPrice = unitPrice; }

//     public BigDecimal getTotalPrice() { return totalPrice; }
//     public void setTotalPrice(BigDecimal totalPrice) { this.totalPrice = totalPrice; }
// }
package com.examly.springapp.dto;

import java.math.BigDecimal;
import com.examly.springapp.model.OrderItems;

public class OrderItemsDTO {

    private Long id;
    private Long orderId;
    private Long productId;
    private String productName;
    private Integer quantity;
    private BigDecimal unitPrice;
    private BigDecimal totalPrice;

    // No-args constructor
    public OrderItemsDTO() {}

    // All-args constructor
    public OrderItemsDTO(Long id, Long orderId, Long productId, String productName,
                         Integer quantity, BigDecimal unitPrice, BigDecimal totalPrice) {
        this.id = id;
        this.orderId = orderId;
        this.productId = productId;
        this.productName = productName;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.totalPrice = totalPrice;
    }

    // Static method to convert entity to DTO
    public static OrderItemsDTO fromEntity(OrderItems item) {
        if (item == null) return null;

        return new OrderItemsDTO(
            item.getId(),
            item.getOrder() != null ? item.getOrder().getId() : null,
            item.getProduct() != null ? item.getProduct().getId() : null,
            item.getProduct() != null ? item.getProduct().getSnackName() : null,
            item.getQuantity(),
            item.getUnitPrice(),
            item.getTotalPrice()
        );
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public BigDecimal getUnitPrice() { return unitPrice; }
    public void setUnitPrice(BigDecimal unitPrice) { this.unitPrice = unitPrice; }

    public BigDecimal getTotalPrice() { return totalPrice; }
    public void setTotalPrice(BigDecimal totalPrice) { this.totalPrice = totalPrice; }
}
