package com.uso.dashboard.model;

import java.io.Serializable;

/**
 * คลาสโมเดลข้อมูล (Domain Model / POJO) สำหรับแต่ละหมวดหมู่และโมดูลงานในระบบ SHF Dashboard
 * 
 * คลาสนี้ทำหน้าที่ห่อหุ้ม (Encapsulate) ข้อมูลของโมดูลทั้ง 8 หมวดหมู่งาน
 * รวมถึงข้อมูลสำหรับการแสดงผล การระบุไอคอน และการเชื่อมต่อไปยังระบบภายนอก
 *
 * @author Taksi / USO Engineering Team
 * @version 2.4.7
 */
public class DashboardModule implements Serializable {

    private static final long serialVersionUID = 1L;

    /** รหัสประจำโมดูล (Unique Identifier) */
    private Integer id;

    /** ลำดับของโมดูล (0-indexed เพื่อใช้จับคู่กับ UI Array) */
    private int orderIndex;

    /** ชื่อย่อหรือป้ายชื่อแสดงบนปุ่มการ์ด เช่น "1. PM", "6. วาระเจ้าหน้าที่รัฐ กรมการปกครอง" */
    private String shortCode;

    /** ชื่อเต็มของหัวข้องาน เช่น "1. งานบำรุงรักษาเชิงป้องกัน (Preventive Maintenance - PM)" */
    private String title;

    /** ป้ายข้อความประเภทงาน (Badge) เช่น "หมวดหมู่งาน: บำรุงรักษาเชิงป้องกัน" */
    private String badge;

    /** คลาสไอคอนจาก Font Awesome สำหรับแสดงผล เช่น "fa-solid fa-screwdriver-wrench" */
    private String iconClass;

    /** คำอธิบายรายละเอียดและขอบเขตงานของโมดูล */
    private String description;

    /** URL เชื่อมต่อไปยังระบบภายนอก (ถ้ามี) เช่น "https://wara5year.vercel.app/" */
    private String externalUrl;

    /** ระบุว่าเป็นลิงก์ไปยังระบบภายนอกที่จะเปิดในแท็บใหม่หรือไม่ */
    private boolean external;

    /** สถานะเปิดใช้งานของโมดูล */
    private boolean active;

    /**
     * Default Constructor สำหรับ Frameworks (Jackson, Spring Data)
     */
    public DashboardModule() {
    }

    /**
     * Parameterized Constructor สำหรับการสร้างออบเจกต์โมดูลพร้อมข้อมูลครบถ้วน
     *
     * @param id รหัสประจำตัวโมดูล
     * @param orderIndex ลำดับโมดูล (0-indexed)
     * @param shortCode ป้ายชื่อย่อบนการ์ด
     * @param title ชื่อเต็มของหัวข้องาน
     * @param badge ป้ายข้อความประเภทงาน
     * @param iconClass คลาสไอคอน Font Awesome
     * @param description รายละเอียดการดำเนินงาน
     * @param externalUrl URL ภายนอก (ถ้ามี)
     * @param external เป็นระบบภายนอกที่ต้อง Redirect หรือไม่
     */
    public DashboardModule(Integer id, int orderIndex, String shortCode, String title, 
                           String badge, String iconClass, String description, 
                           String externalUrl, boolean external) {
        this.id = id;
        this.orderIndex = orderIndex;
        this.shortCode = shortCode;
        this.title = title;
        this.badge = badge;
        this.iconClass = iconClass;
        this.description = description;
        this.externalUrl = externalUrl;
        this.external = external;
        this.active = false;
    }

    // ==========================================
    // Getters and Setters พร้อมคำอธิบาย
    // ==========================================

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getOrderIndex() {
        return orderIndex;
    }

    public void setOrderIndex(int orderIndex) {
        this.orderIndex = orderIndex;
    }

    public String getShortCode() {
        return shortCode;
    }

    public void setShortCode(String shortCode) {
        this.shortCode = shortCode;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBadge() {
        return badge;
    }

    public void setBadge(String badge) {
        this.badge = badge;
    }

    public String getIconClass() {
        return iconClass;
    }

    public void setIconClass(String iconClass) {
        this.iconClass = iconClass;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getExternalUrl() {
        return externalUrl;
    }

    public void setExternalUrl(String externalUrl) {
        this.externalUrl = externalUrl;
    }

    public boolean isExternal() {
        return external;
    }

    public void setExternal(boolean external) {
        this.external = external;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    @Override
    public String toString() {
        return "DashboardModule{" +
                "id=" + id +
                ", orderIndex=" + orderIndex +
                ", shortCode='" + shortCode + '\'' +
                ", title='" + title + '\'' +
                ", isExternal=" + external +
                '}';
    }
}
