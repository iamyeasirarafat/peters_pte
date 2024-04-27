import Image from "@/components/Image";
import { useColorMode } from "@chakra-ui/color-mode";
import Link from "next/link";

type TestProps = {
  className?: string;
  light?: boolean;
};

const Test = ({ className, light }: TestProps) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  return (
    <Link className={`flex w-[7.125rem] ${className}`} href="/">
      <Image
        className="w-full h-auto"
        // src={
        //     light
        //         ? "/images/logo-light.svg"
        //         : isDarkMode
        //         ? "/images/logo-light.svg"
        //         : "/images/logo-dark.svg"
        // }
        src="/logo.png"
        width={113}
        height={25}
        alt="Peters_pte"
        priority
      />
    </Link>
  );
};

export default Test;
