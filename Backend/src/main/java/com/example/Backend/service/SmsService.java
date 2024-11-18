package com.example.Backend.service;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
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
        String code = generateVerificationCode();
        System.out.println("Generated Code: " + code);
        // 메시지 객체 생성 및 설정
        Message message = new Message();
        message.setFrom(senderPhone);
        message.setTo(phone);
        message.setText("[구인구직] 인증번호는 " + code + " 입니다.");

        try {
            // 메시지 전송
            SingleMessageSentResponse response = messageService.sendOne(new SingleMessageSendingRequest(message));
            System.out.println("메시지 전송 성공: " + response);
            verificationStorage.put(phone, code); // 발송된 인증번호 저장
        }
         catch (Exception e) {
            // 기타 예외 처리
            System.err.println("메시지 전송 중 오류 발생: " + e.getMessage());
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
