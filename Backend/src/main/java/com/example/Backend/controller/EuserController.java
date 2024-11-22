package com.example.Backend.controller;

import com.example.Backend.model.Euser;
import com.example.Backend.service.EuserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/eusers")
public class EuserController {

    @Autowired
    private EuserService euserService;

    // 모든 사용자 가져오기
    @GetMapping
    public List<Euser> getAllEusers() {
        return euserService.findAll();
    }

    // 특정 사용자 가져오기
    @GetMapping("/{id}")
    public Euser getEuserById(@PathVariable String id) {
        return euserService.findById(id);
    }

    // 사용자 생성
    @PostMapping
    public Euser createEuser(@RequestBody Euser euser) {
        return euserService.save(euser);
    }

    // 사용자 삭제
    @DeleteMapping("/{id}")
    public void deleteEuser(@PathVariable String id) {
        euserService.deleteById(id);
    }
}
