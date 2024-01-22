import { IconType } from "react-icons";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active,
  href,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `
    flex
    flex-row
    h-auto
    items-center
    w-full
    gap-x-2
    text-sm
    font-medium
    cursor-pointer
    px-4
    py-4

    hover:bg-slate-300
    dark:hover:bg-slate-700

    text-neutral-500
    hover:text-neutral-700

    dark:hover:text-neutral-300
    transition
    dark:text-neutral-400
    
  
    `,
        active &&
          "text-primary hover:text-primary dark:text-primary dark:hover:text-primary"
      )}
    >
      <Icon size={26} />
      <p className="truncate w-full">{label}</p>
    </Link>
  );
};

export default SidebarItem;
