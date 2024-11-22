package com.example.Backend.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class KakaoService {

    public Map<String, Object> getUserInfo(String code) {
        String tokenUrl = "https://kauth.kakao.com/oauth/token";
        String userInfoUrl = "https://kapi.kakao.com/v2/user/me";

        RestTemplate restTemplate = new RestTemplate();

        // 액세스 토큰 요청
        Map<String, String> tokenRequest = new HashMap<>();
        tokenRequest.put("grant_type", "authorization_code");
        tokenRequest.put("client_id", "ac8b78b524d0506d1a5aa3720f4ceff8");
        tokenRequest.put("redirect_uri", "http://localhost:3000/kakao-callback");
        tokenRequest.put("code", code);

        ResponseEntity<Map> tokenResponse = restTemplate.postForEntity(tokenUrl, tokenRequest, Map.class);
        String accessToken = (String) tokenResponse.getBody().get("access_token");

        // 사용자 정보 요청
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<Map> userInfoResponse = restTemplate.exchange(userInfoUrl, HttpMethod.GET, entity, Map.class);

        return userInfoResponse.getBody();
    }
}
