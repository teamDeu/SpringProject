package com.example.Backend.repository;

import com.example.Backend.model.Company;
import com.example.Backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, String> {
    Optional<Company> findByManagerNameAndManagerPhone(String managerName, String managerPhone);
    Optional<Company> findByIdAndManagerPhone(String id, String managerPhone);

    @Query(value = "SELECT c.company_name, " +
            "COUNT(ufc.company_id) AS favorite_count, " +
            "cr.ceo_register, " +
            "cr.ceo_job, " +
            "cr.ceo_ment, " +
            "cr.status " +
            "FROM c_companies c " +
            "LEFT JOIN user_favorites_comjobsearchpany ufc " +
            "ON c.id = ufc.company_id " +
            "LEFT JOIN ceo_review cr " +
            "ON c.id = cr.company_id " +
            "GROUP BY c.id, cr.ceo_register, cr.ceo_job, cr.ceo_ment, cr.status",
            nativeQuery = true)
    List<Object[]> getCompanyFavoriteCounts();
    Optional<Company> findByCompanyName(String companyName);
}