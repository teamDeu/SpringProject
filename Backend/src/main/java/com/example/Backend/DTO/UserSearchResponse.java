package com.example.Backend.DTO;

import com.example.Backend.model.JobCategory;
import com.example.Backend.model.Location;
import com.example.Backend.model.Skills;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Setter
@Getter
public class UserSearchResponse {
    private Long id;
    private String userName;
    private int userAge;
    private String userGender;
    private List<Location> userLocation;
    private List<JobCategory> userCategory;
    private List<Skills> userSkills;
    private Integer userExp;
    private LocalDate userRegDate;
}
