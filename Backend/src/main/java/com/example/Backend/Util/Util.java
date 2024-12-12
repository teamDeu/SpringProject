package com.example.Backend.Util;

import java.util.Calendar;
import java.util.Date;

public class Util {
    public static String generateUniqueFilename(String directory, String originalFilename) {
        String baseName = originalFilename.substring(0, originalFilename.lastIndexOf('.'));
        String extension = originalFilename.substring(originalFilename.lastIndexOf('.'));
        String uniqueFilename = originalFilename;

        int counter = 0;
        while (new java.io.File(directory + "/" + uniqueFilename).exists()) {
            counter++;
            uniqueFilename = baseName + "_" + counter + extension;
        }
        return uniqueFilename;
    }

    public static int calculateAge(Date birthDate, Date currentDate) {
        Calendar birthCalendar = Calendar.getInstance();
        birthCalendar.setTime(birthDate);

        Calendar currentCalendar = Calendar.getInstance();
        currentCalendar.setTime(currentDate);

        int birthYear = birthCalendar.get(Calendar.YEAR);
        int currentYear = currentCalendar.get(Calendar.YEAR);

        int age = currentYear - birthYear;

        // 생일이 아직 지나지 않은 경우 1살 감소
        int birthMonth = birthCalendar.get(Calendar.MONTH);
        int birthDay = birthCalendar.get(Calendar.DAY_OF_MONTH);

        int currentMonth = currentCalendar.get(Calendar.MONTH);
        int currentDay = currentCalendar.get(Calendar.DAY_OF_MONTH);

        if (currentMonth < birthMonth || (currentMonth == birthMonth && currentDay < birthDay)) {
            age--;
        }

        return age;
    }
}
