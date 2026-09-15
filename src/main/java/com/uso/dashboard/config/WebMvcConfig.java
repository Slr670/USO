package com.uso.dashboard.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Spring MVC Configuration สำหรับกำหนดค่า Static Resource Handlers
 * 
 * รองรับการให้บริการไฟล์ Static Assets ครบถ้วน:
 * - /assets/** สำหรับ Media, Icons, Scripts, และ Stylesheets
 * - /media/** สำหรับไฟล์วิดีโอและมัลติมีเดีย
 * - /favicon.ico สำหรับไอคอนประจำเว็บไซต์ ป้องกันข้อผิดพลาด 404
 * - /icons/** สำหรับ Vector SVG Icons
 *
 * @author Taksi / USO Engineering Team
 * @version 2.4.8
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 0. กำหนด Resource Handler สำหรับ /public/**
        registry.addResourceHandler("/public/**")
                .addResourceLocations(
                        "classpath:/static/public/",
                        "file:public/"
                )
                .setCachePeriod(3600);
        // 1. กำหนด Resource Handler สำหรับ /assets/**
        registry.addResourceHandler("/assets/**")
                .addResourceLocations(
                        "classpath:/static/assets/",
                        "classpath:/static/",
                        "file:assets/"
                )
                .setCachePeriod(3600);

        // 2. กำหนด Resource Handler สำหรับ /media/**
        registry.addResourceHandler("/media/**")
                .addResourceLocations(
                        "classpath:/static/media/",
                        "classpath:/static/assets/media/",
                        "file:assets/media/"
                )
                .setCachePeriod(3600);

        // 3. กำหนด Resource Handler สำหรับ /favicon.ico
        registry.addResourceHandler("/favicon.ico")
                .addResourceLocations(
                        "classpath:/static/favicon.ico",
                        "file:favicon.ico"
                )
                .setCachePeriod(86400);

        // 4. กำหนด Resource Handler สำหรับ /icons/**
        registry.addResourceHandler("/icons/**")
                .addResourceLocations(
                        "classpath:/static/icons/",
                        "file:assets/icons/"
                )
                .setCachePeriod(86400);
    }
}
