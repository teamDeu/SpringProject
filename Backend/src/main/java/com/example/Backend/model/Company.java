package com.example.Backend.model;

import jakarta.persistence.*;

@Entity
@Table(name ="c_companies")
public class Company {

    @Id
    @Column(name ="id")
    private String id;

    @Column(name ="name")
    private String name;

    @Column(name ="logo_url")
    private String logoUrl;

    @Column(name ="industry")
    private String industry;

    @Column(name = "location")
    private String location;

    @Column(name ="website_url")
    private String websiteUrl;

    // getters and setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getWebsiteUrl() {
        return websiteUrl;
    }

    public void setWebsiteUrl(String websiteUrl) {
        this.websiteUrl = websiteUrl;
    }
}