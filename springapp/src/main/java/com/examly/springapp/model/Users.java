package com.examly.springapp.model;

import java.time.LocalDateTime;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.util.List;
@Entity
@Table(name = "users")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true, length = 50)
    private String username;
    @Column(nullable = false, unique = true, length = 100)
    private String email;
    @Column(name = "password_hash", nullable = false, length = 255)
    private String password_hash;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Role role;
    @Column(name = "phone_number", length = 15)
    private String phoneNumber;
    @Column(name = "created_date", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
      private LocalDateTime createdDate;
      @Column(name = "email_verified", columnDefinition = "TINYINT(1) DEFAULT 0")
      private boolean emailVerified;
      @Column(name = "is_active", columnDefinition = "TINYINT(1) DEFAULT 1")
      private boolean isActive;
    @Column(name = "last_login")
    private LocalDateTime lastLogin;
  @OneToMany(mappedBy = "approvedBy")
   private List<VeganSnack> approvedSnacks;
   @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductReviews> productReviews;
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Orders> orders;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
   private List<Notifications> notifications;
   @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
private Vendors vendor;



    public enum Role {
        CUSTOMER, VENDOR, PRODUCT_MANAGER, ADMIN
    }

    public Users() {

    }

    public Users(String username, String email, String password_hash, Role role,
            String phoneNumber, LocalDateTime createdDate, LocalDateTime lastLogin,
            Boolean isActive, Boolean emailVerified) {
        this.username = username;
        this.email = email;
        this.password_hash = password_hash;
        this.role = role;
        this.phoneNumber = phoneNumber;
        this.createdDate = createdDate;
        this.lastLogin = lastLogin;
        this.isActive = isActive;
        this.emailVerified = emailVerified;
    }
    public List<Notifications> getNotifications() {
    return notifications;
}

public void setNotifications(List<Notifications> notifications) {
    this.notifications = notifications;
}


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword_hash() {
        return password_hash;
    }

    public void setPassword_hash(String password_hash) {
        this.password_hash = password_hash;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDateTime getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(LocalDateTime lastLogin) {
        this.lastLogin = lastLogin;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Boolean getEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(Boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

}
