package com.example.Backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // 기존 설정 유지
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000") // React 개발 서버
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);

        // 추가: /oauth2/** 경로에 대한 CORS 설정
        registry.addMapping("/oauth2/**")
                .allowedOrigins("http://localhost:3000") // React 개발 서버
                .allowedMethods("GET", "POST", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
