package com.example.Backend.controller;

import com.example.Backend.model.ELocation;
import com.example.Backend.service.ELocationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
public class ELocationController {
    private final ELocationService eLocationService;

    public ELocationController(ELocationService eLocationService) {
        this.eLocationService = eLocationService;
    }

    // 모든 지역 정보 조회
    @GetMapping
    public List<ELocation> getAllLocations() {
        return eLocationService.getAllLocations();
    }

    // 새로운 지역 추가
    @PostMapping
    public ELocation createLocation(@RequestBody ELocation location) {
        return eLocationService.saveLocation(location);
    }

    // 특정 지역 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLocation(@PathVariable Long id) {
        eLocationService.deleteLocation(id);
        return ResponseEntity.noContent().build();
    }
}
