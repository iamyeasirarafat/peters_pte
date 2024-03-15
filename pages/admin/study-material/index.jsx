import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsBookHalf, BsBroadcastPin } from "react-icons/bs";
import { MdContentCopy } from "react-icons/md";

const Index = () => {
  const [studyCount, setStudyCount] = useState({});
  useEffect(() => {
    const getStudyMaterial = async () => {
      const res = await axios.get(`/study_material/count`);
      setStudyCount(res?.data);
    };
    getStudyMaterial();
  }, []);

  const studyMaterials = [
    {
      name: "Prediction",
      count: studyCount?.prediction || 0,
      icon: <BsBroadcastPin />,
      url: "/admin/study-material/prediction",
    },
    {
      name: "Template",
      count: studyCount?.template || 0,
      icon: <MdContentCopy />,
      url: "/admin/study-material/template",
    },
    {
      name: "Study Material",
      count: studyCount?.study_material || 0,
      icon: <BsBookHalf />,
      url: "/admin/study-material/study_material",
    },
  ];
  return (
    <Layout title="Study Material">
      <p className="text-lg font-extrabold">Material Type</p>
      <div className="flex flex-col md:flex-row items-center justify-between gap-x-5 gap-y-3 mt-4">
        {studyMaterials?.map((item, i) => (
          <Link
            href={item?.url}
            key={i}
            className="w-full py-6 px-5 bg-white dark:bg-black flex items-center gap-x-5 cursor-pointer"
          >
            <p className="p-3.5 border border-black dark:border-white rounded-sm">
              {item?.icon}
            </p>
            <div>
              <p className="text-xl font-semibold">{item?.name}</p>
              <p className="text-sm">
                {item?.count} {parseInt(item?.count) > 1 ? "Files" : "File"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Index;
