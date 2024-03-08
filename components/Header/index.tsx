import Icon from "@/components/Icon";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { useRouter } from "next/router";
import { useState } from "react";
import Create from "./Create";

type HeaderProps = {
  back?: boolean;
  title?: string;
};

const Header = ({ back, title }: HeaderProps) => {
  const [headerStyle, setHeaderStyle] = useState<boolean>(false);
  const router = useRouter();

  useScrollPosition(({ currPos }) => {
    setHeaderStyle(currPos.y <= -1);
  });

  return (
    <header
      className={`md:fixed top-0 right-0  z-20   left-0 relative  ${headerStyle ? "md:bg-background dark:bg-n-2 bg-transparent" : ""
        }`}
    >
      <div className="flex items-center max-w-[90rem] m-auto w-full h-18 2xl:px-16 lg:px-8 md:px-6 px-5">
        {back && (
          <button
            className="btn-stroke border btn-square btn-medium shrink-0 mr-6 2xl:mr-4 md:!w-6 md:h-6 md:mr-3"
            onClick={() => router.back()}
          >
            <Icon name="arrow-prev" />
          </button>
        )}
        {title && (
          <div className="md:mr-4 md:text-h3 truncate mr-2 text-h4 capitalize">
            {title.replaceAll("-", " ")}
          </div>
        )}
        <div className="flex items-center shrink-0 ml-auto">
          {/* <button className="btn-transparent-dark btn-square btn-medium mr-2 md:!w-6 md:h-6">
            <Icon name="search" />
          </button>
          <button className="btn-transparent-dark btn-square btn-medium relative mr-2 md:w-6 md:h-6">
            <Icon name="notification" />
            <div className="absolute top-1.5 right-[0.5625rem] w-2 h-2 border border-white rounded-full bg-green-1 md:top-0.5 md:right-[0.5rem] dark:border-n-2"></div>
          </button> */}
          <Create />
          {/* <button
            onClick={() => Logout()}
            className="btn btn-medium
            "
          >
            Log Out <MdLogout className="text-xl" />
          </button> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
