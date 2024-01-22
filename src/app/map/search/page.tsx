'use client';

import SearchContextMenu from '@/components/SearchContextMenu';
import SearchDialog from '@/components/SearchDialog';
import SegYDialog from '@/components/SegYDialog';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { TbWorldSearch } from 'react-icons/tb';

const Map = () => {
  const canvasRef = useRef(null);
  const router = useRouter();
  const [hover, setHover] = useState<number>(-1);
  const [clickIndex, setClickIndex] = useState<number>(-1);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openDialog2, setOpenDialog2] = useState<boolean>(false);
  const parking_list = [70, 194, 220, 248, 271, 394];

  let [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

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
    setHover(-1);
  };

  // 오른쪽 클릭 이벤트를 막는 핸들러 함수
  const handleContextMenu = (e: any) => {
    // 기본 동작 방지
    e.preventDefault();
  };

  return (
    <div className='w-full p-6'>
      <SearchDialog
        index={clickIndex}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        position={position}
      />
      <SegYDialog
        index={clickIndex}
        openDialog={openDialog2}
        setOpenDialog={setOpenDialog2}
      />
      <header className=''>
        <h1 className='font-black text-4xl'>JEJU-SEARCH</h1>
        <p className='text-sm text-slate-700 dark:text-slate-400'></p>
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
      <div className='flex w-full'>
        <div
          className=' overflow-auto mt-16 scrollbar relative grid min-w-[700px] max-w-[1000px]'
          style={{ gridTemplateColumns: 'repeat(24, minmax(0, 1fr))' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseOut={handleMouseUp}
        >
          {Array.from({ length: 450 }).map((_, index) => {
            let position = {
              x: (index % 25) * 1000,
              y: Math.floor(index / 25) * 1000,
            };

            return (
              <>
                {(index + 1) % 25 === 0 ? null : (
                  <SearchContextMenu
                    index={index}
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    openDialog2={openDialog2}
                    setOpenDialog2={setOpenDialog2}
                  >
                    <div className='relative'>
                      <Image
                        src={`/PNG/${index}.png`}
                        alt='image'
                        width={50}
                        height={50}
                        onMouseOver={() => {
                          // console.log(position);
                          setPosition(position);
                          setClickIndex(index);
                          setHover(index);
                        }}
                      />
                      {parking_list.includes(index) ? (
                        <div className='absolute top-1/2 left-1/2  w-1 h-1 rounded-full bg-red-600' />
                      ) : null}
                    </div>
                  </SearchContextMenu>
                )}
              </>
            );
          })}
        </div>
        <aside className='p-4'>
          <Card className='w-[500px] m-auto'>
            <CardHeader>
              <CardTitle className='flex gap-2'>
                <TbWorldSearch />
                이미지 확대 미리보기
              </CardTitle>
              <CardDescription>
                이미지 확대사진을 미리 볼 수 있습니다. 원하시는 부분에 마우스를
                가져 다 주세요. 그리고 원하는 부분에 마우스 오른쪽 클릭을 하여
                더 다양한 기능을 사용할 수 있습니다.
              </CardDescription>
            </CardHeader>
            <CardContent className='mt-4'>
              <div>
                {hover === -1 ? null : (
                  <Image
                    src={`/PNG/${hover}.png`}
                    alt='image'
                    width={1000}
                    height={1000}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
};

export default Map;
