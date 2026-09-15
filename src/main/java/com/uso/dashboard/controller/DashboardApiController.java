package com.uso.dashboard.controller;

import com.uso.dashboard.model.DashboardModule;
import com.uso.dashboard.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * REST API Controller สำหรับให้บริการข้อมูลโมดูลในรูปแบบ JSON
 * 
 * รองรับการเชื่อมต่อแบบ Asynchronous และ Single-Page Client Fetching
 * รวมทั้งรองรับ Cross-Origin Resource Sharing (CORS)
 *
 * @author Taksi / USO Engineering Team
 * @version 2.4.7
 */
@RestController
@RequestMapping("/api/v1/modules")
@CrossOrigin(origins = "*")
public class DashboardApiController {

    private final DashboardService dashboardService;

    public DashboardApiController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    /**
     * ดึงรายการโมดูลทั้งหมดในรูปแบบ JSON Array
     *
     * @return {@link ResponseEntity} บรรจุรายการโมดูลทั้งหมด
     */
    @GetMapping
    public ResponseEntity<List<DashboardModule>> getAllModules() {
        return ResponseEntity.ok(dashboardService.getAllModules());
    }

    /**
     * ดึงข้อมูลโมดูลเดี่ยวตามดัชนีลำดับ (0 ถึง 7)
     *
     * @param orderIndex ลำดับโมดูล
     * @return {@link ResponseEntity} บรรจุข้อมูลโมดูล หรือ 404 Not Found หากไม่พบ
     */
    @GetMapping("/{orderIndex}")
    public ResponseEntity<DashboardModule> getModuleByIndex(@PathVariable int orderIndex) {
        return dashboardService.getModuleByOrderIndex(orderIndex)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
