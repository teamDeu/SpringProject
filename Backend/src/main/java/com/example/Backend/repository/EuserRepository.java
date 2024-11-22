package com.example.Backend.repository;

import com.example.Backend.model.Euser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EuserRepository extends JpaRepository<Euser, String> {
}
