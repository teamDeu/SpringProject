package com.example.Backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "e_users")
@Data
public class Euser {

    @Id
    private String id; // Primary Key

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    private String phone;

    @Column(name = "profile_img")
    private String profileImg;
}
