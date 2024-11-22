package com.example.Backend.service;

import com.example.Backend.model.ELocation;
import com.example.Backend.repository.ELocationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ELocationService {
    private final ELocationRepository eLocationRepository;

    public ELocationService(ELocationRepository eLocationRepository) {
        this.eLocationRepository = eLocationRepository;
    }

    public List<ELocation> getAllLocations() {
        return eLocationRepository.findAll();
    }

    public ELocation saveLocation(ELocation location) {
        return eLocationRepository.save(location);
    }

    public void deleteLocation(Long id) {
        eLocationRepository.deleteById(id);
    }
}
