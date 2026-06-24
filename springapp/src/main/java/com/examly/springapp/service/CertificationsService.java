// package com.examly.springapp.service;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
// import com.examly.springapp.dto.CertificationsDTO;
// import com.examly.springapp.model.Certifications;
// import com.examly.springapp.repository.CertificationsRepository;

// import java.util.List;
// import java.util.stream.Collectors;

// @Service
// public class CertificationsService {

//     @Autowired
//     private CertificationsRepository certRepo;

//     public CertificationsDTO addCertification(Certifications cert) {
//         Certifications saved = certRepo.save(cert);
//         return new CertificationsDTO(
//                 saved.getId(),
//                 saved.getVendor() != null ? saved.getVendor().getId() : null,
//                 saved.getVendor() != null ? saved.getVendor().getBusinessName() : null,
//                 saved.getCertificationType() != null ? saved.getCertificationType().name() : null,
//                 saved.getCertificateNumber(),
//                 saved.getIssueDate(),
//                 saved.getExpiryDate()
//         );
//     }

//     public List<CertificationsDTO> getAllCertifications() {
//         return certRepo.findAll().stream()
//                 .map(c -> new CertificationsDTO(
//                         c.getId(),
//                         c.getVendor() != null ? c.getVendor().getId() : null,
//                         c.getVendor() != null ? c.getVendor().getBusinessName() : null,
//                         c.getCertificationType() != null ? c.getCertificationType().name() : null,
//                         c.getCertificateNumber(),
//                         c.getIssueDate(),
//                         c.getExpiryDate()
//                 ))
//                 .collect(Collectors.toList());
//     }

//     public CertificationsDTO updateCertification(Long id, Certifications cert) {
//         Certifications existingCert = certRepo.findById(id)
//                 .orElseThrow(() -> new RuntimeException("Certification not found"));

//         existingCert.setVendor(cert.getVendor());
//         existingCert.setCertificationType(cert.getCertificationType());
//         existingCert.setCertificateNumber(cert.getCertificateNumber());
//         existingCert.setIssueDate(cert.getIssueDate());
//         existingCert.setExpiryDate(cert.getExpiryDate());

//         Certifications updated = certRepo.save(existingCert);
//         return new CertificationsDTO(
//                 updated.getId(),
//                 updated.getVendor() != null ? updated.getVendor().getId() : null,
//                 updated.getVendor() != null ? updated.getVendor().getBusinessName() : null,
//                 updated.getCertificationType() != null ? updated.getCertificationType().name() : null,
//                 updated.getCertificateNumber(),
//                 updated.getIssueDate(),
//                 updated.getExpiryDate()
//         );
//     }

//     public String deleteCertification(Long id) {
//         certRepo.deleteById(id);
//         return "Certification deleted successfully";
//     }
// }
package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.examly.springapp.dto.CertificationsDTO;
import com.examly.springapp.model.Certifications;
import com.examly.springapp.repository.CertificationsRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CertificationsService {

    @Autowired
    private CertificationsRepository certRepo;

    // ✅ Convert Certification -> DTO
    private CertificationsDTO mapToDTO(Certifications cert) {
        return new CertificationsDTO(
                cert.getId(),
                cert.getVendor() != null ? cert.getVendor().getId() : null,
                cert.getVendor() != null ? cert.getVendor().getBusinessName() : null,
                cert.getCertificationType() != null ? cert.getCertificationType().name() : null,
                cert.getCertificateNumber(),
                cert.getIssueDate(),
                cert.getExpiryDate()
        );
    }

    // ✅ Add new certificate
    public CertificationsDTO addCertification(Certifications cert) {
        Certifications saved = certRepo.save(cert);
        return mapToDTO(saved);
    }

    // ✅ Get all certifications (for users)
    public List<CertificationsDTO> getAllCertifications() {
        return certRepo.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // ✅ Get certifications by Vendor ID
    public List<CertificationsDTO> getCertificationsByVendorId(Long vendorId) {
        return certRepo.findByVendorId(vendorId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // ✅ Update certificate
    // public CertificationsDTO updateCertification(Long id, Certifications cert) {
    //     Certifications existingCert = certRepo.findById(id)
    //             .orElseThrow(() -> new RuntimeException("Certification not found"));

    //     existingCert.setVendor(cert.getVendor());
    //     existingCert.setCertificationType(cert.getCertificationType());
    //     existingCert.setCertificateNumber(cert.getCertificateNumber());
    //     existingCert.setIssueDate(cert.getIssueDate());
    //     existingCert.setExpiryDate(cert.getExpiryDate());

    //     Certifications updated = certRepo.save(existingCert);
    //     return mapToDTO(updated);
    // }
    public CertificationsDTO updateCertification(Long id, Certifications cert) {
    Certifications existingCert = certRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Certification not found"));

    // Keep the existing vendor, do not overwrite
    // existingCert.setVendor(cert.getVendor()); // remove this

    // Update only allowed fields
    existingCert.setCertificationType(cert.getCertificationType());
    existingCert.setCertificateNumber(cert.getCertificateNumber());
    existingCert.setIssueDate(cert.getIssueDate());
    existingCert.setExpiryDate(cert.getExpiryDate());

    Certifications updated = certRepo.save(existingCert);
    return mapToDTO(updated);
}


    // ✅ Delete certificate
    public String deleteCertification(Long id) {
        if (!certRepo.existsById(id)) {
            throw new RuntimeException("Certification not found");
        }
        certRepo.deleteById(id);
        return "Certification deleted successfully";
    }
}
