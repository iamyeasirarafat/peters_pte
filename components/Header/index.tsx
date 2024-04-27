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
      className={`px-1 ${
        headerStyle ? "md:bg-background dark:bg-n-2 bg-transparent" : ""
      }`}
    >
      <div className="flex items-center">
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
          <Create />
        </div>
      </div>
    </header>
  );
};

export default Header;
