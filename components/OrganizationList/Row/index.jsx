import Checkbox from "@/components/Checkbox";
import Field from "@/components/Field";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import Modal from "@/components/Modal";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const StudentRow = ({ item, setStatus }) => {
  const [value, setValue] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [editData, setEditData] = useState({});
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <tr className="">
      <td className="td-custom flex items-center gap-2">
        <Checkbox value={value} onChange={() => setValue(!value)} />
        <Link
          className="inline-flex items-center text-sm font-bold transition-colors hover:text-primary"
          href={`/admin/organization/${item.id}`}
        >
          <div className="w-11 h-11  mr-3 ">
            <Image
              className="w-full h-full  rounded-full"
              src={item.picture || "/images/img-2.jpg"}
              width={1000}
              height={1000}
              alt=""
            />
          </div>
          {item.full_name}
        </Link>
      </td>
      <td className="td-custom">{item?.profile?.userid || "N/A"}</td>
      <td className="td-custom">{item?.spent || "N/A"}</td>
      <td className="td-custom">{item?.students || "N/A"}</td>
      <td className="td-custom">{item.mocks || "N/A"}</td>
      <td className="td-custom">{item.accounts || "N/A"}</td>
      <td className="td-custom font-bold">{item?.profile?.country || "N/A"}</td>

      <td className="td-custom text-right">
        <div className="flex justify-center bg-gray-100 ">
          <div
            className="relative inline-block text-left"
            onClick={toggleDropdown}
            // onBlur={closeDropdown}
          >
            <button className="btn-transparent-dark btn-small btn-square">
              <Icon name="dots" />
            </button>
            <div
              style={{ backgroundColor: "#FAF4F0" }}
              className={`${
                isOpen ? "block" : "hidden"
              } origin-top-right font-semibold absolute right-0 z-3 mt-1 w-52 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
            >
              <div role="none">
                <button
                  onClick={() => {
                    setEditData(item);
                    setVisible(true);
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <Icon name="settings" /> Edit Organization
                </button>
                <button
                  onClick={async () => {
                    await axios.delete("/student/" + item.id);
                    setStatus(Math.random());
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover-bg-gray-100 hover:text-gray-900"
                >
                  <Icon name="cross" /> Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </td>
      {visible && <EditOrgModal {...{ visible, setVisible, editData }} />}
    </tr>
  );
};
export default StudentRow;

export const EditOrgModal = ({ visible, setVisible, editData }) => {
  console.log(editData);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});
  useEffect(() => {
    if (editData) {
      setValue("org_name", editData?.profile?.org_name);
      setValue("email", editData?.email);
      setValue("phone", editData?.phone);
      setValue("address", editData?.profile?.address || "");
      setValue("country", editData?.profile?.country || "");
    }
  }, [editData]);
  const onSubmit = async (data) => {
    const submitData = {
      email: data.email,
      phone: data.phone,
      profile: {
        address: data.address,
        country: data.country,
        org_name: data.org_name,
      },
    };
    try {
      await axios.put(`/organization/${editData?.id}/update`, submitData);
      toast.success("Successfully Updated");
      setVisible(false);
    } catch (err) {
      const key = Object.keys(err?.response?.data)[0];
      const value = err?.response?.data[key];
      toast.error(`${key} - ${value}`);
    }
  };

  return (
    <Modal
      title="Update Information"
      visible={visible}
      onClose={() => setVisible(false)}
    >
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <Field
          errors={errors}
          className="mb-4"
          label="Owner Name"
          placeholder="Enter  name"
          register={register}
          name="org_name"
        />

        <Field
          errors={errors}
          className="mb-6"
          label="Email"
          placeholder="Enter email"
          type="email"
          register={register}
          name="email"
        />
        <Field
          errors={errors}
          className="mb-6"
          label="Phone Number"
          placeholder="Enter phone number"
          type="tel"
          register={register}
          name="phone"
        />
        <Field
          errors={errors}
          className="mb-6"
          label="Address"
          placeholder="Enter Address"
          register={register}
          name="address"
        />
        <Field
          errors={errors}
          className="mb-6"
          label="Country"
          placeholder="Enter Country"
          register={register}
          name="country"
        />
        <button className="btn-purple  w-full">Update Info</button>
      </form>
    </Modal>
  );
};
