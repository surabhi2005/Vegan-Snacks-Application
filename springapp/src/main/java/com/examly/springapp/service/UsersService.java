// package com.examly.springapp.service;

// import com.examly.springapp.dto.UsersDTO;
// import com.examly.springapp.model.Users;
// import com.examly.springapp.model.Vendors;
// import com.examly.springapp.repository.UsersRepository;
// import com.examly.springapp.repository.VendorsRepository;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.stereotype.Service;

// import java.time.LocalDateTime;
// import java.util.*;
// import java.util.stream.Collectors;

// @Service
// public class UsersService {

//     @Autowired
//     private UsersRepository usersRepo;
//     @Autowired
//     private VendorsRepository vendorsRepo;

//     private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

//     /* -------------------- AUTH METHODS -------------------- */

//     public String signup(Users u) {
//         if (usersRepo.findByUsername(u.getUsername()).isPresent()) {
//             return "Username already exists!";
//         }
//         if (usersRepo.findByEmail(u.getEmail()).isPresent()) {
//             return "Email already exists!";
//         }

//         u.setPassword_hash(passwordEncoder.encode(u.getPassword_hash()));
//         u.setCreatedDate(LocalDateTime.now());
//         u.setIsActive(true);
//         usersRepo.save(u);

//         return "Signup successful!";
//     }


// public Object login(String username, String rawPassword, String role) {
//     Optional<Users> userOpt = usersRepo.findByUsername(username);
//     if (userOpt.isEmpty()) {
//         return "Invalid username!";
//     }

//     Users user = userOpt.get();

//     // Password check
//     if (!passwordEncoder.matches(rawPassword, user.getPassword_hash())) {
//         return "Invalid password!";
//     }

//     // Role check
//     if (user.getRole() == null || !user.getRole().name().equalsIgnoreCase(role)) {
//         return "Invalid role!";
//     }

//     // Update last login
//     user.setLastLogin(LocalDateTime.now());
//     usersRepo.save(user);

//     Long vendorId = null;
//     if (user.getRole().name().equalsIgnoreCase("VENDOR")) {
//         vendorId = vendorsRepo.findByUserId(user.getId())
//                               .map(Vendors::getId)
//                               .orElse(null); // null means vendor details not filled yet
//     }

//     return new LoginResponse(
//         user.getId(),
//         user.getUsername(),
//         user.getRole().name(),
//         vendorId
//     );
// }

//     /* -------------------- CRUD METHODS -------------------- */

//     public List<UsersDTO> addUser(Users u) {
//         if (u.getNotifications() != null) {
//             u.getNotifications().forEach(n -> {
//                 n.setUser(u);
//                 n.setId(null);
//             });
//         }
//         Users savedUser = usersRepo.save(u);
//         return List.of(mapToDTO(savedUser));
//     }
//     public UsersDTO getbyIdUsers(long id)
// {
//     Users users=usersRepo.findById(id);
//     return mapToDTO(users);
// }


//     public List<UsersDTO> getUsers() {
//         return usersRepo.findAll().stream()
//                 .map(this::mapToDTO)
//                 .collect(Collectors.toList());
//     }

//     public List<UsersDTO> updateUser(Long id, Users u) {
//         Users existingUser = usersRepo.findById(id)
//                 .orElseThrow(() -> new RuntimeException("User not found"));

//         if (u.getUsername() != null) existingUser.setUsername(u.getUsername());
//         if (u.getEmail() != null) existingUser.setEmail(u.getEmail());
//         if (u.getPassword_hash() != null) {
//             existingUser.setPassword_hash(passwordEncoder.encode(u.getPassword_hash()));
//         }
//         if (u.getRole() != null) existingUser.setRole(u.getRole());
//         if (u.getPhoneNumber() != null) existingUser.setPhoneNumber(u.getPhoneNumber());
//         if (u.getCreatedDate() != null) existingUser.setCreatedDate(u.getCreatedDate());
//         if (u.getLastLogin() != null) existingUser.setLastLogin(u.getLastLogin());
//         if (u.getIsActive() != null) existingUser.setIsActive(u.getIsActive());
//         if (u.getEmailVerified() != null) existingUser.setEmailVerified(u.getEmailVerified());

//         Users updatedUser = usersRepo.save(existingUser);
//         return List.of(mapToDTO(updatedUser));
//     }

//     public String deleteUser(Long id) {
//         usersRepo.deleteById(id);
//         return "Successfully deleted";
//     }

//     /* -------------------- MAPPER -------------------- */

//     private UsersDTO mapToDTO(Users user) {
//         return new UsersDTO(
//                 user.getId(),
//                 user.getUsername(),
//                 user.getEmail(),
//                 user.getRole() != null ? user.getRole().name() : null,
//                 user.getPhoneNumber(),
//                 user.getCreatedDate(),
//                 user.getEmailVerified(),
//                 user.getIsActive(),
//                 user.getLastLogin()
//         );
//     }


//     /* -------------------- ACTIVATE / DEACTIVATE -------------------- */

// public String deactivateUser(Long id) {
//     Users existingUser = usersRepo.findById(id)
//             .orElseThrow(() -> new RuntimeException("User not found"));

