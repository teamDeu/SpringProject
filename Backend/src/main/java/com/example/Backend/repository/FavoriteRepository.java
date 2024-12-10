package com.example.Backend.repository;

import com.example.Backend.model.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {

    @Query("SELECT new map(c.companyName as name, c.logoUrl as logo) " +
            "FROM Favorite f " +
            "JOIN Company c ON f.companyId = c.id " +
            "WHERE f.userId = :userId")
    List<Map<String, Object>> findFavoritesByUserId(@Param("userId") String userId);
}
