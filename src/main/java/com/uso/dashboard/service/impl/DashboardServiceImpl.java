package com.uso.dashboard.service.impl;

import com.uso.dashboard.model.DashboardModule;
import com.uso.dashboard.service.DashboardService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for {@link DashboardService}
 * 
 * Manages datasets and state for all 8 operational modules of the SHF Dashboard.
 *
 * @author Taksi / USO Engineering Team
 * @version 2.4.6
 */
@Service
public class DashboardServiceImpl implements DashboardService {

    /** In-memory repository cache for the 8 operational modules */
    private final List<DashboardModule> moduleRepository = new ArrayList<>();

    /**
     * Initializes module datasets
     */
    public DashboardServiceImpl() {
        initModules();
    }

    /**
     * Seed initial module datasets in 100% English
     */
    private void initModules() {
        // Module 1: Perform Preventive Maintenance (PM)
        moduleRepository.add(new DashboardModule(
                1,
                0,
                "1. Perform PM",
                "1. Perform Preventive Maintenance (PM)",
                "Category: Preventive Maintenance",
                "fa-solid fa-screwdriver-wrench",
                "Schedule and record periodic inspection logs for SHF repeater base stations, measure radio frequency (RF) signal levels, inspect feeder cables, antennas, and verify backup power systems across all sites.",
                "https://pm-5year.vercel.app/",
                true
        ));

        // Module 2: Handle Corrective Maintenance (CM)
        moduleRepository.add(new DashboardModule(
                2,
                1,
                "2. Handle CM",
                "2. Handle Corrective Maintenance (CM)",
                "Category: Corrective Maintenance & Emergency Response",
                "fa-solid fa-triangle-exclamation",
                "Open, track, and resolve incident tickets for SHF repeater equipment malfunctions and microwave link interruptions, dispatching technical teams within SLA-governed recovery windows.",
                "https://dtrs-app-uat.forth.co.th/",
                true
        ));

        // Module 3: Conduct Quarterly Site Inspection Visits
        moduleRepository.add(new DashboardModule(
                3,
                2,
                "3. Quarterly Visits",
                "3. Conduct Quarterly Site Inspection Visits",
                "Category: Quarterly Site Inspections",
                "fa-solid fa-calendar-check",
                "Coordinate and manage quarterly on-site inspection visits to regional stations, consolidate stakeholder feedback, resolve operational issues, and evaluate network user satisfaction.",
                "https://pre-pm-2.vercel.app/",
                true
        ));

        // Module 4: Process Equipment & Warranty Claims
        moduleRepository.add(new DashboardModule(
                4,
                3,
                "4. Process Claims",
                "4. Process Equipment & Warranty Claims",
                "Category: Warranty & Equipment RMA",
                "fa-solid fa-arrows-rotate",
                "Manage Return Merchandise Authorization (RMA) workflows for defective SHF transceiver modules, microwave feedhorns, and power supply units with equipment vendors, maintaining complete replacement audit trails.",
                "https://equipment-claims.vercel.app/",
                true
        ));

        // Module 5: Monitor System & Radio Telemetry
        moduleRepository.add(new DashboardModule(
                5,
                4,
                "5. Monitor System",
                "5. Monitor System & Radio Telemetry",
                "Category: Network Telemetry & Real-Time Monitoring",
                "fa-solid fa-chart-line",
                "Real-time telemetry dashboard displaying network uptime, SHF radio link degradation (Link Down events), received signal level (RSL) thresholds, and centralized alert event logs.",
                "https://bssc-nine.vercel.app/",
                true
        ));

        // Module 6: Track DOPA Officials' Tenure
        moduleRepository.add(new DashboardModule(
                6,
                5,
                "6. DOPA Tenure",
                "6. Track DOPA Officials' Tenure",
                "Category: DOPA Tenure Tracking",
                "fa-solid fa-building-columns",
                "Track the remaining tenure and operational missions of DOPA officials across the 181 USO stations network.",
                "https://wara5year.vercel.app/",
                true
        ));

        // Module 7: Manage Spare Parts & Inventory
        moduleRepository.add(new DashboardModule(
                7,
                6,
                "7. Manage Inventory",
                "7. Manage Spare Parts & Inventory",
                "Category: Spare Parts & Inventory Management",
                "fa-solid fa-boxes-stacked",
                "Manage reserve inventory levels for SHF repeater spare parts, parabolic antennas, RF amplifiers, power converters, and auxiliary components, auditing requisition logs for PM and CM dispatches.",
                "https://www.stockflowth.online/dashboard",
                true
        ));

        // Module 8: Track Assets & Equipment Registry
        moduleRepository.add(new DashboardModule(
                8,
                7,
                "8. Assets & Equipment",
                "8. Track Assets & Equipment Registry",
                "Category: Asset & Equipment Registry",
                "fa-solid fa-clipboard-check",
                "Maintain comprehensive fixed-asset registration records for SHF telecommunication infrastructure, tracking Asset IDs, serial numbers, operational readiness, handover certificates, and equipment relocation histories.",
                "https://contion.vercel.app/",
                true
        ));
    }

    @Override
    public List<DashboardModule> getAllModules() {
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
        return moduleRepository.get(0);
    }
}
