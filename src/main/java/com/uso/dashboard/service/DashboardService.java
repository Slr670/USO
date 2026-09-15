package com.uso.dashboard.service;

import com.uso.dashboard.model.DashboardModule;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface กำหนดสัญญาการทำงานทางธุรกิจ (Business Logic Contract)
 * สำหรับการจัดการและสืบค้นข้อมูลโมดูลต่างๆ ของระบบ SHF Dashboard
 *
 * @author Taksi / USO Engineering Team
 * @version 2.4.8
 */
public interface DashboardService {

    /**
     * ดึงรายการโมดูลทั้งหมดในระบบ จัดเรียงตามลำดับที่ถูกต้อง
     *
     * @return รายการ (List) ของ {@link DashboardModule} ทั้งหมด 8 โมดูล
     */
    List<DashboardModule> getAllModules();

    /**
     * ค้นหาโมดูลตามดัชนีลำดับ (Order Index: 0 ถึง 7)
     *
     * @param orderIndex ลำดับที่ต้องการค้นหา
     * @return {@link Optional} ที่บรรจุข้อมูลโมดูลหากพบ หรือ Optional.empty() หากไม่พบ
     */
    Optional<DashboardModule> getModuleByOrderIndex(int orderIndex);

    /**
     * ค้นหาโมดูลตามรหัสประจำตัว (ID)
     *
     * @param id รหัสประจำตัวโมดูล
     * @return {@link Optional} ที่บรรจุข้อมูลโมดูล
     */
    Optional<DashboardModule> getModuleById(Integer id);

    /**
     * ดึงโมดูลเริ่มต้น (Default Active Module) สำหรับแสดงผลเมื่อเปิดหน้าเว็บครั้งแรก (โมดูล PM - Index 0)
     *
     * @return {@link DashboardModule} ที่เป็นโมดูลเริ่มต้น
     */
    DashboardModule getDefaultModule();
}
