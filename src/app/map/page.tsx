'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { FaSearchLocation } from 'react-icons/fa';

const Map = () => {
  const imageUrl = '/images/adjusted_last.png';
  const canvasRef = useRef(null);
  const router = useRouter();

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const boxRef: any = useRef(null);
  const overlayRef: any = useRef(null);

  const scrollHorizontally = (distance: number) => {
    if (boxRef.current) {
      boxRef.current.scrollLeft += distance;
    }
  };

  const scrollVertically = (distance: number) => {
    if (boxRef.current) {
      boxRef.current.scrollTop += distance;
    }
  };

  const drawImage = (image: any) => {
    const canvas: any = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      canvas.width = image.width;
      canvas.height = image.height;

      overlayRef.width = image.width;
      overlayRef.height = image.height;

      ctx.drawImage(image, offsetX, offsetY);
    }
  };

  useEffect(() => {
    const image = new Image();
    image.src = imageUrl; // 이미지 URL을 설정하세요
    image.onload = () => drawImage(image);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      setStartX(e.clientX);
      setStartY(e.clientY);

      scrollHorizontally(-dx);
      scrollVertically(-dy);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 오른쪽 클릭 이벤트를 막는 핸들러 함수
  const handleContextMenu = (e: any) => {
    // 기본 동작 방지
    e.preventDefault();
  };

  return (
    <div className='w-full p-6'>
      <header className=''>
        <h1 className='font-black text-4xl'>JEJU-MAP</h1>
        <p className='text-sm text-slate-700 dark:text-slate-400'>
          파노라마 기법을 이용해 분할되어 있는 제주도 위성사진들을 하나로
          합쳐놓은 이미지입니다.
        </p>
        <div className='h-4' />
        <Button
          className='px-6'
          size={'default'}
          onClick={() => {
            router.refresh();
          }}
        >
          새로고침
        </Button>
        <div className='h-4' />

        <Separator className='bg-slate-300 dark:bg-slate-700' />
      </header>
      <div
        className='max-w-[1200px] max-h-[800px] mx-auto overflow-auto mt-16 scrollbar relative'
        ref={boxRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp}
      >
        <canvas
          className='w-[2000px]'
          ref={canvasRef}
          onContextMenu={handleContextMenu}
          onMouseOut={handleMouseUp}
        />
        <div
          className='group flex items-center justify-center absolute top-[200px] left-[1700px] w-[300px] h-[300px] rounded-full border-2 border-slate-300 hover:scale-110 transition duration-300 hover:shadow-md'
          onClick={() => {
            router.push('/map/search');
          }}
        >
          <FaSearchLocation
            size={32}
            className='group-hover:scale-150 scale-0 transition duration-700 group-hover:text-primary'
          />
        </div>
      </div>
    </div>
  );
};

export default Map;
