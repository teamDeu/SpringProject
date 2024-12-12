package com.example.Backend.Util;

import java.io.File;

public class RenameFiles {
    public static void main(String[] args) {
        String directoryPath = "C:/springProject/SpringProject/frontend/src/container/Resume/ProImg";
        File directory = new File(directoryPath);

        if (!directory.exists() || !directory.isDirectory()) {
            System.out.println("Invalid directory path.");
            return;
        }

        File[] files = directory.listFiles();
        if (files == null) {
            System.out.println("No files found in the directory.");
            return;
        }

        for (File file : files) {
            if (file.isFile() && file.getName().contains("_")) {
                // UUID를 제거하고 원본 파일명 추출
                String originalFileName = file.getName().substring(file.getName().indexOf("_") + 1);
                File newFile = new File(directoryPath + File.separator + originalFileName);

                if (file.renameTo(newFile)) {
                    System.out.println("Renamed: " + file.getName() + " -> " + originalFileName);
                } else {
                    System.out.println("Failed to rename: " + file.getName());
                }
            }
        }
    }
}
