// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import SRImage from './SRImage';
// import { Card, CardContent } from './ui/card';
// import NonSRImage from './NonSRImage';
// import SegImage from './SegImage';
// import { IoIosImage, IoIosImages } from 'react-icons/io';

// const DialogButton = ({
//   children,
//   index,
// }: {
//   children: React.ReactNode;
//   index?: number;
// }) => {
//   return (
//     <Dialog onOpenChange={(open) => {
//       if (open === false) {}
//     }}>
//       <DialogTrigger
//         onClick={(e) => {
//           e.stopPropagation();
//         }}
//       >
//         {children}
//       </DialogTrigger>
//       <DialogContent className='h-[900px]'>
//         <Tabs defaultValue='nonSR' className='w-[750px] mt-4 m-auto'>
//           <TabsList className='grid w-full grid-cols-2'>
//             <TabsTrigger value='1' className='flex gap-2'>
//               <IoIosImage size={20} />
//               싱글이미지
//             </TabsTrigger>
//             <TabsTrigger value='2' className='flex gap-2'>
//               <IoIosImages size={20} />
//               이미지비교
//             </TabsTrigger>
//           </TabsList>
//           <TabsContent value='1'>
//             <Tabs defaultValue='nonSR' className='w-[750px] mt-4'>
//               <TabsList className='grid w-full grid-cols-3'>
//                 <TabsTrigger value='nonSR'>이미지(1000x1000)</TabsTrigger>
//                 <TabsTrigger value='SR'>증강이미지(4000x4000)</TabsTrigger>
//                 <TabsTrigger value='seg'>세그멘테이션(1000x1000)</TabsTrigger>
//               </TabsList>
//               <TabsContent value='nonSR'>
//                 <Card>
//                   <CardContent className='space-y-2'>
//                     <NonSRImage index={index} />
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//               <TabsContent value='SR'>
//                 <Card>
//                   <CardContent className='space-y-2'>
//                     <SRImage index={index} />
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//               <TabsContent value='seg'>
//                 <Card>
//                   <CardContent className='space-y-2'>
//                     <SegImage index={index} />
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//             </Tabs>
//           </TabsContent>
//           <TabsContent value='2' className='absolute left-10'>
//             <div className='flex gap-4 m-auto'>
//               <Tabs defaultValue='nonSR' className='w-[750px] mt-4'>
//                 <TabsList className='grid w-full grid-cols-3'>
//                   <TabsTrigger value='nonSR'>이미지(1000x1000)</TabsTrigger>
//                   <TabsTrigger value='SR'>증강이미지(4000x4000)</TabsTrigger>
//                   <TabsTrigger value='seg'>세그멘테이션(1000x1000)</TabsTrigger>
//                 </TabsList>
//                 <TabsContent value='nonSR'>
//                   <Card>
//                     <CardContent className='space-y-2'>
//                       <NonSRImage index={index} />
//                     </CardContent>
//                   </Card>
//                 </TabsContent>
//                 <TabsContent value='SR'>
//                   <Card>
//                     <CardContent className='space-y-2'>
//                       <SRImage index={index} />
//                     </CardContent>
//                   </Card>
//                 </TabsContent>
//                 <TabsContent value='seg'>
//                   <Card>
//                     <CardContent className='space-y-2'>
//                       <SegImage index={index} />
//                     </CardContent>
//                   </Card>
//                 </TabsContent>
//               </Tabs>
//               <Tabs defaultValue='nonSR' className='w-[750px] mt-4'>
//                 <TabsList className='grid w-full grid-cols-3'>
//                   <TabsTrigger value='nonSR'>이미지(1000x1000)</TabsTrigger>
//                   <TabsTrigger value='SR'>증강이미지(4000x4000)</TabsTrigger>
//                   <TabsTrigger value='seg'>세그멘테이션(1000x1000)</TabsTrigger>
//                 </TabsList>
//                 <TabsContent value='nonSR'>
//                   <Card>
//                     <CardContent className='space-y-2'>
//                       <NonSRImage index={index} />
//                     </CardContent>
//                   </Card>
//                 </TabsContent>
//                 <TabsContent value='SR'>
//                   <Card>
//                     <CardContent className='space-y-2'>
//                       <SRImage index={index} />
//                     </CardContent>
//                   </Card>
//                 </TabsContent>
//                 <TabsContent value='seg'>
//                   <Card>
//                     <CardContent className='space-y-2'>
//                       <SegImage index={index} />
//                     </CardContent>
//                   </Card>
//                 </TabsContent>
//               </Tabs>
//             </div>
//           </TabsContent>
//         </Tabs>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default DialogButton;
