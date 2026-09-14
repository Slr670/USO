package com.uso.dashboard;

import com.uso.dashboard.model.DashboardModule;
import com.uso.dashboard.service.DashboardService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit & Integration Test สำหรับตรวจสอบความสมบูรณ์ของการโหลด Spring Context
 * และการตรวจสอบชุดข้อมูลเริ่มต้นของระบบ DashboardService
 *
 * @author Taksi / USO Engineering Team
 * @version 2.0.0
 */
@SpringBootTest
class ShfDashboardApplicationTests {

    @Autowired
    private DashboardService dashboardService;

    @Test
    @DisplayName("ตรวจสอบการโหลด Spring Application Context")
    void contextLoads() {
        assertNotNull(dashboardService, "DashboardService ควรถูกฉีด (Injected) เข้ามาใน Context");
    }

    @Test
    @DisplayName("ตรวจสอบว่าโมดูลมีครบถ้วนทั้ง 7 รายการตามสเปก")
    void testAllModulesLoaded() {
        List<DashboardModule> modules = dashboardService.getAllModules();
        assertEquals(7, modules.size(), "โมดูลในระบบจะต้องมีทั้งหมด 7 หมวดหมู่งานพอดี");
    }

    @Test
    @DisplayName("ตรวจสอบโมดูลที่ 6 (วาระเจ้าหน้าที่รัฐ กรมการปกครอง) ว่ามีลิงก์ Redirect และ flag external ถูกต้อง")
    void testModuleSixExternalLink() {
        Optional<DashboardModule> moduleOpt = dashboardService.getModuleByOrderIndex(5);
        assertTrue(moduleOpt.isPresent(), "ต้องพบโมดูลลำดับที่ 6 (Order Index 5)");

        DashboardModule moduleSix = moduleOpt.get();
        assertEquals("6. วาระเจ้าหน้าที่รัฐ กรมการปกครอง", moduleSix.getShortCode());
        assertTrue(moduleSix.isExternal(), "โมดูลที่ 6 จะต้องระบุเป็น External Link");
        assertEquals("https://wara5year.vercel.app/", moduleSix.getExternalUrl(), 
                "URL ภายนอกจะต้องเป็น https://wara5year.vercel.app/");
    }

    @Test
    @DisplayName("ตรวจสอบ Default Module ต้องเป็น PM (Index 0)")
    void testDefaultModule() {
        DashboardModule defaultModule = dashboardService.getDefaultModule();
        assertNotNull(defaultModule);
        assertEquals(0, defaultModule.getOrderIndex());
        assertEquals("1. PM", defaultModule.getShortCode());
    }
}
