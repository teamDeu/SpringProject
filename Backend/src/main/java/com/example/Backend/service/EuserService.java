package com.example.Backend.service;
import com.example.Backend.model.Euser;
import com.example.Backend.repository.EuserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EuserService {

    @Autowired
    private EuserRepository euserRepository;

    public List<Euser> findAll() {
        return euserRepository.findAll();
    }

    public Euser findById(String id) {
        return euserRepository.findById(id).orElse(null);
    }

    public Euser save(Euser euser) {
        return euserRepository.save(euser);
    }

    public void deleteById(String id) {
        euserRepository.deleteById(id);
    }
}