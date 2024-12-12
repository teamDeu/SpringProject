package com.example.Backend.service;

import com.example.Backend.model.UserFavoritesCompany;
import com.example.Backend.repository.UserFavoritesCompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UserFavoritesCompanyService {

    @Autowired
    private UserFavoritesCompanyRepository userFavoritesCompanyRepository;

    public List<Map<String, Object>> getCompanyFavoriteCounts() {
        return userFavoritesCompanyRepository.getCompanyFavoriteCounts();
    }
    public UserFavoritesCompany addFavorite(String userId, String companyId) {
        UserFavoritesCompany favorite = new UserFavoritesCompany();
        favorite.setUserId(userId);
        favorite.setCompanyId(companyId);
        return userFavoritesCompanyRepository.save(favorite);
    }

    public boolean isFavorite(String userId, String companyId) {
        return userFavoritesCompanyRepository.existsByUserIdAndCompanyId(userId, companyId);
    }
    public List<UserFavoritesCompany> getAllFavoritesByUserId(String userId) {
        return userFavoritesCompanyRepository.findAllByUserId(userId);
    }
    public void removeFavorite(String userId, String companyId) {
        UserFavoritesCompany favorite = userFavoritesCompanyRepository
                .findByUserIdAndCompanyId(userId, companyId)
                .orElseThrow(() -> new IllegalArgumentException("해당 관심 기업이 존재하지 않습니다."));
        userFavoritesCompanyRepository.delete(favorite);
    }

}
