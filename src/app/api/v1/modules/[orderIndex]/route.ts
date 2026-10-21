import { NextResponse } from 'next/server';
import { dashboardService } from '../../../../../lib/modules-service';
import { getStoredModulesConfig } from '../../../../../lib/server-config-store';
import { getOperationalModulesFromConfig } from '../../../../../lib/modules-config';

export async function GET(
  _request: Request,
  props: { params: Promise<{ orderIndex: string }> }
) {
  const { orderIndex } = await props.params;
  const index = parseInt(orderIndex, 10);

  if (isNaN(index)) {
    return NextResponse.json(
      { error: 'Invalid orderIndex parameter. Must be an integer 0-9.' },
      { status: 400 }
    );
  }

  let moduleItem = dashboardService.getModuleByOrderIndex(index);

  try {
    const config = await getStoredModulesConfig();
    const modules = getOperationalModulesFromConfig(config, 'en');
    const dynamicItem = modules.find((m) => m.orderIndex === index);
    if (dynamicItem) {
      moduleItem = dynamicItem;
    }
  } catch (err) {
    console.warn(`Failed to load shared config for module index ${index}:`, err);
  }

  if (!moduleItem) {
    return NextResponse.json(
      { error: `Module with orderIndex ${index} not found.` },
      { status: 404 }
    );
  }

  return NextResponse.json(moduleItem, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    }
  });
}
