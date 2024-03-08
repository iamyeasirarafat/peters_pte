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

const Footer = ({ }: FooterProps) => (
  <footer className="">
    <div className="flex items-center justify-end h-16 2xl:px-16 max-w-[90rem] mx-auto lg:px-8 md:px-6 px-5">
      <ToggleTheme />
    </div>
  </footer>
);

export default Footer;
