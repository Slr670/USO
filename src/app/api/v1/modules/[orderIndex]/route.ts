import { NextResponse } from 'next/server';
import { dashboardService } from '../../../../../lib/modules-service';

export async function GET(
  _request: Request,
  props: { params: Promise<{ orderIndex: string }> }
) {
  const { orderIndex } = await props.params;
  const index = parseInt(orderIndex, 10);

  if (isNaN(index)) {
    return NextResponse.json(
      { error: 'Invalid orderIndex parameter. Must be an integer 0-7.' },
      { status: 400 }
    );
  }

  const moduleItem = dashboardService.getModuleByOrderIndex(index);

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
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59'
    }
  });
}
