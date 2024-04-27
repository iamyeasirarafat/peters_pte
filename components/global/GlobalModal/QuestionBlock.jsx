import ButtonFill from "@/components/global/ButtonFill";
import ButtonOutline from "@/components/global/ButtonOutline";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const QuestionBlock = ({ data, toggleModal }) => {
  // pushing id to search params
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const addParam = (event = ChangeEvent) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.delete("que_no");
    current.set("que_no", data.id);
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
    toggleModal();
  };
  return (
    <div
      onClick={addParam}
      className="flex items-center cursor-pointer justify-between border border-primary rounded-[13px] p-3"
    >
      <h2 className="text-xl font-medium">
        {data?.title} | #{data?.id}
      </h2>
      <div className="flex items-center gap-x-10">
        <div className="space-x-2">
          {data?.prediction && (
            <ButtonFill
              text="Prediction"
              bgColor={"cream"}
              textColor={"gray"}
            />
          )}
          {data?.practiced > 0 && (
            <ButtonFill
              text="Practiced"
              count={`(${data?.practiced})`}
              bgColor={"primary"}
              textColor={"gray"}
            />
          )}
          {data?.appeared > 0 && (
            <ButtonOutline
              text="Appeared"
              count={`(${data?.appeared})`}
              borderColor={"primary"}
              textColor={"gray"}
            />
          )}
        </div>
        <div className="space-x-5">
          <button>
            <div className="w-[28px] h-[29px]">
              <div className="w-full h-full relative">
                <Image
                  className="object-cover"
                  src="/icons/Book_mark.svg"
                  fill
                  alt="bookmark"
                />
              </div>
            </div>
          </button>
          <button>
            <div className="w-[17px] h-[28px]">
              <div className="w-full h-full relative">
                <Image
                  className="object-cover"
                  src="/icons/bookmark_primary.svg"
                  fill
                  alt="bookmark"
                />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionBlock;
