import Icon from "@/components/Icon";
import Image from "@/components/Image";
import Logo from "@/components/Logo";
import Link from "next/link";
import { use, useState } from "react";
import Menu from "./Menu";
import { useSelector } from "react-redux";
import { MdLogout } from "react-icons/md";
import { Logout } from "@/utils/Logout";
import { useRouter } from "next/router";

type SidebarProps = {};

const Sidebar = ({}: SidebarProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [showUserDialog, setShowUserDialog] = useState<boolean>(false);
  const user = useSelector((state: any) => state.user?.user);

  return (
    <div
      className={`fixed top-0 left-0 bottom-0 flex flex-col w-[18.75rem] pt-6 px-8 pb-4.5 bg-n-1 overflow-auto scroll-smooth xl:z-30 md:hidden ${
        visible ? "w-[18.75rem]" : "xl:w-20"
      }`}
    >
      <div className="flex justify-between items-center h-[1.625rem] mb-11">
        <Logo className={visible ? "flex" : "xl:hidden"} light />
        <button className="hidden xl:flex" onClick={() => setVisible(!visible)}>
          <Icon className="fill-white" name={visible ? "close" : "burger"} />
        </button>
      </div>
      <Menu visible={visible} />
      <div
        className={`flex items-center h-18 mt-auto mx-0 pt-10 ${
          visible ? "mx-0" : "xl:-mx-4"
        } relative`}
      >
        <Link
          className={`inline-flex items-center font-bold text-white text-sm transition-colors hover:text-purple-1 ${
            visible ? "mx-0 text-sm" : "xl:mx-auto xl:text-0"
          }`}
          href="#"
        >
          <div
            className={`relative w-5.5 h-5.5 mr-2.5 rounded-full overflow-hidden ${
              visible ? "mr-2.5" : "xl:mr-0"
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
          className={`btn-transparent-light btn-square btn-small ml-auto ${
            visible ? "flex" : "xl:hidden"
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
