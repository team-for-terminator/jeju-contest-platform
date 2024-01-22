import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IoIosImage, IoIosImages } from 'react-icons/io';
import SegYImage from './SegYImage';
import ParkingImage from './ParkingImage';

const SegYDialog = ({
  openDialog,
  setOpenDialog,
  index,
}: {
  openDialog: boolean;
  setOpenDialog: any;
  index: number;
}) => {
  const parking_list = [70, 194, 220, 248, 271, 394];

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open === false) {
          setOpenDialog(false);
        }
      }}
      open={openDialog}
    >
      <DialogContent className='h-[900px]'>
        <Tabs defaultValue='nonSR' className='w-[750px] mt-4 m-auto'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='1' className='flex gap-2'>
              <IoIosImage size={20} />
              비상착륙구역
            </TabsTrigger>
            <TabsTrigger
              value='2'
              className='flex gap-2'
              disabled={!parking_list.includes(index)}
            >
              <IoIosImages size={20} />
              주차가능구역
            </TabsTrigger>
          </TabsList>
          <TabsContent value='1'>
            <SegYImage index={index} />
          </TabsContent>
          <TabsContent value='2'>
            <ParkingImage index={index} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SegYDialog;
