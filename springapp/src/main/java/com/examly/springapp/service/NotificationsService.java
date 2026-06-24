package com.examly.springapp.service;

import com.examly.springapp.dto.NotificationsDTO;
import com.examly.springapp.model.Notifications;
import com.examly.springapp.repository.NotificationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationsService {

    @Autowired
    private NotificationsRepository notificationsRepo;

    public NotificationsDTO addNotification(Notifications notification) {
        Notifications savedNotification = notificationsRepo.save(notification);
        return new NotificationsDTO(
                savedNotification.getId(),
                savedNotification.getUser() != null ? savedNotification.getUser().getId() : null,
                savedNotification.getUser() != null ? savedNotification.getUser().getUsername() : null,
                savedNotification.getMessage(),
                savedNotification.getType() != null ? savedNotification.getType().name() : null,
                savedNotification.isRead(),
                savedNotification.getCreatedDate(),
                savedNotification.getPriority() != null ? savedNotification.getPriority().name() : null
        );
    }

    public List<NotificationsDTO> getNotifications() {
        return notificationsRepo.findAll().stream()
                .map(n -> new NotificationsDTO(
                        n.getId(),
                        n.getUser() != null ? n.getUser().getId() : null,
                        n.getUser() != null ? n.getUser().getUsername() : null,
                        n.getMessage(),
                        n.getType() != null ? n.getType().name() : null,
                        n.isRead(),
                        n.getCreatedDate(),
                        n.getPriority() != null ? n.getPriority().name() : null
                ))
                .collect(Collectors.toList());
    }
public NotificationsDTO updateNotification(Long id, Notifications notification) {
    Notifications existingNotification = notificationsRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Notification not found"));

    existingNotification.setMessage(notification.getMessage());
    existingNotification.setType(notification.getType());
    existingNotification.setRead(notification.isRead());
    existingNotification.setPriority(notification.getPriority());

    if (notification.getUser() != null) {
        existingNotification.setUser(notification.getUser());
    }

    Notifications updatedNotification = notificationsRepo.save(existingNotification);
    return new NotificationsDTO(
            updatedNotification.getId(),
            updatedNotification.getUser() != null ? updatedNotification.getUser().getId() : null,
            updatedNotification.getUser() != null ? updatedNotification.getUser().getUsername() : null,
            updatedNotification.getMessage(),
            updatedNotification.getType() != null ? updatedNotification.getType().name() : null,
            updatedNotification.isRead(),
            updatedNotification.getCreatedDate(),
            updatedNotification.getPriority() != null ? updatedNotification.getPriority().name() : null
    );
}
public List<NotificationsDTO> getNotificationsByUser(Long userId) {
    return notificationsRepo.findByUserId(userId).stream()
            .map(n -> new NotificationsDTO(
                    n.getId(),
                    n.getUser() != null ? n.getUser().getId() : null,
                    n.getUser() != null ? n.getUser().getUsername() : null,
                    n.getMessage(),
                    n.getType() != null ? n.getType().name() : null,
                    n.isRead(),
                    n.getCreatedDate(),
                    n.getPriority() != null ? n.getPriority().name() : null
            ))
            .collect(Collectors.toList());
}


    public String deleteNotification(Long id) {
        notificationsRepo.deleteById(id);
        return "Notification deleted successfully";
    }
}
