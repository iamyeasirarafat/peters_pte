import Select from "@/components/AddStudentSelect";
import Checkbox from "@/components/Checkbox";
import Field from "@/components/Field";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import Modal from "@/components/Modal";
import axios from "axios";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const StudentRow = ({ admin, item, setStatus }) => {
  const [value, setValue] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [editData, setEditData] = useState({});
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <tr className="">
      <td className="td-custom flex items-center gap-3">
        <Checkbox value={value} onChange={() => setValue(!value)} />
        <Link
          className="inline-flex items-center text-sm font-bold transition-colors hover:text-primary"
          href={`/organization/student-details?id=${item.id}`}
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
      <td className="td-custom">
        <div className="label-stroke border border-n-1 min-w-[7.25rem]">
          {item.premium ? "premium" : "free"}
        </div>
      </td>
      <td className="td-custom">{item?.profile[0]?.userid || "N/A"}</td>
      <td className="td-custom">
        {dayjs(item.last_login).format("DD/MM/YYYY")}
      </td>
      <td className="td-custom">
        <div
          className={`border min-w-[4rem] ${
            item.avl === "Paid"
              ? "label-stroke-green"
              : item.avl === "Med"
              ? "label-stroke-yellow"
              : item.avl === "Low"
              ? "label-stroke-pink"
              : "label-stroke"
          }`}
        >
          {item.avg_score || "N/A"}
        </div>
      </td>

      {admin && (
        <td className="td-custom font-bold">
          {item?.profile[0]?.organization?.full_name || "N/A"}
        </td>
      )}
      <td className="td-custom font-bold">
        {item?.profile[0]?.group?.name || "N/A"}
      </td>

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
                  <Icon name="settings" /> Edit Student
                </button>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <Icon name="report2" /> Student Analytics
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover-bg-gray-100 hover:text-gray-900"
                >
                  <Icon name="assignPlan" /> Assign Plan
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover-bg-gray-100 hover:text-gray-900"
                >
                  <Icon name="students" /> Assign Group
                </a>
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
        {visible && admin && (
          <EditStudentModalAdmin {...{ visible, setVisible, editData }} />
        )}
        {visible && !admin && (
          <EditStudentModal {...{ visible, setVisible, editData }} />
        )}
      </td>
    </tr>
  );
};
export default StudentRow;

const EditStudentModalAdmin = ({ visible, setVisible, editData }) => {
  const genders = [
    {
      name: "male",
    },
    {
      name: "female",
    },
  ];
  const [gender, setGender] = useState(genders[0]);
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState({});
  const [orgs, setOrgs] = useState([]);
  const [org, setOrg] = useState();
  //get groups
  useEffect(() => {
    const fetchGroup = async () => {
      const res = await axios(org.id + "/groups");
      setGroups(res.data);
      setGroup(res.data[0]);
    };
    org && fetchGroup();
  }, [org]);

  //get Organizations
  useEffect(() => {
    const fetchOrgs = async () => {
      const res = await axios("/organizations");
      let formattedOrgs = [];
      await res.data.forEach((item) =>
        formattedOrgs.push({ id: item.id, name: item.full_name })
      );
      setOrgs(formattedOrgs);
    };
    fetchOrgs();
  }, []);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm({});
  useEffect(() => {
    if (editData) {
      setValue("full_name", editData?.full_name);
      setValue("email", editData?.email);
      setValue("phone", editData?.phone);
      setValue("address", editData?.profile[0]?.address || "");
      setValue("education", editData?.profile[0]?.education || "");
      setValue("birth_date", editData?.profile[0]?.birth_date || "");
      setGroup(editData?.profile[0]?.group || {});
      setGender({ name: editData?.profile[0]?.gender } || {});
      setOrg(
        {
          id: editData?.profile[0]?.organization.id,
          name: editData?.profile[0]?.organization.full_name,
        } || {}
      );
    }
  }, [editData]);
  const onSubmit = async (data) => {
    const submitData = {
      full_name: data.full_name,
      email: data.email,
      phone: data.phone,
      group: group.id,
      organization: org.id,
      profile: {
        gender: gender.name,
        birth_date: data.birth_date,
        education: data.education,
        address: data.address,
        country: data.country,
      },
    };
    try {
      await axios.put(`/student/${editData?.id}/update`, submitData);
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
          label="Student Name *"
          placeholder="Enter full name"
          register={register}
          name="full_name"
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
        <Select
          label="Gender"
          className="mb-6"
          items={genders}
          value={gender}
          onChange={setGender}
        />
        <Select
          label="Organization *"
          className="mb-6 w-full"
          items={orgs}
          value={org}
          onChange={setOrg}
        />

        <Select
          label="Group *"
          className="mb-6 w-full"
          items={groups}
          value={group}
          onChange={setGroup}
        />
        <Field
          errors={errors}
          className="mb-6"
          label="Country"
          placeholder="Enter Country"
          register={register}
          name="country"
        />
        <Field
          errors={errors}
          className="mb-6"
          label="Education"
          placeholder="Enter Education"
          register={register}
          name="education"
        />
        <Field
          errors={errors}
          className="mb-6"
          label="Date of birth"
          type="date"
          placeholder="Enter Birth Date"
          register={register}
          name="birth_date"
        />

        <button className="btn-purple  w-full">Update Information</button>
      </form>
    </Modal>
  );
};

const EditStudentModal = ({ visible, setVisible, editData }) => {
  const genders = [
    {
      name: "male",
    },
    {
      name: "female",
    },
  ];
  const [gender, setGender] = useState(genders[0]);
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState({});
  //get groups
  useEffect(() => {
    const fetchGroup = async () => {
      const res = await axios("/groups");
      setGroups(res.data);
      setGroup(res.data[0]);
    };
    fetchGroup();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm({});
  useEffect(() => {
    if (editData) {
      setValue("full_name", editData?.full_name);
      setValue("email", editData?.email);
      setValue("phone", editData?.phone);
      setValue("address", editData?.profile[0]?.address || "");
      setValue("education", editData?.profile[0]?.education || "");
      setValue("birth_date", editData?.profile[0]?.birth_date || "");
      setGroup(editData?.profile[0]?.group || {});
      setGender({ name: editData?.profile[0]?.gender } || {});
    }
  }, [editData]);
  const onSubmit = async (data) => {
    const submitData = {
      full_name: data.full_name,
      email: data.email,
      phone: data.phone,
      group: group.id,
      profile: {
        gender: gender.name,
        birth_date: data.birth_date,
        education: data.education,
        address: data.address,
        country: data.country,
      },
    };
    try {
      await axios.put(`/student/${editData?.id}/update`, submitData);
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
          label="Student Name *"
          placeholder="Enter full name"
          register={register}
          name="full_name"
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
        <Select
          label="Gender"
          className="mb-6"
          items={genders}
          value={gender}
          onChange={setGender}
        />

        <Select
          label="Group *"
          className="mb-6 w-full"
          items={groups}
          value={group}
          onChange={setGroup}
        />
        <Field
          errors={errors}
          className="mb-6"
          label="Country"
          placeholder="Enter Country"
          register={register}
          name="country"
        />
        <Field
          errors={errors}
          className="mb-6"
          label="Education"
          placeholder="Enter Education"
          register={register}
          name="education"
        />
        <Field
          errors={errors}
          className="mb-6"
          label="Date of birth"
          type="date"
          placeholder="Enter Birth Date"
          register={register}
          name="birth_date"
        />

        <button className="btn-purple  w-full">Update Information</button>
      </form>
    </Modal>
  );
};
