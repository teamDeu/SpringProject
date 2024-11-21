package com.example.Backend.service;

import com.example.Backend.model.Euser;
import com.example.Backend.repository.EuserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EuserService {
    private final EuserRepository euserRepository;

    public EuserService(EuserRepository euserRepository) {
        this.euserRepository = euserRepository;
    }

    public List<Euser> getAllUsers() {
        return euserRepository.findAll();
    }

    public Optional<Euser> getUserById(String id) {
        return euserRepository.findById(id);
    }

    public Euser saveUser(Euser user) {
        return euserRepository.save(user);
    }

    public void deleteUser(String id) {
        euserRepository.deleteById(id);
    }
}
