import Layout from "@/components/Layout";
import { BiSolidDownload } from "react-icons/bi";
function Prediction() {
  return (
    <Layout title="Prediction">
      <p className="text-lg font-extrabold mb-2">Prediction File</p>
      {/* file */}
      <div className="px-5 py-6 bg-white dark:bg-black flex items-center justify-between">
        <p className="text-sm font-bold">File Prediction 05/25/23</p>
        <button>
          <BiSolidDownload className="text-xl" />
        </button>
      </div>
    </Layout>
  );
}

export default Prediction;
