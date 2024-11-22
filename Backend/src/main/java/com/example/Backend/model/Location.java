package com.example.Backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "e_locations")
@Data
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    private String region;
}
