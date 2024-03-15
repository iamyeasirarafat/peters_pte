import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "@/components/Image";
import Sidebar from "@/components/Sidebar";
import { getUser } from "@/redux/slice/userSlice";
import Head from "next/head";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import Menu from "./Menu";
type LayoutProps = {
  background?: boolean;
  back?: boolean;
  title?: string;
  children: React.ReactNode;
};

const Layout = ({ background, back, title, children }: LayoutProps) => {
  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <>
      <Head>
        <title>Peters PTE</title>
      </Head>
      <div className="w-full flex">
        <Sidebar />
        <div className="flex flex-col w-full px-2 md:px-10 mt-3">
          <Header back={back} title={title} />
          <div className="flex flex-col  overflow-y-auto scroll-smooth h-[calc(100vh-80px)] grow w-full mt-2">
            {children}
            <Footer />
          </div>
          {background && (
            <div className="absolute inset-0 -z-1 overflow-hidden pointer-events-none dark:opacity-70">
              <div className="absolute z-1 inset-0 bg-n-1 opacity-0 dark:opacity-80"></div>
              <div className="absolute top-1/2 left-[40vw] -translate-y-[72%] w-[85vw] rotate-180 4xl:w-[85rem] xl:left-[30vw] xl:-top-[20rem] xl:w-[60rem] xl:-translate-y-0 md:-top-[13rem] md:left-[15vw] md:w-[40rem]">
                <Image
                  className="w-full"
                  src="/images/bg.svg"
                  width={1349}
                  height={1216}
                  alt=""
                />
              </div>
            </div>
          )}
        </div>
        <Menu />
      </div>
    </>
  );
};

export default Layout;
