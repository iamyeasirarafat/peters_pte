"use client";

import { useRouter, useSearchParams } from "next/navigation";

const Index = () => {
  const router = useRouter();
  const params = useSearchParams();
  console.log(params.get("id"));
  return <>hello worlds</>;
};
export default Index;
