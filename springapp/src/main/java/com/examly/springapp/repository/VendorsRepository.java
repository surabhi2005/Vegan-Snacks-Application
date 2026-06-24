package com.examly.springapp.repository;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import com.examly.springapp.model.Vendors;
public interface VendorsRepository extends JpaRepository<Vendors, Long> {
    Vendors findById(long id);
    Optional<Vendors> findByUserId(Long userId);
    Page<Vendors> findAll(Pageable pageable);
}
