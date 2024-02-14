import Link from "next/link";
import Icon from "@/components/Icon";
import ToggleTheme from "./ToggleTheme";

const navigations = [
  {
    title: "Privacy Policy",
    url: "/",
  },
  {
    title: "License",
    url: "/",
  },
  {
    title: "API",
    url: "/",
  },
];

type FooterProps = {};

const Footer = ({}: FooterProps) => (
  <footer className="">
    <div className="flex items-center justify-end h-16 px-16 max-w-[90rem] mx-auto 2xl:px-8 lg:px-6 md:px-5">
      <ToggleTheme />
    </div>
  </footer>
);

export default Footer;
