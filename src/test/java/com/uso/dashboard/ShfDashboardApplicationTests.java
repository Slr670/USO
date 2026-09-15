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
 * Unit & Integration Test for Spring Context and DashboardService datasets
 *
 * @author Taksi / USO Engineering Team
 * @version 2.4.6
 */
@SpringBootTest
class ShfDashboardApplicationTests {

    @Autowired
    private DashboardService dashboardService;

    @Test
    @DisplayName("Verify Spring Application Context loading")
    void contextLoads() {
        assertNotNull(dashboardService, "DashboardService must be properly injected into Spring context");
    }

    @Test
    @DisplayName("Verify all 8 operational modules are loaded")
    void testAllModulesLoaded() {
        List<DashboardModule> modules = dashboardService.getAllModules();
        assertEquals(8, modules.size(), "The system must load exactly 8 operational modules");
    }

    @Test
    @DisplayName("Verify Module 3 (Conduct Quarterly Visits) metadata and external redirection")
    void testModuleThreeExternalLink() {
        Optional<DashboardModule> moduleOpt = dashboardService.getModuleByOrderIndex(2);
        assertTrue(moduleOpt.isPresent(), "Module 3 (Order Index 2) must be present");

        DashboardModule moduleThree = moduleOpt.get();
        assertEquals("3. Quarterly Visits", moduleThree.getShortCode());
        assertTrue(moduleThree.isExternal(), "Module 3 must be flagged as external link");
        assertEquals("https://pre-pm-2.vercel.app/", moduleThree.getExternalUrl(),
                "External URL must point to https://pre-pm-2.vercel.app/");
    }

    @Test
    @DisplayName("Verify Module 6 (Track DOPA Tenure) metadata and external redirection")
    void testModuleSixExternalLink() {
        Optional<DashboardModule> moduleOpt = dashboardService.getModuleByOrderIndex(5);
        assertTrue(moduleOpt.isPresent(), "Module 6 (Order Index 5) must be present");

        DashboardModule moduleSix = moduleOpt.get();
        assertEquals("6. DOPA Tenure", moduleSix.getShortCode());
        assertTrue(moduleSix.isExternal(), "Module 6 must be flagged as external link");
        assertEquals("https://wara5year.vercel.app/", moduleSix.getExternalUrl(), 
                "External URL must point to https://wara5year.vercel.app/");
    }

    @Test
    @DisplayName("Verify Module 8 (Track Assets & Equipment) loaded properly with external redirection")
    void testModuleEightAssetEquipment() {
        Optional<DashboardModule> moduleOpt = dashboardService.getModuleByOrderIndex(7);
        assertTrue(moduleOpt.isPresent(), "Module 8 (Order Index 7) must be present");

        DashboardModule moduleEight = moduleOpt.get();
        assertEquals("8. Assets & Equipment", moduleEight.getShortCode());
        assertEquals("Category: Asset & Equipment Registry", moduleEight.getBadge());
        assertTrue(moduleEight.isExternal(), "Module 8 must be flagged as external link");
        assertEquals("https://contion.vercel.app/", moduleEight.getExternalUrl(),
                "External URL must point to https://contion.vercel.app/");
    }

    @Test
    @DisplayName("Verify Default Module is Perform PM (Index 0)")
    void testDefaultModule() {
        DashboardModule defaultModule = dashboardService.getDefaultModule();
        assertNotNull(defaultModule);
        assertEquals(0, defaultModule.getOrderIndex());
        assertEquals("1. Perform PM", defaultModule.getShortCode());
    }
}
