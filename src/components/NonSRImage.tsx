'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { FaSearchLocation } from 'react-icons/fa';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { LuPencilLine } from 'react-icons/lu';
import { BiRectangle } from 'react-icons/bi';
import { IoFlagOutline } from 'react-icons/io5';
import { Crimson_Text } from 'next/font/google';
import axios from 'axios';
import { apiOrigin } from '@/lib/urls';

const NonSRImage = ({
  index,
  position,
}: {
  index: number | undefined;
  position: any;
}) => {
  const imageUrl = `/PNG/${index}.png`;
  const canvasRef: any = useRef(null);
  const router = useRouter();

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  // 선 그리기
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [bboxList, setBboxList] = useState([]);
  const [mode, setMode] = useState<any>(null);

  // 텍스트
  const [text, setText] = useState<string>('');

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

  // 선을 그리는 함수
  function drawLine(ctx: any, startX: any, startY: any, endX: any, endY: any) {
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    // 텍스트 설정
    ctx.font = '16px Arial';
    ctx.fillStyle = 'red';

    axios
      .get(
        `/api/distance?x1=${parseInt(position.x + startX)}&y1=${parseInt(
          position.y + startY
        )}&x2=${parseInt(position.x + endX)}&y2=${parseInt(position.y + endY)}`
      )
      .then((res) => {
        // 텍스트 그리기 (여기서는 (100, 100) 위치에 텍스트를 그립니다)
        setText(`(거리(km): ${res.data.distance})`);
      });
  }

  const drawFlag = (ctx: any, x: any, y: any) => {
    // 여기에 깃발 아이콘을 그리는 로직을 구현
    // 예시로 단순한 삼각형을 그립니다
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 20, y - 10);
    ctx.lineTo(x, y - 20);
    ctx.closePath();
    ctx.fillStyle = 'red';
    ctx.fill();

    // 텍스트 설정
    ctx.font = '12px Arial';

    axios
      .get(
        `/api/position?x=${parseInt(position.x + x)}&y=${parseInt(
          position.y + y
        )}`
      )
      .then((res) => {
        // 텍스트 그리기 (여기서는 (100, 100) 위치에 텍스트를 그립니다)
        setText(`(위도: ${res.data.latitude}) / (경도: ${res.data.longitude})`);
      });
  };

  const handleMouseMove = async (e: React.MouseEvent<HTMLDivElement>) => {
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

  const getMousePos = (canvas: any, evt: any) => {
    const rect = canvas.getBoundingClientRect();

    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  };

  const onDobleClick = (evt: any) => {
    const canvas: any = canvasRef.current;
    const pos = getMousePos(canvas, evt);

    console.log(`Mouse position: x=${pos.x}, y=${pos.y}`);

    const ctx = canvasRef.current.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    if (mode === null) return;

    if (mode === 'line') {
      if (isDrawing === false) {
        const image = new Image();
        image.src = imageUrl; // 이미지 URL을 설정하세요
        image.onload = () => drawImage(image);

        setStartPoint({
          x: pos.x,
          y: pos.y,
        });
        setIsDrawing(true);
      } else {
        const canvas: any = canvasRef.current;
        const pos = getMousePos(canvas, evt);

        drawLine(ctx, startPoint.x, startPoint.y, pos.x, pos.y);
        setIsDrawing(false);
      }
    }

    if (mode === 'rect') {
      if (isDrawing === false) {
        const image = new Image();
        image.src = imageUrl; // 이미지 URL을 설정하세요
        image.onload = () => drawImage(image);

        setStartPoint({
          x: pos.x,
          y: pos.y,
        });
        setIsDrawing(true);
      } else {
        const canvas: any = canvasRef.current;
        const pos = getMousePos(canvas, evt);

        const currentX = evt.clientX - rect.left;
        const currentY = evt.clientY - rect.top;

        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.rect(
          startPoint.x,
          startPoint.y,
          currentX - startPoint.x,
          currentY - startPoint.y
        );

        ctx.stroke();
        setIsDrawing(false);
      }
    }

    if (mode === 'flag') {
      const image = new Image();
      image.src = imageUrl; // 이미지 URL을 설정하세요
      image.onload = () => {
        drawImage(image);
        drawFlag(ctx, pos.x, pos.y);
      };
    }
  };

  return (
    <div className='w-full p-2'>
      <div
        className={cn(
          'max-w-[700px] max-h-[700px] mx-auto overflow-auto scrollbar relative',
          isDrawing === true && 'cursor-crosshair'
        )}
        ref={boxRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp}
        onDoubleClick={onDobleClick}
      >
        <ToggleGroup type='single' className='fixed z-10'>
          <ToggleGroupItem
            value='line'
            onClick={() => {
              if (mode == 'line') {
                setMode(null);
              } else {
                setMode('line');
              }
            }}
          >
            <LuPencilLine />
          </ToggleGroupItem>
          <ToggleGroupItem
            value='rect'
            onClick={() => {
              if (mode == 'rect') {
                setMode(null);
              } else {
                setMode('rect');
              }
            }}
          >
            <BiRectangle />
          </ToggleGroupItem>
          <ToggleGroupItem
            value='flag'
            onClick={() => {
              if (mode == 'flag') {
                setMode(null);
              } else {
                setMode('flag');
              }
            }}
          >
            <IoFlagOutline />
          </ToggleGroupItem>
        </ToggleGroup>
        <div className='fixed z-0'>
          <p className='ml-40 mt-1 text-lg text-green-600 font-bold'>{text}</p>
        </div>
        <canvas
          className='w-[1000px]'
          ref={canvasRef}
          onContextMenu={handleContextMenu}
          onMouseOut={handleMouseUp}
        />
      </div>
    </div>
  );
};

export default NonSRImage;
