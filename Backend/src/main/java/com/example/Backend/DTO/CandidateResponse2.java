package com.example.Backend.DTO;

import java.util.Date;

public class CandidateResponse2 {
    private Long id;
    private String companyName;
    private String title;
    private String location;
    private Date endDate;
    private String passType;

    public CandidateResponse2(Long id, String companyName, String title, String location, Date endDate, String passType) {
        this.id = id;
        this.companyName = companyName;
        this.title = title;
        this.location = location;
        this.endDate = endDate;
        this.passType = passType;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getPassType() {
        return passType;
    }

    public void setPassType(String passType) {
        this.passType = passType;
    }
}