//     existingUser.setIsActive(false);
//     usersRepo.save(existingUser);

//     return "User deactivated successfully";
// }

// public String activateUser(Long id) {
//     Users existingUser = usersRepo.findById(id)
//             .orElseThrow(() -> new RuntimeException("User not found"));

//     existingUser.setIsActive(true);
//     usersRepo.save(existingUser);

//     return "User activated successfully";
// }
//     public record LoginResponse(Long id,String username, String role,Long  vendorId) {}
// }
package com.examly.springapp.service;

import com.examly.springapp.dto.UsersDTO;
import com.examly.springapp.model.Users;
import com.examly.springapp.model.Vendors;
import com.examly.springapp.repository.UsersRepository;
import com.examly.springapp.repository.VendorsRepository;
import com.examly.springapp.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UsersService {

    @Autowired
    private UsersRepository usersRepo;
    @Autowired
    private VendorsRepository vendorsRepo;
     @Autowired
    private JwtUtil jwtUtil; 

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    /* -------------------- AUTH METHODS -------------------- */

    public Object signup(Users u) {
    if (usersRepo.findByUsername(u.getUsername()).isPresent())
        return "Username already exists!";
    if (usersRepo.findByEmail(u.getEmail()).isPresent())
        return "Email already exists!";

    u.setPassword_hash(passwordEncoder.encode(u.getPassword_hash()));
    u.setCreatedDate(LocalDateTime.now());
    u.setIsActive(true);
    usersRepo.save(u);

    String token = jwtUtil.generateToken(u.getUsername(), u.getRole().name());
        return new SignupResponse(u.getId(), u.getUsername(), u.getRole().name(), token);
}

// Record class
public record SignupResponse(Long id, String username, String role, String token) {}

public Object login(String username, String rawPassword, String role) {
    Optional<Users> userOpt = usersRepo.findByUsername(username);
    if (userOpt.isEmpty()) return "Invalid username!";

    Users user = userOpt.get();
    if (!passwordEncoder.matches(rawPassword, user.getPassword_hash()))
        return "Invalid password!";
    if (!user.getRole().name().equalsIgnoreCase(role))
        return "Invalid role!";

    user.setLastLogin(LocalDateTime.now());
    usersRepo.save(user);

    Long vendorId = null;
    if (user.getRole().name().equalsIgnoreCase("VENDOR")) {
        vendorId = vendorsRepo.findByUserId(user.getId())
                              .map(Vendors::getId)
                              .orElse(null);
    }

   String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());

    return new LoginResponse(user.getId(), user.getUsername(), user.getRole().name(), vendorId, token);
}

// Record class
public record LoginResponse(Long id, String username, String role, Long vendorId, String token) {}


    /* -------------------- CRUD METHODS -------------------- */

    public List<UsersDTO> addUser(Users u) {
        if (u.getNotifications() != null) {
            u.getNotifications().forEach(n -> {
                n.setUser(u);
                n.setId(null);
            });
        }
        Users savedUser = usersRepo.save(u);
        return List.of(mapToDTO(savedUser));
    }
    public UsersDTO getbyIdUsers(long id)
{
    Users users=usersRepo.findById(id);
    return mapToDTO(users);
}


    public List<UsersDTO> getUsers() {
        return usersRepo.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<UsersDTO> updateUser(Long id, Users u) {
        Users existingUser = usersRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (u.getUsername() != null) existingUser.setUsername(u.getUsername());
        if (u.getEmail() != null) existingUser.setEmail(u.getEmail());
        if (u.getPassword_hash() != null) {
            existingUser.setPassword_hash(passwordEncoder.encode(u.getPassword_hash()));
        }
        if (u.getRole() != null) existingUser.setRole(u.getRole());
        if (u.getPhoneNumber() != null) existingUser.setPhoneNumber(u.getPhoneNumber());
        if (u.getCreatedDate() != null) existingUser.setCreatedDate(u.getCreatedDate());
        if (u.getLastLogin() != null) existingUser.setLastLogin(u.getLastLogin());
        if (u.getIsActive() != null) existingUser.setIsActive(u.getIsActive());
        if (u.getEmailVerified() != null) existingUser.setEmailVerified(u.getEmailVerified());

        Users updatedUser = usersRepo.save(existingUser);
        return List.of(mapToDTO(updatedUser));
    }

    public String deleteUser(Long id) {
        usersRepo.deleteById(id);
        return "Successfully deleted";
    }

    /* -------------------- MAPPER -------------------- */

    private UsersDTO mapToDTO(Users user) {
        return new UsersDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole() != null ? user.getRole().name() : null,
                user.getPhoneNumber(),
                user.getCreatedDate(),
                user.getEmailVerified(),
                user.getIsActive(),
                user.getLastLogin()
        );
    }


    /* -------------------- ACTIVATE / DEACTIVATE -------------------- */

public String deactivateUser(Long id) {
    Users existingUser = usersRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));

    existingUser.setIsActive(false);
    usersRepo.save(existingUser);

    return "User deactivated successfully";
}

public String activateUser(Long id) {
    Users existingUser = usersRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));

    existingUser.setIsActive(true);
    usersRepo.save(existingUser);

    return "User activated successfully";
}
}

