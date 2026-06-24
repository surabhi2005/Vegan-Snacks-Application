package com.examly.springapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.examly.springapp.model.Users;
public interface UsersRepository extends JpaRepository<Users,Long>{
    Users findById(long id);
    Optional<Users> findByUsername(String username);
    Optional<Users> findByEmail(String email);
}
