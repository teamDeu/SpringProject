package com.example.Backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "m_users")
public class User {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "name")
    private String name;

    @Column(name = "phone")
    private String phone;

    @Column(name = "birth_date")
    private String birthDate;

    // Getters and Setters
}
