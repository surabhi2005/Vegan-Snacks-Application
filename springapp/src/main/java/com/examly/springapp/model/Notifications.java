package com.examly.springapp.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
public class Notifications {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @Column(columnDefinition = "TEXT")
    private String message;

    public enum NotificationType {
        STOCK_ALERT, ORDER, EXPIRY, SYSTEM, MARKETING
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private NotificationType type;

    @Column(name = "is_read", columnDefinition = "BOOLEAN DEFAULT FALSE")
    private boolean isRead = false;

    @Column(name = "created_date", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdDate;

    public enum Priority {
        LOW, MEDIUM, HIGH
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "priority", columnDefinition = "ENUM('LOW','MEDIUM','HIGH') DEFAULT 'MEDIUM'")
    private Priority priority = Priority.MEDIUM;

    public Notifications() {}

    public Notifications(Users user, String message, NotificationType type,
                         boolean isRead, LocalDateTime createdDate, Priority priority) {
        this.user = user;
        this.message = message;
        this.type = type;
        this.isRead = isRead;
        this.createdDate = createdDate;
        this.priority = priority;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Users getUser() { return user; }
    public void setUser(Users user) { this.user = user; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public NotificationType getType() { return type; }
    public void setType(NotificationType type) { this.type = type; }

    public boolean isRead() { return isRead; }
    public void setRead(boolean read) { isRead = read; }

    public LocalDateTime getCreatedDate() { return createdDate; }
    public void setCreatedDate(LocalDateTime createdDate) { this.createdDate = createdDate; }

    public Priority getPriority() { return priority; }
    public void setPriority(Priority priority) { this.priority = priority; }
}
