import { MENU_MODULES_DATA } from './modules-data';
import type { OperationalModule, IDashboardService } from './types';

export class DashboardService implements IDashboardService {
  private readonly modules: readonly OperationalModule[];

  constructor(initialData: readonly OperationalModule[] = MENU_MODULES_DATA) {
    this.modules = Object.freeze([...initialData]);
  }

  /**
   * Retrieve all 8 operational modules
   */
  public getAllModules(): OperationalModule[] {
    return [...this.modules];
  }

  /**
   * Retrieve a single module by order index (0 to 7)
   */
  public getModuleByOrderIndex(orderIndex: number): OperationalModule | undefined {
    return this.modules.find((m) => m.orderIndex === orderIndex);
  }

  /**
   * Retrieve a single module by id (1 to 8)
   */
  public getModuleById(id: number): OperationalModule | undefined {
    return this.modules.find((m) => m.id === id);
  }

  /**
   * Retrieve the default active module (Index 0: Perform PM)
   */
  public getDefaultModule(): OperationalModule {
    const defaultMod = this.modules[0];
    if (!defaultMod) {
      throw new Error('Default module not found in repository');
    }
    return defaultMod;
  }
}

// Default singleton instance
export const dashboardService = new DashboardService();
