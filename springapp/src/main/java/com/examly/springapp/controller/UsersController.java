// package com.examly.springapp.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;

// import com.examly.springapp.dto.UsersDTO;
// import com.examly.springapp.model.Users;
// import com.examly.springapp.service.UsersService;

// import java.util.List;
// @CrossOrigin(origins = "http://localhost:3000")
// @RestController
// @RequestMapping("/user")
// public class UsersController {

//     @Autowired
//     private UsersService usersService;
//     @PostMapping("/post")
//     public List<UsersDTO> saveUser(@RequestBody Users u) {
//         return usersService.addUser(u);
//     }
//     @GetMapping("/getbyid/{id}")
//     public UsersDTO getbyidUsers(@PathVariable Long id)
//     {
//         return usersService.getbyIdUsers(id);
//     }

//     @GetMapping("/getdata")
//     public List<UsersDTO> getAllUsers() {
//         return usersService.getUsers();
//     }
//     @PutMapping("/update/{id}")
//     public List<UsersDTO> modifyUser(@PathVariable Long id, @RequestBody Users u) {
//         return usersService.updateUser(id, u);
//     }
//     @DeleteMapping("/delete/{id}")
//     public String deleteUser(@PathVariable Long id) {
//         return usersService.deleteUser(id);
//     }
//     @PostMapping("/signup")
// public String signup(@RequestBody Users u) {
//     return usersService.signup(u);
// }

// @PostMapping("/login")
// public Object login(@RequestBody Users loginRequest) {
//     return usersService.login(
//         loginRequest.getUsername(),
//         loginRequest.getPassword_hash(),
//         loginRequest.getRole() != null ? loginRequest.getRole().name() : null
//     );
// }


//    @PutMapping("/deactivate/{id}")
//     public String deactivateUser(@PathVariable Long id) {
//         return usersService.deactivateUser(id);
//     }

//     @PutMapping("/activate/{id}")
//     public String activateUser(@PathVariable Long id) {
//         return usersService.activateUser(id);
//     }

// }
package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.dto.UsersDTO;
import com.examly.springapp.model.Users;
import com.examly.springapp.service.UsersService;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UsersController {

    @Autowired
    private UsersService usersService;
    @PostMapping("/post")
    public List<UsersDTO> saveUser(@RequestBody Users u) {
        return usersService.addUser(u);
    }
    @GetMapping("/getbyid/{id}")
    public UsersDTO getbyidUsers(@PathVariable Long id)
    {
        return usersService.getbyIdUsers(id);
    }

    @GetMapping("/getdata")
    public List<UsersDTO> getAllUsers() {
        return usersService.getUsers();
    }
    @PutMapping("/update/{id}")
    public List<UsersDTO> modifyUser(@PathVariable Long id, @RequestBody Users u) {
        return usersService.updateUser(id, u);
    }
    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable Long id) {
        return usersService.deleteUser(id);
    }
    @PostMapping("/signup")
public Object signup(@RequestBody Users u) {
    return usersService.signup(u);
}

@PostMapping("/login")
public Object login(@RequestBody Users loginRequest) {
    return usersService.login(
        loginRequest.getUsername(),
        loginRequest.getPassword_hash(),
        loginRequest.getRole() != null ? loginRequest.getRole().name() : null
    );
}


   @PutMapping("/deactivate/{id}")
    public String deactivateUser(@PathVariable Long id) {
        return usersService.deactivateUser(id);
    }

    @PutMapping("/activate/{id}")
    public String activateUser(@PathVariable Long id) {
        return usersService.activateUser(id);
    }

}
