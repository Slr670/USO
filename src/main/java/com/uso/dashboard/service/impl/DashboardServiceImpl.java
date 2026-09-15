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
 * @version 2.3.0
 */
@Service
public class DashboardServiceImpl implements DashboardService {

    /** เก็บแคชของชุดข้อมูลโมดูลทั้ง 8 หมวดหมู่ */
    private final List<DashboardModule> moduleRepository = new ArrayList<>();

    /**
     * Constructor เริ่มต้นทำการ Initialize ข้อมูลทั้ง 8 หมวดหมู่งาน
     */
    public DashboardServiceImpl() {
        initModules();
    }

    /**
     * เมธอดสำหรับสร้างและจัดเตรียมชุดข้อมูลเริ่มต้นของระบบ (Initial Data Seeding)
     * นำเข้าข้อมูลแม่นยำจากแดชบอร์ดโครงการ SHF
     */
    private void initModules() {
        // ช่องที่ 1: งานบำรุงรักษาเชิงป้องกัน (Perform PM)
        moduleRepository.add(new DashboardModule(
                1,
                0,
                "1. Perform PM",
                "1. Perform PM (งานบำรุงรักษาเชิงป้องกัน — Preventive Maintenance)",
                "หมวดหมู่งาน: บำรุงรักษาเชิงป้องกัน",
                "fa-solid fa-screwdriver-wrench",
                "บันทึกแผนและรายงานการตรวจสอบอุปกรณ์ทวนสัญญาณ SHF ประจำรอบ, ตรวจวัดระดับความแรงสัญญาณ, ตรวจสอบสายนำสัญญาณ เสาอากาศ และระบบไฟฟ้าสำรองในแต่ละสถานีฐาน",
                "https://pm-5year.vercel.app/",
                true
        ));

        // ช่องที่ 2: งานซ่อมแซมแก้ไขเมื่อเกิดปัญหา (Handle CM)
        moduleRepository.add(new DashboardModule(
                2,
                1,
                "2. Handle CM",
                "2. Handle CM (งานซ่อมแซมแก้ไขเมื่อเกิดปัญหา — Corrective Maintenance)",
                "หมวดหมู่งาน: แก้ไขเหตุขัดข้องฉุกเฉิน",
                "fa-solid fa-triangle-exclamation",
                "การเปิดและติดตาม Incident Ticket เมื่ออุปกรณ์ SHF เกิดขัดข้อง หรือสัญญาณขาดหาย เพื่อให้ทีมช่างเข้าพื้นที่แก้ไขตามกรอบเวลา SLA",
                "https://dtrs-app-uat.forth.co.th/",
                true
        ));

        // ช่องที่ 3: แผนเข้าพบและเยี่ยมเยือนทุก 3 เดือน (Conduct Quarterly Visits)
        moduleRepository.add(new DashboardModule(
                3,
                2,
                "3. Quarterly Visits",
                "3. Conduct Quarterly Visits (การเข้าตรวจเช็ก/เยี่ยมเยือนทุก 3 เดือน)",
                "หมวดหมู่งาน: แผนลงพื้นที่ตรวจติดตาม",
                "fa-solid fa-calendar-check",
                "ตารางนัดหมายการเข้าตรวจเยี่ยมหน่วยงานในพื้นที่ทุกไตรมาส รวบรวมข้อเสนอแนะ ปัญหาการใช้งาน และประเมินความพึงพอใจของผู้ใช้งานโครงข่าย",
                null,
                false
        ));

        // ช่องที่ 4: การจัดการและยื่นเคลมอุปกรณ์/ประกัน (Process Claims)
        moduleRepository.add(new DashboardModule(
                4,
                3,
                "4. Process Claims",
                "4. Process Claims (การจัดการและยื่นเคลมอุปกรณ์/ประกัน)",
                "หมวดหมู่งาน: การรับประกันและส่งซ่อม",
                "fa-solid fa-arrows-rotate",
                "ติดตามสถานะโมดูล SHF, สายเคเบิล, หรืออุปกรณ์ Power Unit ที่ส่งเคลมกับคู่สัญญาหรือโรงงานผู้ผลิต พร้อมบันทึกประวัติการเปลี่ยนอะไหล่",
                "https://equipment-claims.vercel.app/",
                true
        ));

        // ช่องที่ 5: การตรวจสอบและเฝ้าระวังสถานะระบบ (Monitor System)
        moduleRepository.add(new DashboardModule(
                5,
                4,
                "5. Monitor System",
                "5. Monitor System (การตรวจสอบและเฝ้าระวังสถานะระบบ)",
                "หมวดหมู่งาน: ตรวจสอบสถานะโครงข่าย",
                "fa-solid fa-chart-line",
                "แดชบอร์ดแสดงสถานะ Uptime, ลิงก์สัญญาณ SHF ขาดหาย (Link Down), ระดับความแรงของคลื่นความถี่ SHF แบบ Real-time หรือ Log การแจ้งเตือนต่างๆ",
                "https://bssc-nine.vercel.app/",
                true
        ));

        // ช่องที่ 6: วาระคงเหลือและเกษียณอายุราชการ กรมการปกครอง (Track DOPA Tenure)
        moduleRepository.add(new DashboardModule(
                6,
                5,
                "6. DOPA Tenure",
                "6. Track DOPA Tenure (ระบบติดตามและคำนวณวาระคงเหลือเจ้าหน้าที่รัฐ กรมการปกครอง)",
                "หมวดหมู่งาน: วาระคงเหลือและเกษียณอายุราชการ (DOPA)",
                "fa-solid fa-building-columns",
                "Track and calculate the remaining tenure of DOPA officials, including term expiration dates and retirement timelines. (ระบบติดตามและคำนวณวาระการดำรงตำแหน่งคงเหลือของเจ้าหน้าที่รัฐ กรมการปกครอง วันหมดวาระ 5 ปี และกรอบเวลาเกษียณอายุราชการ 181 สถานี USO)",
                "https://wara5year.vercel.app/",
                true
        ));

        // ช่องที่ 7: การบริหารจัดการคลังสินค้า/สต็อกอะไหล่ (Manage Inventory)
        moduleRepository.add(new DashboardModule(
                7,
                6,
                "7. Manage Inventory",
                "7. Manage Inventory (การบริหารจัดการคลังสินค้า/สต็อกอะไหล่)",
                "หมวดหมู่งาน: วัสดุและอุปกรณ์คงคลัง",
                "fa-solid fa-boxes-stacked",
                "ตรวจนับจำนวนสต็อกอุปกรณ์ทวนสัญญาณ SHF สำรอง (Spare Parts), เสาอากาศ, ตัวแปลงไฟ, และอุปกรณ์เสริม พร้อมประวัติการเบิก-จ่ายสำหรับงาน PM และ CM",
                "https://www.stockflowth.online/dashboard",
                true
        ));

        // ช่องที่ 8: การจัดการทะเบียนครุภัณฑ์และทรัพย์สิน (Track Assets & Equipment)
        moduleRepository.add(new DashboardModule(
                8,
                7,
                "8. Assets & Equipment",
                "8. Track Assets & Equipment (การจัดการทะเบียนครุภัณฑ์และทรัพย์สิน)",
                "หมวดหมู่งาน: ทะเบียนครุภัณฑ์และทรัพย์สิน",
                "fa-solid fa-clipboard-check",
                "ระบบบันทึกและจัดการทะเบียนครุภัณฑ์ อุปกรณ์สื่อสาร SHF หมายเลขครุภัณฑ์ (Asset ID/Serial Number), สถานะการใช้งาน, ประวัติการส่งมอบและโอนย้ายทรัพย์สิน",
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
