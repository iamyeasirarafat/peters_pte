import Select from "@/components/AddStudentSelect";
import Checkbox from "@/components/Checkbox";
import Field from "@/components/Field";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import Modal from "@/components/Modal";
import { formatDateTime } from "@/utils/formatDateTime";
import axios from "axios";
import dayjs from "dayjs";
import Link from "next/link";
import { SelectCountry } from "pages/admin/organization";
import countryList from "react-select-country-list";
import { UpdateInformation } from "pages/organization/student-details";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { twMerge } from "tailwind-merge";

const StudentRow = ({
  admin,
  item,
  setStatus,
  setIsOpen,
  isOpen,
  setDeleteUserList,
  deleteUserList,
}) => {
  const [value, setValue] = useState(false);
  const [visible, setVisible] = useState(false);
  const [editData, setEditData] = useState({});
  const [openUpdateInformation, setOpenUpdateInformation] = useState({
    state: false,
    data: null,
  });
  useEffect(() => {
    if (deleteUserList && deleteUserList.includes(item.id)) {
      setValue(true);
    } else {
      setValue(false);
    }
  }, [item, deleteUserList]);

  return (
    <tr className="">
      <td className="td-custom flex items-center gap-3">
        <Checkbox
          value={value}
          onChange={() => {
            setValue(!value);
            if (!value) {
              setDeleteUserList((prev) => [...prev, item.id]);
            } else {
              setDeleteUserList((prev) => prev.filter((i) => i !== item.id));
            }
          }}
        />
        <Link
          className="inline-flex items-center text-sm font-bold transition-colors hover:text-primary"
          href={`/${admin ? "admin" : "organization"}/student-details?id=${
            item.id
          }`}
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
      <td className="td-custom text-center">
        <div className="label-stroke border border-n-1 min-w-[7.25rem]">
          {item.premium ? "premium" : "free"}
        </div>
      </td>
      <td className="td-custom text-center">
        {item?.profile[0]?.userid || "N/A"}
      </td>
      <td className="td-custom text-center">
        {dayjs(item.last_login).format("DD/MM/YYYY")}
      </td>
      <td className="td-custom text-center">
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
        <td className="td-custom text-center font-bold">
          {item?.profile[0]?.organization?.full_name || "N/A"}
        </td>
      )}
      <td className="td-custom font-bold text-right pr-5">
        {item?.profile[0]?.group?.name || "N/A"}
      </td>

      <td className="td-custom text-right">
        <div className="flex justify-center bg-gray-100 ">
          <div
            className="relative inline-block text-left"
            onClick={() => setIsOpen(isOpen === item.id ? null : item.id)}
          >
            <button
              disabled={deleteUserList?.length > 0}
              className={`btn-transparent-dark btn-small btn-square ${
                deleteUserList?.length > 0 && "cursor-not-allowed opacity-20"
              }`}
            >
              <Icon name="dots" />
            </button>
            {isOpen === item.id && (
              <StudentMoreButton
                data={item}
                setEditData={setEditData}
                setVisible={setVisible}
                setStatus={setStatus}
                setOpenUpdateInformation={setOpenUpdateInformation}
              />
            )}
          </div>
        </div>
        {visible && admin && (
          <EditStudentModalAdmin
            {...{ visible, setVisible, editData, setStatus }}
          />
        )}
        {visible && !admin && (
          // <EditStudentModal {...{ visible, setVisible, editData }} />
          <UpdateInformation
            openUpdateInformation={openUpdateInformation}
            setOpenUpdateInformation={setOpenUpdateInformation}
            setFetch={setStatus}
            admin={admin ? true : false}
          />
        )}
      </td>
    </tr>
  );
};
export default StudentRow;

const StudentMoreButton = ({
  data,
  setEditData,
  setVisible,
  setStatus,
  setOpenUpdateInformation,
}) => {
  return (
    <div
      className={`origin-top-right font-semibold absolute right-8 top-0 z-3 mt-1 w-52 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-secondary dark:bg-white/20 dark:border border-white`}
    >
      <div role="none">
        <button
          onClick={() => {
            setEditData(data);
            setVisible(true);
            setOpenUpdateInformation({ state: true, data: data });
          }}
          className="block px-4 py-2 hover:text-purple-1 duration-200 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        >
          <Icon name="settings" /> Edit Student
        </button>
        <a
          href="#"
          className="block px-4 py-2 hover:text-purple-1 duration-200 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        >
          <Icon name="report2" /> Student Analytics
        </a>
        <a
          href="#"
          className="block px-4 py-2 hover:text-purple-1 duration-200 text-sm text-gray-700 hover-bg-gray-100 hover:text-gray-900"
        >
          <Icon name="assignPlan" /> Assign Plan
        </a>
        <a
          href="#"
          className="block px-4 py-2 hover:text-purple-1 duration-200 text-sm text-gray-700 hover-bg-gray-100 hover:text-gray-900"
        >
          <Icon name="students" /> Assign Group
        </a>
        <button
          onClick={async () => {
            await axios.delete("/student/" + data.id);
            setStatus(Math.random());
          }}
          className="block px-4 py-2 hover:text-purple-1 duration-200 text-sm text-gray-700 hover-bg-gray-100 hover:text-gray-900"
        >
          <Icon name="cross" /> Remove
        </button>
      </div>
    </div>
  );
};

