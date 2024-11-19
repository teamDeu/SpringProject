package com.example.Backend.controller;

import com.example.Backend.model.User;
import com.example.Backend.repository.UserRepository;
import com.example.Backend.service.SmsService;
import com.example.Backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController

@CrossOrigin(origins = "http://localhost:3000") // 특정 출처 허용
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private SmsService smsService;
    @Autowired
    private UserRepository userRepository;

    // DTO 클래스
    public static class PhoneRequest {
        private String phone;

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }
    }
    // 인증번호 확인 요청을 처리할 DTO
    public static class VerifyCodeRequest {
        private String phone;
        private String code;

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }

        public String getCode() {
            return code;
        }

        public void setCode(String code) {
            this.code = code;
        }
    }

    // 아이디 중복 확인
    @GetMapping("/check-duplicate")
    public ResponseEntity<String> checkDuplicate(@RequestParam String id) {
        boolean isDuplicate = userService.isDuplicateId(id);
        System.out.println("아이디 존재 여부: " + isDuplicate); // 디버깅용 로그 추가
        if (isDuplicate) {
            return ResponseEntity.badRequest().body("아이디가 이미 존재합니다.");
        } else {
            return ResponseEntity.ok("아이디 사용 가능");
        }
    }

    // 회원가입
    @PostMapping("/api/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        try {


            System.out.println("회원가입 요청 데이터: " + user);
            userService.registerUser(user);
            System.out.println("회원가입 성공");
            return ResponseEntity.ok("회원가입 성공");
        } catch (Exception e) {
            System.err.println("회원가입 중 오류 발생: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원가입 실패");
        }
    }

    @PatchMapping("/api/user/email")
    public ResponseEntity<String> updateEmail(@RequestParam String id, @RequestParam String email) {
        User user = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자 ID입니다."));
        user.setEmail(email);
        userRepository.save(user);
        return ResponseEntity.ok("이메일 업데이트 성공");
    }





    // 전화번호 인증번호 요청
    @PostMapping("/api/request")
    public ResponseEntity<String> requestVerification(@RequestBody PhoneRequest phoneRequest) {
        String phone = phoneRequest.getPhone();
        System.out.println("Received Phone: " + phone);
        String verificationCode = smsService.sendVerificationCode(phone);
        System.out.println("Generated Verification Code: " + verificationCode);
        return ResponseEntity.ok("인증번호가 발송되었습니다.");
    }

    // 인증번호 확인
    @PostMapping("/api/verify-code")
    public ResponseEntity<String> verifyCode(@RequestBody VerifyCodeRequest verifyCodeRequest) {
        String phone = verifyCodeRequest.getPhone();
        String code = verifyCodeRequest.getCode();

        boolean isVerified = smsService.verifyCode(phone, code);
        if (isVerified) {
            return ResponseEntity.ok("인증 성공");
        } else {
            return ResponseEntity.badRequest().body("인증 실패");
        }
    }

}
