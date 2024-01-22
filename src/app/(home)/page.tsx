'use client';

import MiniMap from '@/components/MiniMap';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { GrMapLocation } from 'react-icons/gr';

const Dashboard = () => {
  const router = useRouter();

  return (
    <main className='p-6 w-full'>
      <header className=''>
        <div className='font-black text-2xl'>Dashboard</div>
        <div className='h-4' />
        <Button className='px-6' size={'default'}>
          새로고침
        </Button>
        <div className='h-4' />

        <Separator className='bg-slate-300 dark:bg-slate-700' />
      </header>
      <article className='py-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
        <Card>
          <CardHeader>
            <CardTitle className='flex gap-2'>
              <GrMapLocation />
              JEJU-MiniMap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MiniMap />
          </CardContent>
          <CardFooter className='flex justify-end'>
            <Button
              onClick={() => {
                router.push('/map');
              }}
            >
              크게보기
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Super Resolution</CardTitle>
          </CardHeader>
          <CardContent>준비중..</CardContent>
          <CardFooter className='flex justify-end'>
            <Button>시작하기</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Segmentation</CardTitle>
          </CardHeader>
          <CardContent>준비중..</CardContent>
          <CardFooter className='flex justify-end'>
            <Button>시작하기</Button>
          </CardFooter>
        </Card>
      </article>
    </main>
  );
};

export default Dashboard;
