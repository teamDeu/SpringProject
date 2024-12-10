package com.example.Backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

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

    @Column(name = "birth", nullable = true, columnDefinition = "DATE")
    @Temporal(TemporalType.DATE) // 명시적으로 DATE 형식 지정
    private Date birth;

    private String phone;

    @Column(name = "profile_img")
    private String profileImg;
}
