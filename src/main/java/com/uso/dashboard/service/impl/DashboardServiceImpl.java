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
 * ทำหน้าที่เป็น Service Layer จัดเตรียมและประมวลผลข้อมูลของโมดูลทั้ง 8 หมวดหมู่งาน
 * เชื่อมโยงระบบแปลภาษาไทย 100% สอดคล้องกับ i18next + react-i18next
 * รวมถึงการตั้งค่าลิงก์ภายนอกสำหรับ "6. วาระเจ้าหน้าที่ DOPA" 
 * ไปยัง https://wara5year.vercel.app/
 *
 * @author Taksi / USO Engineering Team
 * @version 2.4.0
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
     * นำเข้าข้อมูลแม่นยำภาษาไทย 100% จากแดชบอร์ดโครงการ SHF
     */
    private void initModules() {
        // ช่องที่ 1: งานบำรุงรักษาเชิงป้องกัน (PM)
        moduleRepository.add(new DashboardModule(
                1,
                0,
                "1. บำรุงรักษาเชิงป้องกัน (PM)",
                "1. งานบำรุงรักษาเชิงป้องกัน (Preventive Maintenance — PM)",
                "หมวดหมู่งาน: บำรุงรักษาเชิงป้องกัน",
                "fa-solid fa-screwdriver-wrench",
                "บันทึกแผนและรายงานการตรวจสอบอุปกรณ์ทวนสัญญาณ SHF ประจำรอบ, ตรวจวัดระดับความแรงสัญญาณ, ตรวจสอบสายนำสัญญาณ เสาอากาศ และระบบไฟฟ้าสำรองในแต่ละสถานีฐาน",
                "https://pm-5year.vercel.app/",
                true
        ));

        // ช่องที่ 2: งานแก้ไขเหตุขัดข้องฉุกเฉิน (CM)
        moduleRepository.add(new DashboardModule(
                2,
                1,
                "2. แก้ไขเหตุขัดข้อง (CM)",
                "2. งานแก้ไขเหตุขัดข้องฉุกเฉิน (Corrective Maintenance — CM)",
                "หมวดหมู่งาน: แก้ไขเหตุขัดข้องฉุกเฉิน",
                "fa-solid fa-triangle-exclamation",
                "การเปิดและติดตามใบแจ้งเหตุขัดข้อง (Incident Ticket) เมื่ออุปกรณ์ SHF ขัดข้องหรือสัญญาณขาดหาย เพื่อให้ทีมช่างเข้าพื้นที่แก้ไขตามกรอบเวลาข้อตกลงระดับบริการ (SLA)",
                "https://dtrs-app-uat.forth.co.th/",
                true
        ));

        // ช่องที่ 3: แผนเข้าพบและเยี่ยมเยือนทุก 3 เดือน (Conduct Quarterly Visits)
        moduleRepository.add(new DashboardModule(
                3,
                2,
                "3. ตรวจเช็กทุก 3 เดือน",
                "3. การเข้าตรวจเช็กและเยี่ยมเยือนทุก 3 เดือน (การตรวจติดตามรายไตรมาส)",
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
                "4. จัดการเคลมอุปกรณ์",
                "4. การจัดการและยื่นเคลมอุปกรณ์และประกัน (ส่งซ่อมและรับประกัน)",
                "หมวดหมู่งาน: การรับประกันและส่งซ่อม",
                "fa-solid fa-arrows-rotate",
                "ติดตามสถานะโมดูล SHF, สายเคเบิล หรือชุดจ่ายไฟ (Power Unit) ที่ส่งเคลมกับคู่สัญญาหรือโรงงานผู้ผลิต พร้อมบันทึกประวัติการเปลี่ยนอะไหล่",
                "https://equipment-claims.vercel.app/",
                true
        ));

        // ช่องที่ 5: การตรวจสอบและเฝ้าระวังสถานะระบบ (Monitor System)
        moduleRepository.add(new DashboardModule(
                5,
                4,
                "5. เฝ้าระวังสถานะระบบ",
                "5. การตรวจสอบและเฝ้าระวังสถานะระบบ (เฝ้าระวังโครงข่ายสด)",
                "หมวดหมู่งาน: ตรวจสอบสถานะโครงข่าย",
                "fa-solid fa-chart-line",
                "แดชบอร์ดแสดงสถานะเวลาการทำงานของระบบ (Uptime), ลิงก์สัญญาณ SHF ขาดหาย (Link Down), ระดับความแรงของคลื่นความถี่ SHF แบบเรียลไทม์ และบันทึกประวัติการแจ้งเตือนต่างๆ (Logs)",
                "https://bssc-nine.vercel.app/",
                true
        ));

        // ช่องที่ 6: วาระคงเหลือและเกษียณอายุราชการ กรมการปกครอง (Track DOPA Tenure)
        moduleRepository.add(new DashboardModule(
                6,
                5,
                "6. วาระเจ้าหน้าที่ DOPA",
                "6. ระบบติดตามและคำนวณวาระคงเหลือเจ้าหน้าที่รัฐ กรมการปกครอง (DOPA)",
                "หมวดหมู่งาน: วาระคงเหลือและเกษียณอายุราชการ (DOPA)",
                "fa-solid fa-building-columns",
                "ติดตามและคำนวณวาระการดำรงตำแหน่งคงเหลือของเจ้าหน้าที่รัฐ กรมการปกครอง รวมถึงวันสิ้นสุดวาระและกรอบเวลาเกษียณอายุราชการ (ระบบติดตามวาระคงเหลือ 5 ปี และเกษียณอายุราชการ รวม 181 สถานี USO)",
                "https://wara5year.vercel.app/",
                true
        ));

        // ช่องที่ 7: การบริหารจัดการคลังสินค้า/สต็อกอะไหล่ (Manage Inventory)
        moduleRepository.add(new DashboardModule(
                7,
                6,
                "7. จัดการคลังพัสดุ",
                "7. การบริหารจัดการคลังสินค้าและสต็อกอะไหล่ (คลังพัสดุและอุปกรณ์)",
                "หมวดหมู่งาน: วัสดุและอุปกรณ์คงคลัง",
                "fa-solid fa-boxes-stacked",
                "ตรวจนับจำนวนสต็อกอุปกรณ์ทวนสัญญาณ SHF สำรอง (ชิ้นส่วนอะไหล่), เสาอากาศ, ตัวแปลงไฟ และอุปกรณ์เสริม พร้อมประวัติการเบิก-จ่ายสำหรับงาน PM และ CM",
                "https://www.stockflowth.online/dashboard",
                true
        ));

        // ช่องที่ 8: การจัดการทะเบียนครุภัณฑ์และทรัพย์สิน (Track Assets & Equipment)
        moduleRepository.add(new DashboardModule(
                8,
                7,
                "8. ทรัพย์สินและครุภัณฑ์",
                "8. การจัดการทะเบียนครุภัณฑ์และทรัพย์สิน (ทะเบียนพัสดุอุปกรณ์)",
                "หมวดหมู่งาน: ทะเบียนครุภัณฑ์และทรัพย์สิน",
                "fa-solid fa-clipboard-check",
                "ระบบบันทึกและจัดการทะเบียนครุภัณฑ์ อุปกรณ์สื่อสาร SHF หมายเลขทะเบียนครุภัณฑ์ (รหัสทรัพย์สิน/หมายเลขซีเรียล), สถานะการใช้งาน, ประวัติการส่งมอบและโอนย้ายทรัพย์สิน",
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
