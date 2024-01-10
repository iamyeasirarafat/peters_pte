import Icon from "@/components/Icon";
import Link from "next/link";
import { useRouter } from "next/router";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";
import axios from "axios";

type MenuProps = {
  visible?: boolean;
};

const Menu = ({ visible }: MenuProps) => {
  const [saNavCount, setSaNavCount] = useState<any>(0);
  const [orgNavCount, setOrgNavCount] = useState<any>(0);
  const router = useRouter();

  console.log("orgNavCount", orgNavCount);
  useEffect(() => {
    const getCount = async () => {
      const res = await axios.get("/sidebar/count");
      router?.asPath?.startsWith("/admin") && setSaNavCount(res.data);
      router?.asPath?.startsWith("/organization") && setOrgNavCount(res.data);
    };
    getCount();
  }, [router?.asPath]);
  const adminNavigation: {
    title: string;
    icon: string;
    counter?: number;
    url: string;
  }[] = [
    {
      title: "Dashboard",
      icon: "dashboard",
      url: "/admin",
    },
    {
      title: "Students",
      icon: "students",
      counter: saNavCount?.student || 0,
      url: "/admin/students",
    },
    {
      title: "Organization",
      icon: "organization",
      counter: saNavCount?.organization || 0,
      url: "/admin/organization",
    },
    {
      title: "Exam Calendar",
      icon: "calendar",
      // counter: 28,
      url: "/admin/exam-calendar",
    },
    {
      title: "Reports",
      icon: "report2",
      url: "/admin/reports",
    },
    {
      title: "Billing & Plan",
      icon: "bill",
      counter: saNavCount?.plan || 0,
      url: "/admin/billing-plan",
    },
    {
      title: "Promotion",
      icon: "campaign",
      counter: saNavCount?.promotion || 0,
      url: "/admin/promotion",
    },
    {
      title: "Practice Question",
      icon: "question",
      counter: saNavCount?.practice || 0,
      url: "/admin/practice-question",
    },
    {
      title: "Mocktest",
      icon: "help",
      counter: saNavCount?.mocktest || 0,
      url: "/admin/mocktest",
    },
    {
      title: "Discussion",
      icon: "discussion",
      counter: saNavCount?.discussion || 0,
      url: "/admin/discussion",
    },
    {
      title: "Study Material",
      icon: "book",
      counter: saNavCount?.study_material || 0,
      url: "/admin/study-material",
    },
    {
      title: "Admin User",
      icon: "person",
      counter: saNavCount?.admin_user || 0,
      url: "/admin/admin-user",
    },
  ];
  const orgNavigation: {
    title: string;
    icon: string;
    counter?: number;
    url: string;
  }[] = [
    {
      title: "Dashboard",
      icon: "dashboard",
      url: "/organization",
    },
    {
      title: "Students",
      icon: "students",
      counter: orgNavCount?.student || 0,
      url: "/organization/students",
    },
    {
      title: "Exam Calendar",
      icon: "calendar",
      url: "/organization/calender",
    },
    {
      title: "Reports",
      icon: "report2",
      url: "/organization/reports",
    },
    {
      title: "Billing & Bluk Account",
      icon: "bill",
      counter: orgNavCount?.plan || 0,
      url: "/organization/billing-payment",
    },
    {
      title: "Prediction",
      icon: "prediction",
      counter: orgNavCount?.prediction || 0,
      url: "/organization/prediction",
    },
    {
      title: "Template",
      icon: "template",
      counter: orgNavCount?.template || 0,
      url: "/organization/template",
    },
    {
      title: "Study Material",
      icon: "book",
      counter: orgNavCount?.study_material || 0,
      url: "/organization/study-material",
    },
  ];

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
        menu={
          router?.asPath?.includes("admin") ? adminNavigation : orgNavigation
        }
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
