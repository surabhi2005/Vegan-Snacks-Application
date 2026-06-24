package com.examly.springapp.service;
import com.examly.springapp.dto.OrderItemsDTO;
import com.examly.springapp.repository.OrderItemsRepository;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SalesAnalyticsService {

    private final OrderItemsRepository orderItemsRepository;

    public SalesAnalyticsService(OrderItemsRepository orderItemsRepository) {
        this.orderItemsRepository = orderItemsRepository;
    }
    public BigDecimal calculateTotalRevenue(Long vendorId) {
        List<OrderItemsDTO> orderItems = orderItemsRepository.findOrderItemsByVendorId(vendorId);
        return orderItems.stream()
                .map(OrderItemsDTO::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
    public Long calculateTotalUnitsSold(Long vendorId) {
        List<OrderItemsDTO> orderItems = orderItemsRepository.findOrderItemsByVendorId(vendorId);
        return orderItems.stream()
                .mapToLong(OrderItemsDTO::getQuantity)
                .sum();
    }
    public BigDecimal calculateTotalProfit(Long vendorId, Map<Long, BigDecimal> productCostMap) {
        List<OrderItemsDTO> orderItems = orderItemsRepository.findOrderItemsByVendorId(vendorId);

        BigDecimal totalProfit = BigDecimal.ZERO;
        for (OrderItemsDTO item : orderItems) {
            BigDecimal costPerUnit = productCostMap.getOrDefault(item.getProductId(), BigDecimal.ZERO);
            BigDecimal revenue = item.getUnitPrice().multiply(new BigDecimal(item.getQuantity()));
            BigDecimal cost = costPerUnit.multiply(new BigDecimal(item.getQuantity()));
            totalProfit = totalProfit.add(revenue.subtract(cost));
        }
        return totalProfit;
    }
    public List<OrderItemsDTO> getTopSellingProducts(Long vendorId, int topN) {
        List<OrderItemsDTO> orderItems = orderItemsRepository.findOrderItemsByVendorId(vendorId);
        Map<Long, Integer> productSalesMap = new HashMap<>();
        Map<Long, OrderItemsDTO> productDetailsMap = new HashMap<>();

        for (OrderItemsDTO item : orderItems) {
            productSalesMap.put(item.getProductId(),
                productSalesMap.getOrDefault(item.getProductId(), 0) + item.getQuantity());
            productDetailsMap.put(item.getProductId(), item);
        }
        return productSalesMap.entrySet().stream()
                .sorted(Map.Entry.<Long, Integer>comparingByValue().reversed())
                .limit(topN)
                .map(entry -> {
                    OrderItemsDTO dto = productDetailsMap.get(entry.getKey());
                    return new OrderItemsDTO(
                        null,
                        null,
                        dto.getProductId(),
                        dto.getProductName(),
                        entry.getValue(),
                        dto.getUnitPrice(),
                        dto.getUnitPrice().multiply(new BigDecimal(entry.getValue()))
                    );
                })
                .collect(Collectors.toList());
    }
}
