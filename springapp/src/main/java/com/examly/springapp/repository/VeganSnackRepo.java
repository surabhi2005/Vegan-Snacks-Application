package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.examly.springapp.model.VeganSnack;
import java.util.List;

public interface VeganSnackRepo extends JpaRepository<VeganSnack, Long> {

    // Get snacks by vendor
    List<VeganSnack> findByVendorId(Long vendorId);

    // Get snacks by status
    List<VeganSnack> findByStatus(VeganSnack.SnackStatus status);

    // Count snacks by status
    long countByStatus(VeganSnack.SnackStatus status);

    // Optional: Get snacks pending approval for admin
    default List<VeganSnack> findPendingSnacks() {
        return findByStatus(VeganSnack.SnackStatus.PENDING_APPROVAL);
    }
}
