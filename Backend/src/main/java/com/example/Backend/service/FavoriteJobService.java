package com.example.Backend.service;

import com.example.Backend.model.JobPost;
import com.example.Backend.repository.UserFavoritesPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteJobService {

    @Autowired
    private UserFavoritesPostRepository repository;

    public List<JobPost> getFavoriteJobPostsByUserId(String userId) {
        return repository.findFavoriteJobPostsByUserId(userId);
    }
}
