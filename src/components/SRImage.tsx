'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { ClipLoader } from 'react-spinners';

const SRImage = ({ index }: { index: number | undefined }) => {
  const imageUrl = `/api/sr_image?url=http://34.64.55.40/images/results/${index}_rlt.png`;
  const canvasRef = useRef(null);
  const router = useRouter();

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [loading, setLoading] = useState(true);

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

  const drawImage = async (image: any) => {
    const canvas: any = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      canvas.width = image.width;
      canvas.height = image.height;

      overlayRef.width = image.width;
      overlayRef.height = image.height;

      await ctx.drawImage(image, offsetX, offsetY);

      setLoading(false);
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
        className='max-w-[700px] max-h-[700px] mx-auto overflow-auto scrollbar relative'
        ref={boxRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp}
      >
        {loading ? (
          <p className='absolute left-1/2 top-1/2'>
            <ClipLoader size={36} color='green' />
          </p>
        ) : null}

        <canvas
          className='w-[4000px]'
          ref={canvasRef}
          onContextMenu={handleContextMenu}
          onMouseOut={handleMouseUp}
        />
      </div>
    </div>
  );
};

export default SRImage;
