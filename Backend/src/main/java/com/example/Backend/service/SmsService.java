package com.example.Backend.service;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Random;

@Service
public class SmsService {

    @Value("${sms.api_key}")
    private String apiKey;

    @Value("${sms.api_secret}")
    private String apiSecret;

    @Value("${sms.sender}")
    private String senderPhone;

    private final HashMap<String, String> verificationStorage = new HashMap<>();

    private final DefaultMessageService messageService;

    public SmsService(@Value("${sms.api_key}") String apiKey, @Value("${sms.api_secret}") String apiSecret) {
        this.messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecret, "https://api.coolsms.co.kr");
    }

    public String sendVerificationCode(String phone) {
        System.out.println("[SmsService] 발송 요청 전화번호: " + phone); // 전화번호 출력
        String code = generateVerificationCode();
        System.out.println("[SmsService] 생성된 인증번호: " + code); // 생성된 인증번호 출력

        Message message = new Message();
        message.setFrom(senderPhone);
        message.setTo(phone);
        message.setText("[구인구직] 인증번호는 " + code + " 입니다.");

        try {
            messageService.send(message); // SMS 전송
            System.out.println("[SmsService] 메시지 전송 성공");
            verificationStorage.put(phone, code); // 인증번호 저장
        } catch (Exception e) {
            System.err.println("[SmsService] 메시지 전송 실패: " + e.getMessage());
            e.printStackTrace();
        }

        return code;
    }

    public boolean verifyCode(String phone, String code) {
        return code.equals(verificationStorage.get(phone));
    }

    private String generateVerificationCode() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(1000000));
    }
}
