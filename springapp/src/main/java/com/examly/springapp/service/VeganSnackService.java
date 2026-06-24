package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.examly.springapp.repository.VeganSnackRepo;
import com.examly.springapp.repository.VendorsRepository;
import com.examly.springapp.dto.VeganSnackDTO;
import com.examly.springapp.model.Users;
import com.examly.springapp.model.VeganSnack;
import com.examly.springapp.model.Vendors;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VeganSnackService {

    @Autowired
    private VeganSnackRepo snacksRepo;

    @Autowired
    private VendorsRepository vendorsRepo;

    public VeganSnack addSnack(VeganSnack snack) {
        // Validate vendor exists
        Vendors vendor = vendorsRepo.findById(snack.getVendor().getId())
                .orElseThrow(() -> new RuntimeException("Vendor not found"));
        snack.setVendor(vendor);
        return snacksRepo.save(snack);
    }

    public List<VeganSnackDTO> getSnacks() {
        List<VeganSnack> snacks = snacksRepo.findAll();
        if (snacks == null) return new ArrayList<>();

        return snacks.stream()
                .map(snack -> new VeganSnackDTO(
                        snack.getId(),
                        snack.getVendor() != null ? snack.getVendor().getId() : null,
                        snack.getVendor() != null ? snack.getVendor().getBusinessName() : null,
                        snack.getSnackName(),
                        snack.getSnackType(),
                        snack.getDescription(),
                        snack.getIngredients(),
                        snack.getNutritionalInfo(),
                        snack.getQuantity(),
                        snack.getPrice(),
                        snack.getExpiryInMonths(),
                        snack.getSku(),
                        snack.getStatus() != null ? snack.getStatus().name() : null,
                        snack.getCreatedDate(),
                        snack.getLastModified(),
                        snack.getApprovedBy() != null ? snack.getApprovedBy().getId() : null,
                        snack.getApprovedBy() != null ? snack.getApprovedBy().getUsername() : null,
                        snack.getApprovalDate()
                ))
                .collect(Collectors.toList());
    }

    // Fetch snacks by vendor ID
    public List<VeganSnackDTO> getSnacksByVendorId(Long vendorId) {
        List<VeganSnack> snacks = snacksRepo.findByVendorId(vendorId);
        if (snacks == null) return new ArrayList<>();

        return snacks.stream()
                .map(snack -> new VeganSnackDTO(
                        snack.getId(),
                        snack.getVendor() != null ? snack.getVendor().getId() : null,
                        snack.getVendor() != null ? snack.getVendor().getBusinessName() : null,
                        snack.getSnackName(),
                        snack.getSnackType(),
                        snack.getDescription(),
                        snack.getIngredients(),
                        snack.getNutritionalInfo(),
                        snack.getQuantity(),
                        snack.getPrice(),
                        snack.getExpiryInMonths(),
                        snack.getSku(),
                        snack.getStatus() != null ? snack.getStatus().name() : null,
                        snack.getCreatedDate(),
                        snack.getLastModified(),
                        snack.getApprovedBy() != null ? snack.getApprovedBy().getId() : null,
                        snack.getApprovedBy() != null ? snack.getApprovedBy().getUsername() : null,
                        snack.getApprovalDate()
                ))
                .collect(Collectors.toList());
    }

    public VeganSnackDTO updateSnack(Long id, VeganSnack snack) {
        VeganSnack existingSnack = snacksRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Snack not found"));

        existingSnack.setSnackName(snack.getSnackName());
        existingSnack.setSnackType(snack.getSnackType());
        existingSnack.setDescription(snack.getDescription());
        existingSnack.setIngredients(snack.getIngredients());
        existingSnack.setNutritionalInfo(snack.getNutritionalInfo());
        existingSnack.setQuantity(snack.getQuantity());
        existingSnack.setPrice(snack.getPrice());
        existingSnack.setExpiryInMonths(snack.getExpiryInMonths());
        existingSnack.setSku(snack.getSku());
        existingSnack.setStatus(snack.getStatus());
        existingSnack.setCreatedDate(snack.getCreatedDate());
        existingSnack.setLastModified(snack.getLastModified());
        existingSnack.setApprovalDate(snack.getApprovalDate());

        if (snack.getVendor() != null) {
            Vendors vendor = vendorsRepo.findById(snack.getVendor().getId())
                    .orElseThrow(() -> new RuntimeException("Vendor not found"));
            existingSnack.setVendor(vendor);
        }

        VeganSnack updated = snacksRepo.save(existingSnack);
        return new VeganSnackDTO(
                updated.getId(),
                updated.getVendor() != null ? updated.getVendor().getId() : null,
                updated.getVendor() != null ? updated.getVendor().getBusinessName() : null,
                updated.getSnackName(),
                updated.getSnackType(),
                updated.getDescription(),
                updated.getIngredients(),
                updated.getNutritionalInfo(),
                updated.getQuantity(),
                updated.getPrice(),
                updated.getExpiryInMonths(),
                updated.getSku(),
                updated.getStatus() != null ? updated.getStatus().name() : null,
                updated.getCreatedDate(),
                updated.getLastModified(),
                updated.getApprovedBy() != null ? updated.getApprovedBy().getId() : null,
                updated.getApprovedBy() != null ? updated.getApprovedBy().getUsername() : null,
                updated.getApprovalDate()
        );
    }

    public String deleteSnack(Long id) {
        snacksRepo.deleteById(id);
        return "Snack deleted successfully";
    }

     public boolean checkQCStatus(Long snackId) {
        VeganSnack snack = snacksRepo.findById(snackId)
                .orElseThrow(() -> new RuntimeException("Snack not found"));

        return snack.getStatus() == VeganSnack.SnackStatus.APPROVED;
    }


    public VeganSnackDTO approveSnack(Long snackId, Users approver) {
        VeganSnack snack = snacksRepo.findById(snackId)
                .orElseThrow(() -> new RuntimeException("Snack not found"));

        snack.setStatus(VeganSnack.SnackStatus.APPROVED);
        snack.setApprovedBy(approver);
        snack.setApprovalDate(LocalDateTime.now());

        VeganSnack updated = snacksRepo.save(snack);
        return convertToDTO(updated);
    }

    // Reject a snack (Admin)
    public VeganSnackDTO rejectSnack(Long snackId, Users approver, String notes) {
        VeganSnack snack = snacksRepo.findById(snackId)
                .orElseThrow(() -> new RuntimeException("Snack not found"));

        snack.setStatus(VeganSnack.SnackStatus.REJECTED);
        snack.setApprovedBy(approver);
        snack.setApprovalDate(LocalDateTime.now());
        // Optional: save notes in a separate field if available

        VeganSnack updated = snacksRepo.save(snack);
        return convertToDTO(updated);
    }

    public long countSnacksByStatus(VeganSnack.SnackStatus status) {
        return snacksRepo.countByStatus(status);
    }

     public List<VeganSnackDTO> getPendingSnacks() {
        List<VeganSnack> snacks = snacksRepo.findByStatus(VeganSnack.SnackStatus.PENDING_APPROVAL);
        return snacks.stream().map(this::convertToDTO).collect(Collectors.toList());
    }
      private VeganSnackDTO convertToDTO(VeganSnack snack) {
        return new VeganSnackDTO(
                snack.getId(),
                snack.getVendor() != null ? snack.getVendor().getId() : null,
                snack.getVendor() != null ? snack.getVendor().getBusinessName() : null,
                snack.getSnackName(),
                snack.getSnackType(),
                snack.getDescription(),
                snack.getIngredients(),
                snack.getNutritionalInfo(),
                snack.getQuantity(),
                snack.getPrice(),
                snack.getExpiryInMonths(),
                snack.getSku(),
                snack.getStatus() != null ? snack.getStatus().name() : null,
                snack.getCreatedDate(),
                snack.getLastModified(),
                snack.getApprovedBy() != null ? snack.getApprovedBy().getId() : null,
                snack.getApprovedBy() != null ? snack.getApprovedBy().getUsername() : null,
                snack.getApprovalDate()
        );
    }

}