package com.example.Backend.controller;

import com.example.Backend.model.Euser;
import com.example.Backend.service.EuserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class EuserController {
    private final EuserService euserService;

    public EuserController(EuserService euserService) {
        this.euserService = euserService;
    }

    @GetMapping
    public List<Euser> getAllUsers() {
        return euserService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Euser> getUserById(@PathVariable String id) {
        Optional<Euser> user = euserService.getUserById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Euser createUser(@RequestBody Euser user) {
        return euserService.saveUser(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Euser> updateUser(@PathVariable String id, @RequestBody Euser updatedUser) {
        if (!euserService.getUserById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        updatedUser.setId(id);
        return ResponseEntity.ok(euserService.saveUser(updatedUser));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        if (!euserService.getUserById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        euserService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
