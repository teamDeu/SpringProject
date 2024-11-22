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

    // 전체 사용자 조회
    @GetMapping
    public List<Euser> getAllUsers() {
        return euserService.getAllUsers();
    }

    // ID로 사용자 조회
    @GetMapping("/{id}")
    public ResponseEntity<Euser> getUserById(@PathVariable String id) {
        Optional<Euser> user = euserService.getUserById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 사용자 추가
    @PostMapping
    public ResponseEntity<Euser> createUser(@RequestBody Euser user) {
        try {
            System.out.println("요청받은 사용자 데이터: " + user); // 요청 본문 확인
            Euser createdUser = euserService.saveUser(user);
            System.out.println("저장된 사용자 데이터: " + createdUser); // 저장된 데이터 확인
            return ResponseEntity.ok(createdUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // 사용자 업데이트
    @PutMapping("/{id}")
    public ResponseEntity<Euser> updateUser(@PathVariable String id, @RequestBody Euser updatedUser) {
        if (!euserService.getUserById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        updatedUser.setId(id);
        return ResponseEntity.ok(euserService.saveUser(updatedUser));
    }

    // 사용자 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        if (!euserService.getUserById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        euserService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
