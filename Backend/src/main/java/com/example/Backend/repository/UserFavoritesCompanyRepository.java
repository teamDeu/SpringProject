package com.example.Backend.repository;

import com.example.Backend.model.UserFavoritesCompany;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface UserFavoritesCompanyRepository extends JpaRepository<UserFavoritesCompany, Long> {

    @Query("SELECT u.companyId AS companyId, COUNT(u) AS count " +
            "FROM UserFavoritesCompany u " +
            "GROUP BY u.companyId")
    List<Map<String, Object>> getCompanyFavoriteCounts();

    boolean existsByUserIdAndCompanyId(String userId, String companyId);
    List<UserFavoritesCompany> findAllByUserId(String userId);
    Optional<UserFavoritesCompany> findByUserIdAndCompanyId(String userId, String companyId);

}
