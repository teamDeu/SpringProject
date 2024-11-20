package com.example.Backend.service;

import com.example.Backend.model.User;
import com.example.Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    // 아이디 중복 확인 메서드
    public boolean isDuplicateId(String id) {
        return userRepository.existsById(id);
    }


    public void registerUser(User user) {
        userRepository.save(user);
    }
}
