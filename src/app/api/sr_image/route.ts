// app/api/image.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // 외부 이미지 URL을 쿼리 파라미터에서 가져옵니다.
  const url = req.nextUrl.searchParams.get('url');

  // 유효한 URL이 아닌 경우, 에러 메시지를 반환합니다.
  if (!url) {
    return new Response('Invalid URL', { status: 400 });
  }

  try {
    // 외부 URL에서 이미지를 가져옵니다.
    const response = await fetch(url);

    // 응답이 유효하지 않은 경우, 에러 메시지를 반환합니다.
    if (!response.ok) {
      throw new Error('Image fetching failed');
    }

    // 컨텐트 타입을 가져옵니다.
    const contentType = response.headers.get('content-type') || '';

    // 이미지 데이터를 스트림으로 전송합니다.
    return new Response(response.body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
      },
    });
  } catch (error) {
    return new Response((error as Error).message, { status: 500 });
  }
}