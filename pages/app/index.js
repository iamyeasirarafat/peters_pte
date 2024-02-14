import { useRouter } from "next/router";
import DashboardLayout from "./layout";
import { useEffect } from "react";

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/auth");
  }, [router]);
  return (
    <DashboardLayout>
      <h2 className="text-2xl dark:text-white text-black">app</h2>
    </DashboardLayout>
  );
};

export default Index;
