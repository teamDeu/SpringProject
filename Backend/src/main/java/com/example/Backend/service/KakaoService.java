package com.example.Backend.service;

import com.example.Backend.model.KakaoUser;
import com.example.Backend.model.User;
import com.example.Backend.repository.KakaoUserRepository;
import com.example.Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
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
    private static final String CLIENT_ID = "ac8b78b524d0506d1a5aa3720f4ceff8"; // 카카오 REST API 키
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
            String accessToken = getAccessToken(code);

            // 2. 사용자 정보 요청
            Map<String, Object> userInfoResponse = getUserInfo(accessToken);

            // 3. 사용자 정보 추출
            String kakaoId = String.valueOf(userInfoResponse.get("id"));
            Map<String, Object> kakaoAccount = (Map<String, Object>) userInfoResponse.get("kakao_account");
            String email = (String) kakaoAccount.get("email");
            Map<String, Object> properties = (Map<String, Object>) userInfoResponse.get("properties");
            String nickname = (String) properties.get("nickname");
            String profileImage = (String) properties.get("profile_image");

            // 4. 기존 사용자 검색 또는 신규 사용자 생성
            return kakaoUserRepository.findByKakaoId(kakaoId)
                    .orElseGet(() -> createNewKakaoUser(kakaoId, email, nickname, profileImage));
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("카카오 로그인 처리 중 오류 발생: " + e.getMessage(), e);
        }
    }

    // Access Token 요청
    private String getAccessToken(String code) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("grant_type", "authorization_code");
            params.add("client_id", CLIENT_ID);
            params.add("redirect_uri", REDIRECT_URI);
            params.add("code", code);

            System.out.println("Access Token 요청 파라미터: " + params);

            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

            ResponseEntity<Map> response = restTemplate.exchange(
                    KAKAO_TOKEN_URL,
                    HttpMethod.POST,
                    request,
                    Map.class
            );

            System.out.println("Access Token 응답: " + response.getBody());

            return (String) response.getBody().get("access_token");
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Access Token 요청 중 오류 발생: " + e.getMessage(), e);
        }
    }



    // 사용자 정보 요청
    private Map<String, Object> getUserInfo(String accessToken) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + accessToken);

            HttpEntity<Void> request = new HttpEntity<>(headers);

            ResponseEntity<Map> response = restTemplate.exchange(
                    KAKAO_USER_INFO_URL,
                    HttpMethod.GET,
                    request,
                    Map.class
            );

            System.out.println("User Info Response: " + response.getBody());

            return response.getBody();
        } catch (Exception e) {
            throw new RuntimeException("사용자 정보 요청 중 오류 발생: " + e.getMessage(), e);
        }
    }

    // 신규 사용자 생성
    private KakaoUser createNewKakaoUser(String kakaoId, String email, String nickname, String profileImage) {
        KakaoUser newKakaoUser = new KakaoUser();
        newKakaoUser.setKakaoId(kakaoId);
        newKakaoUser.setEmail(email);
        newKakaoUser.setNickname(nickname);
        newKakaoUser.setProfileImage(profileImage);

        // 기존 User와 연결
        if (email != null) {
            User user = userRepository.findByEmail(email).orElse(null);
            newKakaoUser.setUser(user);
        }

        return kakaoUserRepository.save(newKakaoUser);
    }
}
