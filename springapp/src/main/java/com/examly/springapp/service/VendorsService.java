package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.examly.springapp.repository.UsersRepository;
import com.examly.springapp.repository.VendorsRepository;
import com.examly.springapp.dto.VendorRequest;
import com.examly.springapp.dto.VendorsDTO;
import com.examly.springapp.model.Vendors;
import com.examly.springapp.model.Certifications;
import com.examly.springapp.model.Users;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VendorsService {

    @Autowired
    private VendorsRepository vendorRepo;

    @Autowired
    private UsersRepository usersRepo;

     public Page<VendorsDTO> getVendorsPage(Pageable pageable) {
        return vendorRepo.findAll(pageable)
                .map(this::mapToDTO);
    }
public VendorsDTO addVendor(VendorRequest vendorRequest) {
        Users user = usersRepo.findById(vendorRequest.getUserId())
                              .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if vendor already exists
        if (vendorRepo.findByUserId(user.getId()).isPresent()) {
            throw new RuntimeException("Vendor details already exist for this user.");
        }

        // Create vendor object
        Vendors vendor = new Vendors();
        vendor.setUser(user);
        vendor.setBusinessName(vendorRequest.getBusinessName());
        vendor.setBusinessLicenseNumber(vendorRequest.getBusinessLicenseNumber());
        vendor.setTaxId(vendorRequest.getTaxId());
        vendor.setBusinessAddress(vendorRequest.getBusinessAddress());
        vendor.setBusinessPhone(vendorRequest.getBusinessPhone());
        vendor.setBusinessEmail(vendorRequest.getBusinessEmail());
        vendor.setEstablishedYear(vendorRequest.getEstablishedYear());
        vendor.setYearsOfExperience(vendorRequest.getYearsOfExperience());
        vendor.setTargetMarket(vendorRequest.getTargetMarket());
        vendor.setBusinessDescription(vendorRequest.getBusinessDescription());
        vendor.setHaccpCertificationNumber(vendorRequest.getHaccpCertificationNumber());
        vendor.setFdaRegistrationNumber(vendorRequest.getFdaRegistrationNumber());
        vendor.setApprovalStatus(Vendors.ApprovalStatus.PENDING);
        vendor.setApprovalNotes(null);
        vendor.setApprovalDate(null);
        vendor.setApprovedBy(null);

        // Handle certifications if present
        if (vendorRequest.getCertifications() != null && !vendorRequest.getCertifications().isEmpty()) {
            vendorRequest.getCertifications().forEach(cert -> cert.setVendor(vendor));
            vendor.setCertifications(vendorRequest.getCertifications());
        }

        Vendors savedVendor = vendorRepo.save(vendor);
        return mapToDTO(savedVendor);
    }

public VendorsDTO getVendorById(long id)
{
    Vendors vendor=vendorRepo.findById(id);
    return mapToDTO(vendor);
}
public VendorsDTO getVendorByUserId(Long userId) {
    Vendors ven=vendorRepo.findByUserId(userId).orElse(null);
    return mapToDTO(ven);
}
    public List<VendorsDTO> getVendors() {
        return vendorRepo.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
public VendorsDTO updateVendor(Long id, Vendors vendor) {
    Vendors existingVendor = vendorRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Vendor not found"));
    existingVendor.setBusinessName(vendor.getBusinessName());
    existingVendor.setBusinessLicenseNumber(vendor.getBusinessLicenseNumber());
    existingVendor.setTaxId(vendor.getTaxId());
    existingVendor.setBusinessAddress(vendor.getBusinessAddress());
    existingVendor.setBusinessPhone(vendor.getBusinessPhone());
    existingVendor.setBusinessEmail(vendor.getBusinessEmail());
    existingVendor.setEstablishedYear(vendor.getEstablishedYear());
    existingVendor.setYearsOfExperience(vendor.getYearsOfExperience());
    existingVendor.setTargetMarket(vendor.getTargetMarket());
    existingVendor.setBusinessDescription(vendor.getBusinessDescription());
    existingVendor.setHaccpCertificationNumber(vendor.getHaccpCertificationNumber());
    existingVendor.setFdaRegistrationNumber(vendor.getFdaRegistrationNumber());
    if (vendor.getCertifications() != null) {
        for (Certifications cert : vendor.getCertifications()) {
            boolean alreadyExists = existingVendor.getCertifications().stream()
                    .anyMatch(c -> c.getId() != null && c.getId().equals(cert.getId()));
            if (!alreadyExists) {
                cert.setVendor(existingVendor);
                existingVendor.getCertifications().add(cert);
            }
        }
    }

    Vendors updated = vendorRepo.save(existingVendor);
    return mapToDTO(updated);
}

public List<VendorsDTO> getVendorsSortedByName() {
    return vendorRepo.findAll(Sort.by(Sort.Direction.ASC, "businessName"))
                     .stream()
                     .map(this::mapToDTO)
                     .collect(Collectors.toList());
}


    public String deleteVendor(Long id) {
        vendorRepo.deleteById(id);
        return "Vendor deleted successfully";
    }

    public VendorsDTO approveVendor(Long vendorId, Users approvedBy, String notes) {
        Vendors vendor = vendorRepo.findById(vendorId)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));
        vendor.setApprovalStatus(Vendors.ApprovalStatus.APPROVED);
        vendor.setApprovalDate(LocalDateTime.now());
        vendor.setApprovedBy(approvedBy);
        vendor.setApprovalNotes(notes);
        return mapToDTO(vendorRepo.save(vendor));
    }

    public VendorsDTO rejectVendor(Long vendorId, Users approvedBy, String notes) {
        Vendors vendor = vendorRepo.findById(vendorId)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));
        vendor.setApprovalStatus(Vendors.ApprovalStatus.REJECTED);
        vendor.setApprovalDate(LocalDateTime.now());
        vendor.setApprovedBy(approvedBy);
        vendor.setApprovalNotes(notes);
        return mapToDTO(vendorRepo.save(vendor));
    }

    public VendorsDTO suspendVendor(Long vendorId, String reason) {
        Vendors vendor = vendorRepo.findById(vendorId)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));
        vendor.setApprovalStatus(Vendors.ApprovalStatus.SUSPENDED);
        vendor.setApprovalNotes(reason);
        return mapToDTO(vendorRepo.save(vendor));
    }

    public boolean checkComplianceStatus(Long vendorId) {
        Vendors vendor = vendorRepo.findById(vendorId)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));
        return vendor.getHaccpCertificationNumber() != null &&
               vendor.getFdaRegistrationNumber() != null &&
               vendor.getCertifications() != null &&
               !vendor.getCertifications().isEmpty();
    }

    public long countVendorsByStatus(Vendors.ApprovalStatus status) {
        return vendorRepo.findAll().stream()
                .filter(v -> v.getApprovalStatus() == status)
                .count();
    }

   private VendorsDTO mapToDTO(Vendors v) {
    return new VendorsDTO(
            v.getId(),
            v.getUser() != null ? v.getUser().getId() : null,
            v.getUser() != null ? v.getUser().getUsername() : null,
            v.getBusinessName(),
            v.getBusinessLicenseNumber(),
            v.getTaxId(),
            v.getBusinessAddress(),
            v.getBusinessPhone(),
            v.getBusinessEmail(),
            v.getEstablishedYear(),
            v.getYearsOfExperience(),
            v.getTargetMarket(),
            v.getBusinessDescription(),
            v.getHaccpCertificationNumber(),
            v.getFdaRegistrationNumber(),
            v.getApprovalStatus() != null ? v.getApprovalStatus().name() : null,
            v.getApprovalNotes(),
            v.getApprovalDate(),
            v.getApprovedBy() != null ? v.getApprovedBy().getId() : null,
            v.getApprovedBy() != null ? v.getApprovedBy().getUsername() : null
    );
}

}
