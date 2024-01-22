import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/providers/theme-provider';
import LeftSidebar from '@/components/side/left-sidebar';

const font = Roboto({ subsets: ['latin'], weight: ['300'] });

export const metadata: Metadata = {
  title: 'Jeju-Platform',
  description: 'this is jeju-platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body className={font.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <div className='flex'>
            <LeftSidebar />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
