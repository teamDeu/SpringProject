package com.example.Backend.controller;

import com.example.Backend.model.Location;
import com.example.Backend.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/locations")
public class LocationController {

    @Autowired
    private LocationService locationService;

    @GetMapping
    public List<Location> getAllLocations() {
        return locationService.findAll();
    }

    @GetMapping("/grouped")
    public Map<String, List<String>> getGroupedLocations() {
        List<Location> locations = locationService.findAll();
        return locations.stream().collect(Collectors.groupingBy(
                Location::getRegion,
                Collectors.mapping(Location::getName, Collectors.toList())
        ));
    }

    @PostMapping
    public Location createLocation(@RequestBody Location location) {
        return locationService.save(location);
    }

    @DeleteMapping("/{id}")
    public void deleteLocation(@PathVariable Integer id) {
        locationService.deleteById(id);
    }
}
