package com.example.Backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name = "user_favorites_comjobsearchpany")
@Getter
@Setter
public class UserFavoritesCompany {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "company_id", nullable = false)
    private String companyId;

    @Column(name = "saved_date", nullable = false)
    private String savedDate;

    @PrePersist
    protected void onCreate() {
        if (this.savedDate == null) {
            this.savedDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        }
    }
}
