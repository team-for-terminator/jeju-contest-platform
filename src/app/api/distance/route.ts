import { apiOrigin } from '@/lib/urls';
import axios from 'axios';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const x1 = req.nextUrl.searchParams.get('x1');
  const y1 = req.nextUrl.searchParams.get('y1');
  const x2 = req.nextUrl.searchParams.get('x2');
  const y2 = req.nextUrl.searchParams.get('y2');

  const response = await axios.get(
    apiOrigin + `/api/distance?x1=${x1}&y1=${y1}&x2=${x2}&y2=${y2}`
  );

  return NextResponse.json({
    distance: response.data.distance,
  });
}
