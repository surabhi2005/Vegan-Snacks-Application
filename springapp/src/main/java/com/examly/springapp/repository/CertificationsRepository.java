package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.examly.springapp.model.Certifications;
import java.util.List;
public interface CertificationsRepository extends JpaRepository<Certifications, Long> {
    List<Certifications> findByVendorId(Long vendorId);
}

