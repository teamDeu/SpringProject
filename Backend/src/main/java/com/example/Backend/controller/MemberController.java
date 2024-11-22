package com.example.Backend.controller;

import com.example.Backend.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/members")
    public ResponseEntity<Map<String, List<Map<String, Object>>>> getAllMembers() {
        try {
            Map<String, List<Map<String, Object>>> members = memberService.getAllMembers();
            return ResponseEntity.ok(members);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
}
