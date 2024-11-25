package com.example.Backend.controller;

import com.example.Backend.model.Admin;
import com.example.Backend.model.Company;
import com.example.Backend.model.User;
import com.example.Backend.repository.AdminRepository;
import com.example.Backend.repository.CompanyRepository;
import com.example.Backend.repository.UserRepository;
import com.example.Backend.service.SmsService;
import com.example.Backend.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // 특정 출처 허용
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private SmsService smsService;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AdminRepository adminRepository;


    @Autowired
    private NaverService naverService;

    @Autowired
    private KakaoService kakaoService;

    @Autowired
    private CompanyRepository companyRepository;

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

    public class ApiResponse {
        private String type;
        private Object data;

        // 생성자
        public ApiResponse(String type, Object data) {
            this.type = type;
            this.data = data;
        }

        // getter, setter
        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public Object getData() {
            return data;
        }

        public void setData(Object data) {
            this.data = data;
        }
    }

    public static class UserInfoRequest {
        private String name;
        private String phone;
        private String id;
        private String email;
        private String gender;
        private String experienceLevel;
        private String educationLevel;
        private String educationStatus;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
        public String getPhone() {
            return phone;
        }
        public void setPhone(String phone) {
            this.phone = phone;
        }
        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getGender() {
            return gender;
        }

        public void setGender(String gender) {
            this.gender = gender;
        }

        public String getExperienceLevel() {
            return experienceLevel;
        }

        public void setExperienceLevel(String experienceLevel) {
            this.experienceLevel = experienceLevel;
        }

        public String getEducationLevel() {
            return educationLevel;
        }

        public void setEducationLevel(String educationLevel) {
            this.educationLevel = educationLevel;
        }

        public String getEducationStatus() {
            return educationStatus;
        }

        public void setEducationStatus(String educationStatus) {
            this.educationStatus = educationStatus;
        }
    }

    // 아이디 중복 확인
    @GetMapping("/check-duplicate")
    public ResponseEntity<String> checkDuplicate(@RequestParam String id) {
        boolean isDuplicate = userService.isDuplicateId(id);
        if (isDuplicate) {
            return ResponseEntity.badRequest().body("아이디가 이미 존재합니다.");
        }
        return ResponseEntity.ok("아이디 사용 가능");
    }

    // 회원가입
    @PostMapping("/api/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        try {
            userService.registerUser(user);
            return ResponseEntity.ok("회원가입 성공");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원가입 실패: " + e.getMessage());
        }
    }

    // 이메일 업데이트
    @PatchMapping("/api/user/email")
    public ResponseEntity<String> updateEmail(@RequestParam String id, @RequestParam String email) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자 ID입니다."));
        user.setEmail(email);
        userRepository.save(user);
        return ResponseEntity.ok("이메일 업데이트 성공");
    }

    // 전화번호 인증번호 요청
    @PostMapping("/api/request")
    public ResponseEntity<String> requestVerification(@RequestBody PhoneRequest phoneRequest) {
        String verificationCode = smsService.sendVerificationCode(phoneRequest.getPhone());
        return ResponseEntity.ok("인증번호가 발송되었습니다.");
    }

    // 인증번호 확인
    @PostMapping("/api/verify-code")
    public ResponseEntity<String> verifyCode(@RequestBody VerifyCodeRequest verifyCodeRequest) {
        boolean isVerified = smsService.verifyCode(verifyCodeRequest.getPhone(), verifyCodeRequest.getCode());
        if (isVerified) {
            return ResponseEntity.ok("인증 성공");
        }
        return ResponseEntity.badRequest().body("인증 실패");
    }

    // 로그인
    @PostMapping("/api/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> loginData, HttpSession session) {
        String id = loginData.get("id");
        String password = loginData.get("password");

        User user = userRepository.findById(id).orElse(null);
        if (user != null && user.getPassword().equals(password)) {
            session.setAttribute("user",id);
            return ResponseEntity.ok("로그인 성공");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("아이디 또는 비밀번호가 잘못되었습니다.");
    }

    // 사용자 정보 업데이트
    // UserController.java
    @PostMapping("/api/update-user-info")
    public ResponseEntity<String> updateUserInfo(@RequestBody UserInfoRequest userInfoRequest) {
        try {
            // 요청 받은 ID로 사용자 검색
            User user = userRepository.findById(userInfoRequest.getId())
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자 ID입니다."));

            // 사용자 정보 업데이트
            user.setEmail(userInfoRequest.getEmail());
            user.setGender(userInfoRequest.getGender());
            user.setExperienceLevel(userInfoRequest.getExperienceLevel());
            user.setEducationLevel(userInfoRequest.getEducationLevel());
            user.setEducationStatus(userInfoRequest.getEducationStatus());

            // 저장
            userRepository.save(user);
            return ResponseEntity.ok("사용자 정보 업데이트 성공");
        } catch (IllegalArgumentException e) {
            System.err.println("사용자 ID 오류: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("사용자 정보 업데이트 실패: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("예외 발생: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("사용자 정보 업데이트 실패: " + e.getMessage());
        }
    }
    // 사용자 정보 업데이트
    @PostMapping("/api/update-user-info2")
    public ResponseEntity<String> updateUserInfo2(@RequestBody UserInfoRequest userInfoRequest) {
        try {
            User user = userRepository.findById(userInfoRequest.getId())
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자 ID입니다."));

            user.setName(userInfoRequest.getName());
            user.setPhone(userInfoRequest.getPhone());
            user.setEmail(userInfoRequest.getEmail());
            user.setGender(userInfoRequest.getGender());
            user.setExperienceLevel(userInfoRequest.getExperienceLevel());
            user.setEducationLevel(userInfoRequest.getEducationLevel());
            user.setEducationStatus(userInfoRequest.getEducationStatus());

            userRepository.save(user);
            return ResponseEntity.ok("사용자 정보 업데이트 성공");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("사용자 정보 업데이트 실패: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("사용자 정보 업데이트 실패");
        }
    }





    @GetMapping("/api/check-user-basic")
    public ResponseEntity<Boolean> checkUserBasic(@RequestParam String id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            boolean hasBasicInfo = user.getEmail() != null
                    && user.getGender() != null
                    && user.getExperienceLevel() != null
                    && user.getEducationLevel() != null;

            return ResponseEntity.ok(hasBasicInfo); // 기본 정보가 모두 있는지 여부 반환
        }
        return ResponseEntity.badRequest().body(false);
    }

    @PostMapping("/api/admin-login")
    public ResponseEntity<String> adminLogin(@RequestBody Map<String, String> loginData , HttpSession session) {
        String adminId = loginData.get("admin_id");
        String adminPwd = loginData.get("admin_pwd");

        Optional<Admin> adminOptional = adminRepository.findById(adminId);
        if (adminOptional.isPresent() && adminOptional.get().getPassword().equals(adminPwd)) {
            session.setAttribute("user",adminId);
            return ResponseEntity.ok("관리자 로그인 성공");

        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("관리자 로그인 실패");
        }
    }


    @GetMapping("/api/logout")
    public ResponseEntity<?> logout(HttpSession session){
        session.invalidate();
        return ResponseEntity.ok("Logged out successfully");
    }

    @GetMapping("/api/session")
    public ResponseEntity<?> home(HttpSession session) {
        String user = (String) session.getAttribute("user");
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
        return ResponseEntity.ok(user);
    }

    @GetMapping("/api/InfoBySession")
    public ResponseEntity<?> getBySession(@RequestParam String id) {
        // company 테이블에서 id를 찾음
        Optional<Company> companyOptional = companyRepository.findById(id);

        // company가 존재하면 company 객체와 함께 "company" 문자열 반환
        if (companyOptional.isPresent()) {
            return ResponseEntity.ok(new ApiResponse("company", companyOptional.get()));
        }

        // user 테이블에서 id를 찾음
        Optional<User> userOptional = userRepository.findById(id);

        // user가 존재하면 user 객체와 함께 "user" 문자열 반환
        if (userOptional.isPresent()) {
            return ResponseEntity.ok(new ApiResponse("user", userOptional.get()));
        }

        // 둘 다 존재하지 않으면 404 Not Found 반환
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No matching data found");
    }
}