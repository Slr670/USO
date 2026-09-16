package com.uso.dashboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * คลาสหลักสำหรับการเริ่มต้นทำงานของระบบ Spring Boot Web Application
 * (Application Entry Point)
 * 
 * โครงการเพิ่มประสิทธิภาพโครงข่ายสื่อสารด้วยอุปกรณ์ทวนสัญญาณผ่านคลื่นความถี่สูง (SHF)
 * ศูนย์ปฏิบัติการและติดตามสถานะงานโครงการ (Project Operation & Maintenance Dashboard)
 *
 * @author Taksi / USO Engineering Team
 * @version 2.6.0
 */
@SpringBootApplication
public class ShfDashboardApplication {

    /**
     * เมธอด main สำหรับ Bootstrap และเปิดทำงาน Embedded Server
     *
     * @param args ข้อโต้แย้งคำสั่งบรรทัด (Command line arguments)
     */
    public static void main(String[] args) {
        SpringApplication.run(ShfDashboardApplication.class, args);
    }
}
