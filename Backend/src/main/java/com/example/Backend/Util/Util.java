package com.example.Backend.Util;

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
}
