package com.example.Backend.service;

import com.example.Backend.model.Location;
import com.example.Backend.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    public List<Location> findAll() {
        return locationRepository.findAll();
    }

    public Location save(Location location) {
        return locationRepository.save(location);
    }

    public void deleteById(Integer id) {
        locationRepository.deleteById(id);
    }
}
