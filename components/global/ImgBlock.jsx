import Image from "next/image";

const ImgBlock = ({ data }) => {
  console.log("data", data);
  return (
    <div className="border border-primary flex max-h-80 justify-center rounded-[15px] p-2 md:p-4">
      <Image
        src={data?.image?.startsWith("/") ? `${process.env.NEXT_PUBLIC_API_URL}${data?.image}` : data?.image || ""}
        alt="Describe Image"
        height={800}
        width={500}
      />

    </div>
  );
};

export default ImgBlock;
