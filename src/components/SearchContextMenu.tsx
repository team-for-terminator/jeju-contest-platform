import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

export default function SearchContextMenu({
  children,
  index,
  openDialog,
  setOpenDialog,
  openDialog2,
  setOpenDialog2,
}: {
  children: React.ReactNode;
  index?: number;
  openDialog: boolean;
  setOpenDialog: any;
  openDialog2: boolean;
  setOpenDialog2: any;
}) {
  return (
    <ContextMenu>
      <ContextMenuTrigger className=''>{children}</ContextMenuTrigger>
      <ContextMenuContent className='w-64'>
        <ContextMenuItem
          inset
          onClick={() => {
            setOpenDialog(true);
          }}
        >
          이미지비교
          <ContextMenuShortcut>⌘</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem
          inset
          onClick={() => {
            setOpenDialog2(true);
          }}
        >
          착륙구역
          <ContextMenuShortcut>⌘</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
