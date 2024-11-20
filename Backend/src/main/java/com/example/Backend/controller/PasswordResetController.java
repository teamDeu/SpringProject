package com.example.Backend.controller;

import com.example.Backend.model.User;
import com.example.Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // 프론트엔드 요청 허용
public class PasswordResetController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        User user = userRepository.findByIdAndPhone(request.getId(), request.getPhone())
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        user.setPassword(request.getNewPassword());
        userRepository.save(user);
        return ResponseEntity.ok("비밀번호가 성공적으로 변경되었습니다.");
    }

    // DTO 클래스
    public static class ResetPasswordRequest {
        private String id;
        private String phone;
        private String newPassword;

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }

        public String getNewPassword() {
            return newPassword;
        }

        public void setNewPassword(String newPassword) {
            this.newPassword = newPassword;
        }
    }
}
