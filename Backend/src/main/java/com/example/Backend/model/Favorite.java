package com.example.Backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_favorites_comjobsearchpany")
public class Favorite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "company_id", nullable = false)
    private String companyId;

    @Column(name = "saved_date", nullable = false, updatable = false, insertable = false)
    private java.sql.Timestamp savedDate;

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCompanyId() {
        return companyId;
    }

    public void setCompanyId(String companyId) {
        this.companyId = companyId;
    }

    public java.sql.Timestamp getSavedDate() {
        return savedDate;
    }

    public void setSavedDate(java.sql.Timestamp savedDate) {
        this.savedDate = savedDate;
    }
}
