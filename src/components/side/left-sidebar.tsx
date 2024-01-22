'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';
import { MdOutlineDashboard } from 'react-icons/md';
import { IoColorPaletteOutline } from 'react-icons/io5';
import SidebarItem from './SidebarItem';
import { ModeToggle } from '../ModeToggle';
import { TbMapSearch } from 'react-icons/tb';
import { GrMapLocation } from 'react-icons/gr';
import Image from 'next/image';

interface LeftSidebarProps {
  className?: string;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ className }) => {
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: MdOutlineDashboard,
        label: 'Dashboard',
        active: pathname === '/',
        href: '/',
      },
      {
        icon: GrMapLocation,
        label: 'Map',
        active: pathname === '/map',
        href: '/map',
      },
      {
        icon: TbMapSearch,
        label: 'MapSearch',
        active: pathname === '/map/search',
        href: '/map/search',
      },
    ],
    [pathname]
  );

  return (
    <div className={cn('flex', className)}>
      <div className='flex flex-col gap-y-2 h-screen w-[250px] border-r bg-slate-200 dark:bg-slate-900 '>
        <div className='flex flex-col gap-y-2 py-4 text-medium text-sm'>
          <section className='px-4 flex items-center gap-x-4'>
            {/* <IoLogoIonitron size={60} className="text-blue-400" /> */}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='1em'
              height='1em'
              viewBox='0 0 64 64'
              className='text-5xl'
            >
              <path fill='#42ade2' d='M0 47h64v17H0z'></path>
              <path
                fill='#2b95bf'
                d='M0 52.4s3.6.1 7.5 1.6C11 55.4 17 57.6 20 57.6c.7 0 2.4-.5 2.4-.5s9.1 2.6 12.6 2.4c.9 0 2.7-.9 2.7-.9s1.1.1 1.4 0c1.1-.2 2.3-1.1 3.3-1.3c.9-.2 3-.1 3.8-.3c.9-.2 2.6-1.4 2.6-1.4s2.4 0 3.2-.1c.8-.1 2.8-.5 2.8-.5s2.6.3 3.5.3c1.4 0 5.6-.6 5.6-.6V47H0z'
              ></path>
              <path
                fill='#77994f'
                d='M0 28.3s3.6-.3 7.5-5.4C11 18.3 17 10.5 20 10.4c.7 0 2.4 1.9 2.4 1.9S31.5 3.4 34.9 4c.9.2 2.7 3.2 2.7 3.2s1.1-.2 1.4 0c1.1.6 2.3 3.7 3.3 4.4c.9.6 3 .3 3.8 1.1c.9.8 2.6 4.7 2.6 4.7s2.4.1 3.2.4c.8.3 2.8 1.9 2.8 1.9s2.6-1 3.5-.9c1.4.1 5.6 2.1 5.6 2.1V47H0z'
              ></path>
              <g fill='#8bce4a'>
                <path d='m56.3 32.4l-7.4-15.1c2.1 5.3 1 13.9 7.4 15.1m-1.4-12.8s.9 5.9 5.6 7.5zM18.9 47L16 36.4l3.7 1.5l-2.9-7.6h4.6L19 22.4l3-1.2l2-3.8l-1.7-5.1l6 11.7l9 11.8l7.3 7l7.5 1.9l4.2 2.3z'></path>
                <path d='m37.7 7.2l.9 7.8l2.5 5h-1.7l5.6 7.8l-3.7-1.6l2.9 8.4l5.6 4.2l-2.1 1.6l6.3 3.3l3.9 3.3H64v-2.8l-6.7-3.4l-1.6-1.6l-1.2 1.2l-5.6-9.7l-5.6-12.9l-2.3-3.5z'></path>
              </g>
              <path fill='#dbf763' d='M42.2 47H0v-6.6z'></path>
              <path fill='#1d8299' d='M42.2 47H0v3.1z'></path>
              <path
                fill='#b4d7ee'
                d='M5 48.9c1.7-.3 3.1.9 4.8 0c1.9-.9 3.2.4 5 .7c-1.7.3-3.1-.9-4.8 0c-1.9.9-3.2-.3-5-.7m47.6 3.9c1.7-.3 3.1.9 4.8 0c1.9-.9 3.2.4 5 .7c-1.7.3-3.1-.9-4.8 0c-1.9.9-3.2-.3-5-.7m-37.3 0c1.6-.3 2.9.4 4.5.6c1.8.2 3.2-.4 4.9-.9c3.1-1.1 5.4 1 8.3 1.6c-1.6.3-2.9-.4-4.5-.6c-1.8-.2-3.2.4-4.9.9c-3.1 1.1-5.4-1-8.3-1.6m19.6 4.5c1.6-.3 2.9.4 4.5.6c1.8.2 3.2-.4 4.9-.9c3.1-1.1 5.4 1 8.3 1.6c-1.6.4-2.9-.4-4.5-.6c-1.8-.2-3.2.4-4.9.9c-3.1 1.1-5.4-1-8.3-1.6m3.7-8.5c2.4-.3 4.5 1.4 6.9.2c2.7-1.2 4.6.5 7.1.9c-2.4.3-4.5-1.4-6.9-.2c-2.6 1.2-4.5-.6-7.1-.9m9.5 12.3c2.4-.3 4.5 1.4 6.9.2c2.7-1.2 4.6.5 7.1.9c-2.4.3-4.5-1.4-6.9-.2c-2.6 1.2-4.5-.6-7.1-.9m-44.5-.8c2.4-.3 4.5 1.4 6.9.2c2.6-1.2 4.6.5 7.1.9c-2.4.3-4.5-1.4-6.9-.2c-2.6 1.2-4.5-.5-7.1-.9'
              ></path>
            </svg>
            <div className='text-lg'>
              <p className='font-bold'>Jeju-Platform</p>
            </div>
          </section>
          <div className='h-6' />
          <section className='flex items-center gap-x-2 px-4'>
            <div className='flex-1 flex items-center gap-x-2'>
              <IoColorPaletteOutline size={26} />
              <p className='truncate'>Theme</p>
            </div>

            <div className=''>
              <ModeToggle />
            </div>
          </section>
          <div className='px-4 my-2'>
            <Separator className='bg-slate-300 dark:bg-slate-700' />
          </div>

          <section>
            {routes.map((item: any) => {
              return <SidebarItem key={item.label} {...item} />;
            })}
          </section>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
