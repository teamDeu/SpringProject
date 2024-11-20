package com.example.Backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@Data
@Table(name ="c_companies")
public class Company {

    @Id
    @Column(name ="id")
    private String id;

    @Column(name="pwd")
    private String pwd;

    @Column(name ="company_name")
    private String companyName;

    @Column(name ="industry")
    private String industry;

    @Column(name = "location")
    private String location;

    @Column(name = "business_number")
    private String businessNumber;

    @Column(name = "since")
    private Long since;

    @Column(name ="employees")
    private Long employees;

    @Column(name = "manager_name")
    @JsonProperty("manager_name")
    private String managerName;

    @Column(name = "manager_phone")
    @JsonProperty("manager_phone")
    private String managerPhone;


    @Column(name ="logo_url")
    private String logoUrl;
}