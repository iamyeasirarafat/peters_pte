import Icon from "@/components/Icon";
import Image from "@/components/Image";
import Logo from "@/components/Logo";
import { Logout } from "@/utils/Logout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { MdLogout } from "react-icons/md";
import { useSelector } from "react-redux";
import Menu from "./Menu";

type SidebarProps = {};

const Sidebar = ({ }: SidebarProps) => {
  const [visible, setVisible] = useState<boolean>(true);
  const [showUserDialog, setShowUserDialog] = useState<boolean>(false);
  const user = useSelector((state: any) => state.user?.user);
  const router = useRouter();

  return (
    <div
      className={`xl:flex hidden flex-col w-[18.75rem] pt-6 px-8 pb-4.5 bg-n-1 h-screen ${visible ? "w-[18.75rem]" : "w-20"
        }`}
    >
      <div className="flex justify-between items-center h-[1.625rem] mb-11">
        <Logo className={visible ? "flex" : "xl:flex"} light />
        <button onClick={() => setVisible(!visible)} className="hidden xl:flex">
          <Icon className="fill-white" name={visible ? "close" : "burger"} />
        </button>
      </div>
      <Menu visible={visible} />
      <div
        className={`flex items-center h-18 mt-auto mx-0 pt-10 ${visible ? "mx-0" : "xl:-mx-4"
          } relative`}
      >
        <Link
          className={`inline-flex items-center font-bold text-white text-sm transition-colors hover:text-purple-1 ${visible ? "mx-auto text-0" : "xl:mx-0 xl:text-sm"
            }`}
          href={
            router?.asPath?.startsWith("/admin")
              ? "/admin/profile"
              : "/organization/profile"
          }
        >
          <div
            className={`relative w-5.5 h-5.5 mr-2.5 rounded-full overflow-hidden ${visible ? "mr-2.5" : "xl:mr-0"
              }`}
          >
            <Image
              className="object-cover scale-105"
              src={user?.picture || "/images/avatars/avatar.jpg"}
              fill
              alt="Avatar"
            />
          </div>
          <span className="capitalize">{user?.full_name}</span>
        </Link>
        <button
          onClick={() => setShowUserDialog(!showUserDialog)}
          className={`btn-transparent-light btn-square btn-small ml-auto ${visible ? "flex" : "xl:hidden"
            }`}
        >
          <Icon name="dots" />
        </button>
        {showUserDialog && <UserDialog setShowUserDialog={setShowUserDialog} />}
      </div>
    </div>
  );
};

export default Sidebar;

const UserDialog = ({ setShowUserDialog }: any) => {
  const router = useRouter();
  return (
    <div className=" bg-white dark:bg-black rounded-md py-2 px-7 absolute bottom-10 left-0 w-full">
      <Link
        onClick={() => setShowUserDialog(false)}
        href={
          router?.asPath?.startsWith("/admin")
            ? "/admin/profile"
            : "/organization/profile"
        }
        className="flex items-center gap-x-3 py-2 hover:text-primary duration-200"
      >
        <Icon name="settings" />
        <span className="text-sm font-bold">Profile Settings</span>
      </Link>
      <button
        onClick={() => Logout()}
        className="flex items-center gap-x-4 py-2 w-full hover:text-red duration-200"
      >
        <MdLogout className="text-xl" /> Log Out
      </button>
    </div>
  );
};
