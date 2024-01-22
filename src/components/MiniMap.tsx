'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { FaSearchLocation } from 'react-icons/fa';

const MiniMap = () => {
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
    <div className='w-full p-2'>
      <div
        className='max-w-full max-h-full mx-auto overflow-auto scrollbar relative'
        ref={boxRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp}
      >
        <canvas
          className='w-[1000px]'
          ref={canvasRef}
          onContextMenu={handleContextMenu}
          onMouseOut={handleMouseUp}
        />
        <div
          className='group flex items-center justify-center absolute top-[240px] left-[500px] w-[100px] h-[100px] rounded-full border-2 border-slate-300 hover:scale-110 transition duration-300 hover:shadow-md'
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

export default MiniMap;
