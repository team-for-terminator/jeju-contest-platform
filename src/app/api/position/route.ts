import { apiOrigin } from '@/lib/urls';
import axios from 'axios';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const x = req.nextUrl.searchParams.get('x');
  const y = req.nextUrl.searchParams.get('y');

  console.log(x, y);

  const response = await axios.get(apiOrigin + `/api/position?x=${x}&y=${y}`);

  return NextResponse.json({
    latitude: response.data.latitude,
    longitude: response.data.longitude,
  });
}
