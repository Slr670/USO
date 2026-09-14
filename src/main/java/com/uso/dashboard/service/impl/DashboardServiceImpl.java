package com.uso.dashboard.service.impl;

import com.uso.dashboard.model.DashboardModule;
import com.uso.dashboard.service.DashboardService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

/**
 * คลาส Implementation ของ {@link DashboardService}
 * 
 * ทำหน้าที่เป็น Service Layer จัดเตรียมและประมวลผลข้อมูลของโมดูลทั้ง 7 ช่อง
 * รวมถึงการตั้งค่าลิงก์ภายนอกสำหรับ "6. วาระเจ้าหน้าที่รัฐ กรมการปกครอง" 
 * ไปยัง https://wara5year.vercel.app/
 *
 * @author Taksi / USO Engineering Team
 * @version 2.0.0
 */
@Service
public class DashboardServiceImpl implements DashboardService {

    /** เก็บแคชของชุดข้อมูลโมดูลทั้ง 7 หมวดหมู่ */
    private final List<DashboardModule> moduleRepository = new ArrayList<>();

    /**
     * Constructor เริ่มต้นทำการ Initialize ข้อมูลทั้ง 7 หมวดหมู่งาน
     */
    public DashboardServiceImpl() {
        initModules();
    }

    /**
     * เมธอดสำหรับสร้างและจัดเตรียมชุดข้อมูลเริ่มต้นของระบบ (Initial Data Seeding)
     * นำเข้าข้อมูลแม่นยำจากแดชบอร์ดโครงการ SHF
     */
    private void initModules() {
        // ช่องที่ 1: งานบำรุงรักษาเชิงป้องกัน (PM)
        moduleRepository.add(new DashboardModule(
                1,
                0,
                "1. PM",
                "1. งานบำรุงรักษาเชิงป้องกัน (Preventive Maintenance - PM)",
                "หมวดหมู่งาน: บำรุงรักษาเชิงป้องกัน",
                "fa-solid fa-screwdriver-wrench",
                "บันทึกแผนและรายงานการตรวจสอบอุปกรณ์ทวนสัญญาณ SHF ประจำรอบ, ตรวจวัดระดับความแรงสัญญาณ, ตรวจสอบสายนำสัญญาณ เสาอากาศ และระบบไฟฟ้าสำรองในแต่ละสถานีฐาน",
                null,
                false
        ));

        // ช่องที่ 2: งานแก้ไขเหตุขัดข้อง (CM)
        moduleRepository.add(new DashboardModule(
                2,
                1,
                "2. CM",
                "2. งานแก้ไขเหตุขัดข้อง (Corrective Maintenance - CM)",
                "หมวดหมู่งาน: แก้ไขเหตุขัดข้องฉุกเฉิน",
                "fa-solid fa-triangle-exclamation",
                "การเปิดและติดตาม Incident Ticket เมื่ออุปกรณ์ SHF เกิดขัดข้อง หรือสัญญาณขาดหาย เพื่อให้ทีมช่างเข้าพื้นที่แก้ไขตามกรอบเวลา SLA",
                null,
                false
        ));

        // ช่องที่ 3: แผนเข้าพบและเยี่ยมเยือนทุก 3 เดือน
        moduleRepository.add(new DashboardModule(
                3,
                2,
                "3. เยี่ยมเยือนทุก 3 เดือน",
                "3. แผนเข้าพบและเยี่ยมเยือนทุก 3 เดือน",
                "หมวดหมู่งาน: แผนลงพื้นที่ตรวจติดตาม",
                "fa-solid fa-calendar-check",
                "ตารางนัดหมายการเข้าตรวจเยี่ยมหน่วยงานในพื้นที่ทุกไตรมาส รวบรวมข้อเสนอแนะ ปัญหาการใช้งาน และประเมินความพึงพอใจของผู้ใช้งานโครงข่าย",
                null,
                false
        ));

        // ช่องที่ 4: ระบบส่งซ่อมและเคลมอุปกรณ์ (Claim / RMA)
        moduleRepository.add(new DashboardModule(
                4,
                3,
                "4. เคลม",
                "4. ระบบส่งซ่อมและเคลมอุปกรณ์ (RMA / Warranty Claim)",
                "หมวดหมู่งาน: การรับประกันและส่งซ่อม",
                "fa-solid fa-arrows-rotate",
                "ติดตามสถานะโมดูล SHF, สายเคเบิล, หรืออุปกรณ์ Power Unit ที่ส่งเคลมกับคู่สัญญาหรือโรงงานผู้ผลิต พร้อมบันทึกประวัติการเปลี่ยนอะไหล่",
                null,
                false
        ));

        // ช่องที่ 5: ระบบตรวจสอบสถานะสัญญาณและโครงข่าย (Monitor)
        moduleRepository.add(new DashboardModule(
                5,
                4,
                "5. Monitor",
                "5. ระบบตรวจสอบสถานะสัญญาณและโครงข่าย (Monitor / NMS)",
                "หมวดหมู่งาน: ตรวจสอบสถานะโครงข่าย",
                "fa-solid fa-chart-line",
                "แดชบอร์ดแสดงสถานะ Uptime, ลิงก์สัญญาณ SHF ขาดหาย (Link Down), ระดับความแรงของคลื่นความถี่ SHF แบบ Real-time หรือ Log การแจ้งเตือนต่างๆ",
                null,
                false
        ));

        // ช่องที่ 6: วาระประสานงานเจ้าหน้าที่รัฐ กรมการปกครอง (เชื่อมโยงภายนอกไปยัง wara5year.vercel.app)
        moduleRepository.add(new DashboardModule(
                6,
                5,
                "6. วาระเจ้าหน้าที่รัฐ กรมการปกครอง",
                "6. วาระประสานงานเจ้าหน้าที่รัฐ กรมการปกครอง",
                "หมวดหมู่งาน: ประสานงานราชการ",
                "fa-solid fa-building-columns",
                "รวบรวมวาระการประชุม บันทึกข้อตกลง (MOU), เอกสารขออนุญาตเข้าพื้นที่ว่าการอำเภอ/ท้องถิ่น และรายงานผลการดำเนินงานเสนอผู้บริหารกรมการปกครอง",
                "https://wara5year.vercel.app/",
                true
        ));

        // ช่องที่ 7: ระบบคลังอะไหล่และอุปกรณ์คงคลัง (Inventory)
        moduleRepository.add(new DashboardModule(
                7,
                6,
                "7. คลัง",
                "7. ระบบคลังอะไหล่และอุปกรณ์คงคลัง (Inventory)",
                "หมวดหมู่งาน: วัสดุและอุปกรณ์คงคลัง",
                "fa-solid fa-boxes-stacked",
                "ตรวจนับจำนวนสต็อกอุปกรณ์ทวนสัญญาณ SHF สำรอง (Spare Parts), เสาอากาศ, ตัวแปลงไฟ, และอุปกรณ์เสริม พร้อมประวัติการเบิก-จ่ายสำหรับงาน PM และ CM",
                null,
                false
        ));
    }

    @Override
    public List<DashboardModule> getAllModules() {
        // ส่งคืนแบบ Unmodifiable List เพื่อป้องกันการแก้ไขข้อมูลโดยตรงจากภายนอก
        return Collections.unmodifiableList(moduleRepository);
    }

    @Override
    public Optional<DashboardModule> getModuleByOrderIndex(int orderIndex) {
        return moduleRepository.stream()
                .filter(m -> m.getOrderIndex() == orderIndex)
                .findFirst();
    }

    @Override
    public Optional<DashboardModule> getModuleById(Integer id) {
        return moduleRepository.stream()
                .filter(m -> m.getId().equals(id))
                .findFirst();
    }

    @Override
    public DashboardModule getDefaultModule() {
        // โมดูลเริ่มต้นคือช่องที่ 1 (Index 0: PM)
        return moduleRepository.get(0);
    }
}
