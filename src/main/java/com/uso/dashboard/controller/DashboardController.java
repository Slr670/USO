package com.uso.dashboard.controller;

import com.uso.dashboard.model.DashboardModule;
import com.uso.dashboard.service.DashboardService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

/**
 * Spring MVC Controller หลักสำหรับแสดงผลหน้าแดชบอร์ด
 * 
 * ทำหน้าที่รับ HTTP Request จาก Web Browser, ดึงข้อมูลโมดูลผ่าน {@link DashboardService},
 * แล้วส่ง Attributes เข้าสู่ Spring MVC Model เพื่อให้ Thymeleaf Template ทำการ Render
 *
 * @author Taksi / USO Engineering Team
 * @version 2.4.7
 */
@Controller
public class DashboardController {

    private final DashboardService dashboardService;

    /** เวอร์ชันของแอปพลิเคชันที่อ่านจาก application.yml */
    @Value("${app.version:2.4.7}")
    private String appVersion;

    /** ชื่อโครงการภาษาไทย */
    @Value("${app.title:โครงการเพิ่มประสิทธิภาพโครงข่ายสื่อสารด้วยอุปกรณ์ทวนสัญญาณผ่านคลื่นความถี่สูง (SHF)}")
    private String appTitle;

    /** คำอธิบายโครงการย่อย */
    @Value("${app.subtitle:ศูนย์ปฏิบัติการและติดตามสถานะงานโครงการ (Project Operation & Maintenance Dashboard)}")
    private String appSubtitle;

    /**
     * Constructor Injection สำหรับการทำ Dependency Injection ตามหลัก Best Practices
     *
     * @param dashboardService เซอร์วิสข้อมูลแดชบอร์ด
     */
    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    /**
     * จัดการ Request สำหรับหน้าแรก (Home Page: "/")
     *
     * @param model Spring MVC Model สำหรับส่งข้อมูลไปยัง View
     * @return ชื่อของ Thymeleaf Template ("index")
     */
    @GetMapping("/")
    public String showDashboard(Model model) {
        // ดึงรายการโมดูลทั้งหมด 8 หมวดหมู่งาน
        List<DashboardModule> modules = dashboardService.getAllModules();
        
        // ดึงโมดูลเริ่มต้น (Default Active Module: PM)
        DashboardModule defaultModule = dashboardService.getDefaultModule();

        // แนบข้อมูลเข้ากับ Model
        model.addAttribute("modules", modules);
        model.addAttribute("activeModule", defaultModule);
        model.addAttribute("appVersion", appVersion);
        model.addAttribute("appTitle", appTitle);
        model.addAttribute("appSubtitle", appSubtitle);

        return "index";
    }
}
