package com.example.Backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
@Entity
@Table(name = "e_skills")
public class Skills {

    @Id
    @Column(name ="id")
    private Long id;

    public Skills() {}

    public Skills(Long id) {
        this.id = id;
    }

    @Column(name="name")
    private String name;

    @Column(name ="icon")
    private String icon;

    @Column(name ="description")
    private String description;
}
