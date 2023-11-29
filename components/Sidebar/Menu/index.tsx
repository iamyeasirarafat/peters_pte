import Icon from "@/components/Icon";
import Link from "next/link";
import { useRouter } from "next/router";

import { navigation, adminNavigation } from "@/constants/navigation";
import { twMerge } from "tailwind-merge";

type MenuProps = {
  visible?: boolean;
};

const Menu = ({ visible }: MenuProps) => {
  const router = useRouter();

  return (
    <>
      <div
        className={`mb-3 overflow-hidden whitespace-nowrap text-xs font-medium text-white/50 ${
          visible ? "w-full opacity-100" : "xl:w-0 xl:opacity-0"
        }`}
      >
        {router?.asPath?.includes("admin") ? "Navigation" : "Dhaka PTE"}
      </div>
      <SingleMenu
        router={router}
        visible
        menu={router?.asPath?.includes("admin") ? adminNavigation : navigation}
      />
    </>
  );
};

export default Menu;
type MenuType = {
  router: any;
  visible: boolean;
  menu: any;
};
const SingleMenu = ({ router, visible, menu }: MenuType) => {
  return (
    <div className="-mx-4 mb-10">
      {menu.map((link: any, index: number) => (
        <Link
          className={twMerge(
            `flex items-center h-9.5 mb-2 px-4 text-sm text-white fill-white font-bold last:mb-0 transition-colors hover:bg-[#161616] ${
              router.pathname === link.url && "bg-[#161616] text-primary"
            } ${visible ? "text-sm" : "xl:text-0"}`
          )}
          href={link.url}
          key={index}
        >
          <Icon
            className={`mr-3 ${
              router.pathname === link.url ? "fill-primary" : "fill-inherit"
            }  ${visible ? "mr-3" : "xl:mr-0"}`}
            name={link.icon}
          />
          {link.title}
          {link.counter && (
            <div
              className={`min-w-[1.625rem] ml-auto px-1 py-0.25 text-center text-xs font-bold text-n-1 ${
                visible ? "block" : "xl:hidden"
              }`}
              style={{
                backgroundColor: "#F2B277",
              }}
            >
              {link.counter}
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};
