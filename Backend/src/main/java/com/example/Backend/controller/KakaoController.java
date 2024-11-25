package com.example.Backend.controller;

import com.example.Backend.model.KakaoUser;
import com.example.Backend.service.KakaoService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class KakaoController {

    @Autowired
    private KakaoService kakaoService;

    @GetMapping("/api/login/kakao")
    public ResponseEntity<String> redirectToKakao() {
        return ResponseEntity.ok(kakaoService.getKakaoAuthUrl());
    }

    @GetMapping("/oauth2/callback/kakao")
    public ResponseEntity<?> handleKakaoCallback(@RequestParam String code, HttpSession session) {
        KakaoUser kakaoUser = kakaoService.processKakaoLogin(code);
        session.setAttribute("kakaoUser", kakaoUser.getId());
        return ResponseEntity.ok("카카오 로그인 성공");
    }
}
