import Layout from "@/components/Layout";
import { BiSolidDownload } from "react-icons/bi";
function Template() {
  return (
    <Layout title="Template">
      <p className="text-lg font-extrabold mb-2">Template File</p>
      {/* file */}
      <div className="px-5 py-6 bg-white dark:bg-black flex items-center justify-between">
        <p className="text-sm font-bold">Read Aloud</p>
        <button>
          <BiSolidDownload className="text-xl" />
        </button>
      </div>
    </Layout>
  );
}

export default Template;
