package com.example.Backend.service;

import com.example.Backend.model.KakaoUser;
import com.example.Backend.model.User;
import com.example.Backend.repository.KakaoUserRepository;
import com.example.Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class KakaoService {

    @Autowired
    private KakaoUserRepository kakaoUserRepository;

    @Autowired
    private UserRepository userRepository;

    private static final String KAKAO_AUTH_URL = "https://kauth.kakao.com/oauth/authorize";
    private static final String KAKAO_TOKEN_URL = "https://kauth.kakao.com/oauth/token";
    private static final String KAKAO_USER_INFO_URL = "https://kapi.kakao.com/v2/user/me";
    private static final String CLIENT_ID = "YOUR_KAKAO_CLIENT_ID";
    private static final String REDIRECT_URI = "http://localhost:8080/oauth2/callback/kakao";

    // 카카오 인증 URL 생성
    public String getKakaoAuthUrl() {
        return KAKAO_AUTH_URL +
                "?client_id=" + CLIENT_ID +
                "&redirect_uri=" + REDIRECT_URI +
                "&response_type=code";
    }

    // 카카오 로그인 처리
    public KakaoUser processKakaoLogin(String code) {
        // 1. Access Token 요청
        System.out.println("Received code: " + code);
        RestTemplate restTemplate = new RestTemplate();
        Map<String, String> tokenResponse = restTemplate.postForObject(
                "https://kauth.kakao.com/oauth/token",
                Map.of(
                        "grant_type", "authorization_code",
                        "client_id", CLIENT_ID,
                        "redirect_uri", REDIRECT_URI,
                        "code", code
                ),
                Map.class
        );
        System.out.println("Token Response: " + tokenResponse); // 디버깅 로그
        String accessToken = tokenResponse.get("access_token");

        // 2. 사용자 정보 요청
        Map<String, Object> userInfoResponse = restTemplate.getForObject(
                "https://kapi.kakao.com/v2/user/me",
                Map.class,
                Map.of("Authorization", "Bearer " + accessToken)
        );
        System.out.println("User Info Response: " + userInfoResponse);

        String kakaoId = String.valueOf(userInfoResponse.get("id"));
        Map<String, Object> kakaoAccount = (Map<String, Object>) userInfoResponse.get("kakao_account");
        String email = (String) kakaoAccount.get("email");
        String name = (String) ((Map<String, Object>) userInfoResponse.get("properties")).get("nickname");
        String profileImage = (String) ((Map<String, Object>) userInfoResponse.get("properties")).get("profile_image");

        // 3. 기존 사용자 검색 또는 신규 사용자 생성
        KakaoUser kakaoUser = kakaoUserRepository.findByKakaoId(kakaoId)
                .orElseGet(() -> {
                    KakaoUser newKakaoUser = new KakaoUser();
                    newKakaoUser.setKakaoId(kakaoId);
                    newKakaoUser.setEmail(email);
                    newKakaoUser.setName(name);
                    newKakaoUser.setProfileImage(profileImage);

                    // 기존 User와 연결 (선택 사항)
                    User user = userRepository.findByEmail(email).orElse(null);
                    newKakaoUser.setUser(user);

                    return kakaoUserRepository.save(newKakaoUser);
                });

        return kakaoUser;
    }
}