export const EditStudentModalAdmin = ({
  visible,
  setVisible,
  editData,
  setStatus,
}) => {
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
  const countries = useMemo(() => countryList().getData(), []);
  const [country, setCountry] = useState("");
  //get groups
  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await axios(org.id + "/groups");
        const fetchedGroups = res.data || [];
        const formattedGroup = [
          {
            id: null,
            name: "None",
          },
          ...fetchedGroups,
        ];
        setGroups(formattedGroup);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    org?.id && fetchGroup();
  }, [org]);

  useEffect(() => {
    setGroup(groups?.[1] || {});
  }, [groups]);

  //get Organizations
  useEffect(() => {
    const fetchOrgs = async () => {
      const res = await axios("/organizations?all=true");
      let formattedOrgs = [
        {
          id: null,
          name: "None",
        },
      ];
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
    control,
    formState: { errors },
  } = useForm({});
  useEffect(() => {
    if (editData) {
      setValue("full_name", editData?.full_name);
      setValue("email", editData?.email);
      setValue("phone", editData?.phone);
      setValue("address", editData?.profile[0]?.address || "");
      setValue("education", editData?.profile[0]?.education || "");
      setCountry(editData?.profile[0]?.country || "");
      setValue(
        "birth_date",
        formatDateTime(editData?.profile[0]?.birth_date, "datere") || ""
      );

      setGroup(editData?.profile[0]?.group || {});
      setGender({ name: editData?.profile[0]?.gender } || {});
      editData?.profile[0]?.organization &&
        setOrg(
          {
            id: editData?.profile[0]?.organization.id,
            name: editData?.profile[0]?.organization.full_name,
          } || {}
        );
    }
  }, [editData, setValue]);
  const onSubmit = async (data) => {
    const submitData = {
      full_name: data.full_name,
      email: data.email,
      phone: data.phone,
      ...(group.id && { group: group.id }),
      ...(org?.id && { organization: org.id }),
      profile: {
        gender: gender.name,
        birth_date: data.birth_date,
        education: data.education,
        address: data.address,
        country: country,
      },
    };
    try {
      await axios.put(`/student/${editData?.id}/update`, submitData);
      toast.success("Successfully Updated");
      setVisible(false);
      setStatus(Math.random());
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

        <PhoneNumberInput
          label="Phone Number"
          name="phone"
          control={control}
          errors={errors}
        />
        <Field
          errors={errors}
          className="my-4"
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
        <SelectCountry
          errors={errors}
          className="mb-2"
          label="Country"
          placeholder="Enter Country"
          items={countries}
          value={country}
          onChange={setCountry}
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

export const PhoneNumberInput = ({ name, control, errors, label }) => {
  const error = errors[name] || false;
  return (
    <div>
      <div className="mb-3 text-xs font-bold">{label}</div>
      <Controller
        name={name}
        control={control}
        rules={{
          validate: (value) => isValidPhoneNumber(value || ""),
        }}
        render={({ field: { onChange, value } }) => (
          <div className="relative">
            <PhoneInput
              value={value}
              onChange={onChange}
              defaultCountry="BD"
              required={false}
              id={name}
              className={twMerge(
                `w-full h-16 px-5 bg-white border-none  rounded-sm text-sm text-n-1 font-bold outline-none transition-colors placeholder:text-n-3 focus:border-primary dark:bg-white/20  dark:text-white dark:focus:border-primary dark:placeholder:text-white/75  ${
                  error ? "pr-15 !border-pink-1" : ""
                }`
              )}
            />
            {error && (
              <Icon
                className={`absolute top-1/2 cursor-pointer right-5 icon-20 -translate-y-1/2 pointer-events-none fill-pink-1
                  }`}
                name={"info-circle"}
              />
            )}
          </div>
        )}
      />
      {errors[name] && <p className="error-message">Invalid Phone</p>}
    </div>
  );
};

export const PhoneNumberInputJoin = ({ name, control, errors, label }) => {
  const error = errors[name] || false;
  return (
    <div>
      <div className="mb-3 text-xs font-bold">{label}</div>
      <Controller
        name={name}
        control={control}
        rules={{
          validate: (value) => isValidPhoneNumber(value || ""),
        }}
        render={({ field: { onChange, value } }) => (
          <div className="relative">
            <PhoneInput
              value={value}
              onChange={onChange}
              defaultCountry="BD"
              id={name}
              className={twMerge(
                `bg-white w-full text-[#616161] placeholder:text-[#B9B9B9] py-1 px-5 border ${
                  error ? "border-red" : "border-[#B9B9B9]"
                }  rounded-[16px] outline-none`
              )}
            />
            {error && (
              <Icon
                className={`absolute top-1/2 cursor-pointer right-5 icon-20 -translate-y-1/2 pointer-events-none fill-pink-1
                  }`}
                name={"info-circle"}
              />
            )}
          </div>
        )}
      />
      {errors[name] && <p className="error-message">Invalid Phone</p>}
    </div>
  );
};
