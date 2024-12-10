package com.example.Backend.service;

import com.example.Backend.repository.FavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;

    public List<Map<String, Object>> getFavoritesByUserId(String userId) {
        return favoriteRepository.findFavoritesByUserId(userId);
    }
}
