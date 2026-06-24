package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.examly.springapp.dto.InventoryDTO;
import com.examly.springapp.model.Inventory;
import com.examly.springapp.repository.InventoryRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepo;

    public Inventory addInventory(Inventory inventory) {
        return inventoryRepo.save(inventory);
    }

    public List<InventoryDTO> getInventory() {
        return inventoryRepo.findAll().stream()
                .map(i -> new InventoryDTO(
                        i.getId(),
                        i.getProduct() != null ? i.getProduct().getId() : null,
                        i.getProduct() != null ? i.getProduct().getSnackName() : null,
                        i.getCurrentStock(),
                        i.getReorderPoint(),
                        i.getMaxStock(),
                        i.getCostPerUnit(),
                        i.getLastRestockDate(),
                        i.getLastUpdated(),
                        i.getLocation()
                ))
                .collect(Collectors.toList());
    }

    public InventoryDTO updateInventory(Long id, Inventory inventory) {
        Inventory existingInventory = inventoryRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory not found"));

        existingInventory.setProduct(inventory.getProduct());
        existingInventory.setCurrentStock(inventory.getCurrentStock());
        existingInventory.setReorderPoint(inventory.getReorderPoint());
        existingInventory.setMaxStock(inventory.getMaxStock());
        existingInventory.setCostPerUnit(inventory.getCostPerUnit());
        existingInventory.setLastRestockDate(inventory.getLastRestockDate());
        existingInventory.setLastUpdated(inventory.getLastUpdated());
        existingInventory.setLocation(inventory.getLocation());

        Inventory updated = inventoryRepo.save(existingInventory);

        return new InventoryDTO(
                updated.getId(),
                updated.getProduct() != null ? updated.getProduct().getId() : null,
                updated.getProduct() != null ? updated.getProduct().getSnackName() : null,
                updated.getCurrentStock(),
                updated.getReorderPoint(),
                updated.getMaxStock(),
                updated.getCostPerUnit(),
                updated.getLastRestockDate(),
                updated.getLastUpdated(),
                updated.getLocation()
        );
    }

    public String deleteInventory(Long id) {
        inventoryRepo.deleteById(id);
        return "Inventory record deleted successfully";
    }
    public InventoryDTO getInventoryById(long id) {
    Inventory inventory = inventoryRepo.findById(id);

    return new InventoryDTO(
        inventory.getId(),
        inventory.getProduct() != null ? inventory.getProduct().getId() : null,
        inventory.getProduct() != null ? inventory.getProduct().getSnackName() : null,
        inventory.getCurrentStock(),
        inventory.getReorderPoint(),
        inventory.getMaxStock(),
        inventory.getCostPerUnit(),
        inventory.getLastRestockDate(),
        inventory.getLastUpdated(),
        inventory.getLocation()
    );
}


}
