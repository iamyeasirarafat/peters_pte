import Field from "@/components/Field";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import Sorting from "@/components/Sorting";
import { useHydrated } from "@/hooks/useHydrated";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useMediaQuery } from "react-responsive";
import { PhoneNumberInput } from "@/components/Students_list/Row";

const AdminUser = () => {
  const { mounted } = useHydrated();
  const isTablet = useMediaQuery({
    query: "(max-width: 1023px)",
  });
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState(12);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios("/adminusers");
      setData(res.data);
    };
    fetch();
  }, [status]);
  return (
    <Layout title="Admin User">
      <Toaster />
      <button onClick={() => setVisible(true)} className="btn-purple w-48 mb-2">
        Add Admin User
      </button>
      {mounted && isTablet ? (
        <div className="bg-white dark:bg-black">
          <AdminUserMobile data={data} />
        </div>
      ) : (
        <AdminUserList data={data} setStatus={setStatus} />
      )}
      <AddAdminUser {...{ visible, setVisible, setStatus }} />
    </Layout>
  );
};

export default AdminUser;

const AdminUserList = ({ data, setStatus }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white dark:bg-black w-full">
      <div className="flex items-center justify-between p-3">
        <div className="w-full flex items-center gap-x-2">
          <Sorting title="User name" />
        </div>
        <div className="w-full flex items-center gap-x-6 justify-between pr-14">
          <Sorting title="User Id" />
          <Sorting title="User mail" />
        </div>
      </div>
      <div>
        {data.map((item) => (
          <AdminUserRow
            setStatus={setStatus}
            key={item.id}
            data={item}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        ))}
      </div>
    </div>
  );
};

const AdminUserRow = ({ data, setStatus, isOpen, setIsOpen }) => {
  return (
    <div className="flex items-center justify-between p-3">
      <div className="w-full flex items-center gap-x-4">
        <Image
          className="w-9 h-9 rounded-full"
          src={data.picture || "/images/img-2.jpg"}
          width={50}
          height={50}
          alt="profile image"
        />
        <p className="text-sm font-bold">{data?.full_name}</p>
      </div>
      <div className="w-full flex items-center gap-x-6 justify-between">
        <p className="text-sm font-bold">{data?.profile.userid || "N/A"}</p>
        <div className="flex items-center gap-x-5">
          <p className="text-sm font-bold">{data?.email}</p>
          <div className="flex justify-center bg-gray-100 ">
            <div
              className="relative inline-block text-left"
              onClick={() => setIsOpen(isOpen === data.id ? null : data.id)}
            >
              <button className="btn-transparent-dark btn-small btn-square">
                <Icon name="dots" />
              </button>
              {isOpen === data.id && (
                <MoreButton data={data} setStatus={setStatus} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminUserMobile = ({ data }) => {
  return (
    <>
      {data?.map((item, index) => (
        <div key={index} className="flex items-center justify-between p-4">
          <div className="flex items-center gap-x-3 ">
            <Image
              className="w-9 h-9 rounded-full"
              src={item.picture || "/images/img-2.jpg"}
              width={50}
              height={50}
              alt=""
            />
            <div className="space-y-1">
              <p className="text-sm font-bold">
                {item?.profile.userid || "N/A"}
              </p>
              <p className="text-[#5F646D] dark:text-white text-sm font-medium">
                {item?.full_name}
              </p>
            </div>
          </div>
          <div className="text-right space-y-1">
            <button className="btn-transparent-dark btn-small btn-square">
              <Icon name="dots" />
            </button>
            <p className="text-[#5F646D] dark:text-white text-sm font-medium">
              {item?.email}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export const AddAdminUser = ({ visible, setVisible, setStatus }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({});

  const onSubmit = async (data) => {
    try {
      await axios.post("/adminuser/add", data);
      toast.success("Successfully added");
      setVisible(false);
      setStatus && setStatus(Math.random());
    } catch (err) {
      const key = Object.keys(err?.response?.data)[0];
      const value = err?.response?.data[key];
      toast.error(`${key} - ${value}`);
    }
  };

  return (
    <Modal
      title="Add Admin User"
      visible={visible}
      onClose={() => setVisible(false)}
    >
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <Field
          errors={errors}
          className="mb-4"
          label="User Name *"
          placeholder="Enter  name"
          required
          register={register}
          name="full_name"
        />
        <Field
          errors={errors}
          className="mb-4"
          label="User ID *"
          placeholder="Enter User ID"
          required
          register={register}
          name="userid"
        />
        <Field
          errors={errors}
          className="mb-4"
          label="Password *"
          placeholder="Enter Password"
          type="password"
          register={register}
          name="password"
          required
        />
        <Field
          errors={errors}
          className="mb-6"
          label="Email"
          placeholder="Enter email"
          type="email"
          required
          register={register}
          name="email"
        />
        <PhoneNumberInput
          label="Phone"
          name="phone"
          control={control}
          errors={errors}
        />
        <button className="btn-purple  w-full mt-6">Confirm</button>
      </form>
    </Modal>
  );
};

const MoreButton = ({ data, setStatus }) => {
  return (
    <div
      className={`py-2 px-3 bg-secondary dark:bg-black dark:border border-secondary absolute right-full top-1/2 rounded-md `}
    >
      <button
        onClick={async () => {
          await axios.delete("/adminuser/" + data.id);
          setStatus(Math.random());
        }}
        className="flex items-center gap-x-2 font-medium text-base hover:text-red duration-200"
      >
        <Icon name="remove" /> Remove
      </button>
    </div>
  );
};
