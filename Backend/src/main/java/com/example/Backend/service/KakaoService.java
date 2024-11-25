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
    private static final String CLIENT_ID = "YOUR_KAKAO_CLIENT_ID"; // 카카오 REST API 키
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
        try {
            // 1. Access Token 요청
            System.out.println("Received code: " + code);
            RestTemplate restTemplate = new RestTemplate();
            Map<String, String> tokenResponse = restTemplate.postForObject(
                    KAKAO_TOKEN_URL,
                    Map.of(
                            "grant_type", "authorization_code",
                            "client_id", CLIENT_ID,
                            "redirect_uri", REDIRECT_URI,
                            "code", code
                    ),
                    Map.class
            );
            System.out.println("Token Response: " + tokenResponse);

            String accessToken = tokenResponse.get("access_token");

            // 2. 사용자 정보 요청
            Map<String, Object> userInfoResponse = restTemplate.getForObject(
                    KAKAO_USER_INFO_URL,
                    Map.class,
                    Map.of("Authorization", "Bearer " + accessToken)
            );
            System.out.println("User Info Response: " + userInfoResponse);

            // 3. 사용자 정보 추출
            String kakaoId = String.valueOf(userInfoResponse.get("id"));
            Map<String, Object> kakaoAccount = (Map<String, Object>) userInfoResponse.get("kakao_account");
            String email = (String) kakaoAccount.get("email"); // 이메일
            Map<String, Object> properties = (Map<String, Object>) userInfoResponse.get("properties");
            String nickname = (String) properties.get("nickname"); // 닉네임
            String profileImage = (String) properties.get("profile_image"); // 프로필 이미지

            // 4. 기존 사용자 검색 또는 신규 사용자 생성
            KakaoUser kakaoUser = kakaoUserRepository.findByKakaoId(kakaoId)
                    .orElseGet(() -> {
                        KakaoUser newKakaoUser = new KakaoUser();
                        newKakaoUser.setKakaoId(kakaoId);
                        newKakaoUser.setEmail(email);
                        newKakaoUser.setNickname(nickname); // 닉네임 설정
                        newKakaoUser.setProfileImage(profileImage);

                        // 기존 User와 연결
                        User user = userRepository.findByEmail(email).orElse(null);
                        newKakaoUser.setUser(user);

                        return kakaoUserRepository.save(newKakaoUser); // 신규 사용자 저장
                    });

            return kakaoUser;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("카카오 로그인 처리 중 오류 발생: " + e.getMessage(), e);
        }
    }
}
