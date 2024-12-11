package com.example.Backend.DTO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserSearchResponse {
    private Long id;
    private String userName;
    private int userAge;
    private String userGender;
    private String[] userLocation;
    private String[] userCategory;
    private String[] userSkills;
    private int userExp;
    private String userRegDate;
}
