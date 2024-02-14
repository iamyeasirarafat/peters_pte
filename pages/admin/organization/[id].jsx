import Field from "@/components/Field";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import Sorting from "@/components/Sorting";
import { PhoneNumberInput } from "@/components/Students_list/Row";
import TablePagination from "@/components/TablePagination";
import { useHydrated } from "@/hooks/useHydrated";
import { calculateDaysLeft } from "@/utils/calculateDaysLeft";
import { formatDateWithName } from "@/utils/formatDateWithName";
import countryList from "react-select-country-list";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BiRightArrowAlt, BiSolidEditAlt } from "react-icons/bi";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { IoIosCall, IoMdMail } from "react-icons/io";
import { useMediaQuery } from "react-responsive";
import { SelectCountry } from "./index";
function OrgDetails() {
  const [reFetch, setReFetch] = useState(false);
  const router = useRouter();
  const id = router?.query?.id;
  const [orgData, setOrgData] = useState({});
  useEffect(() => {
    const getOrgDetails = async () => {
      const res = await axios.get(`/organization/${id}`);
      setOrgData(res?.data);
    };
    router.isReady && getOrgDetails();
  }, [id, router.isReady, reFetch]);
  return (
    <Layout title="Organizations Details" back>
      <div className={` grid grid-cols-12 gap-x-20 gap-y-5`}>
        <div className={`md:col-span-12 col-span-4`}>
          <StudentProfileInfo data={orgData} setReFetch={setReFetch} />
        </div>
        <div className={`md:col-span-12 col-span-8  `}>
          <StudentDetailsRight data={orgData} />
        </div>
      </div>
    </Layout>
  );
}

export default OrgDetails;

const StudentProfileInfo = ({ data, setReFetch }) => {
  const [visible, setVisible] = useState(false);
  const [editData, setEditData] = useState({});
  return (
    <div className="space-y-3 w-full">
      <div className="space-y-2">
        <Image
          className="w-21 h-w-21 rounded-full"
          src={data?.picture || "/images/img-2.jpg"}
          width={1000}
          height={1000}
          alt=""
        />
        <div>
          <h2 className="text-xl font-extrabold">{data?.full_name}</h2>
          <p className="text-sm">
            {data?.profile ? data?.profile[0]?.country : "Not Available"}
          </p>
        </div>
      </div>
      <hr className="border-dotted border-black" />
      <div>
        <p className="text-sm">Owner Name</p>
        <p className="text-sm font-bold">
          {data?.profile && data?.profile[0]?.org_name}
        </p>
      </div>
      <div>
        <p className="text-sm">Email</p>
        <p className="text-sm font-bold">{data?.email}</p>
      </div>
      <div>
        <p className="text-sm">Phone</p>
        <p className="text-sm font-bold">{data?.phone}</p>
      </div>
      <div>
        <p className="text-sm">Address</p>
        <p className="text-sm font-bold">
          {(data?.profile && data?.profile[0]?.address) || "Not Available"}
        </p>
      </div>
      <hr className="border-dotted border-black" />
      <div className="flex items-center gap-x-2">
        <button
          onClick={() => {
            setEditData(data);
            setVisible(true);
          }}
          className="flex items-center gap-x-3 bg-primary py-2.5 px-8 justify-center text-xs font-bold"
        >
          <BsFillPlusCircleFill /> Update Info
        </button>
        <Link
          href={`mailto:${data?.email}`}
          className="p-2.5 border border-black dark:border-white rounded-sm cursor-pointer hover:text-primary duration-200"
        >
          <IoMdMail />
        </Link>
        <Link
          href={`callto:${data?.phone}`}
          className="p-2.5 border border-black dark:border-white rounded-sm cursor-pointer hover:text-primary duration-200"
        >
          <IoIosCall />
        </Link>
      </div>
      <EditOrgModal {...{ visible, setVisible, editData, setReFetch }} />
    </div>
  );
};

const StudentDetailsRight = ({ data }) => {
  const [fetchGroup, setFetchGroup] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const pageLimit = 3;
  const [groups, setGroups] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchGroup = async () => {
      const res = await axios(
        `/${data?.id}/groups?limit=${pageLimit}&page=${pageNumber}`
      );
      setGroups(res.data);
    };
    data?.id && router.isReady && fetchGroup();
  }, [data, router.isReady, pageNumber, fetchGroup]);
  const [openChangePassword, setOpenChangePassword] = useState({
    state: false,
    student: null,
  });
  const [openChangeUserId, setOpenChangeUserId] = useState({
    state: false,
    student: null,
  });
  const [openGroupModal, setOpenGroupModal] = useState({
    state: false,
    student: null,
  });
  const { mounted } = useHydrated();
  const isTablet = useMediaQuery({
    query: "(max-width: 1023px)",
  });

  return (
    <div className="w-full">
      {/* Setup up your PTE Identity */}
      <div className="bg-[url('/images/Identity.png')] bg-cover bg-center bg-no-repeat p-5">
        <h2 className="text-lg font-extrabold text-white">
          Setup up your PTE Identity
        </h2>
        <div className="flex items-center gap-x-2 mt-2">
          <button className="flex items-center gap-x-2 bg-white py-2.5 text-black px-4 justify-center text-xs font-bold">
            Change Identity <BiRightArrowAlt className="text-base" />
          </button>
        </div>
      </div>
      {/*  */}
      <div className="bg-[url('/images/edit_account.png')] bg-cover bg-center bg-no-repeat p-5 mt-3">
        <h2 className="text-lg font-extrabold text-white">
          Bluk Account Settings
        </h2>
        <div className="flex items-center gap-x-2 mt-2">
          <button className="flex items-center gap-x-2 bg-white py-2.5 text-black px-4 justify-center text-xs font-bold">
            Edit Bluk Account <BiRightArrowAlt className="text-base" />
          </button>
          <button className="flex items-center gap-x-2 bg-white py-2.5 text-black px-4 justify-center text-xs font-bold">
            See Transaction <BiRightArrowAlt className="text-base" />
          </button>
        </div>
      </div>
      {/* Group Settings */}
      <div className="bg-white dark:bg-black p-5 mt-9">
        <div className="flex items-center justify-between">
          <p className="text-lg font-extrabold">Group Settings</p>
          <button
            onClick={() =>
              setOpenGroupModal({
                state: true,
                student: data?.id,
              })
            }
            className="flex items-center gap-x-3 bg-secondary dark:bg-primary py-2.5 px-8 justify-center text-xs font-bold"
          >
            <BsFillPlusCircleFill /> Create New Group
          </button>
        </div>
        {/* Plan */}
        {mounted && isTablet ? (
          groups?.results?.map((item, i) => (
            <AccountPlanMobile key={i} data={item} />
          ))
        ) : (
          <AccountPlan data={groups?.results} />
        )}
      </div>
      <TablePagination
        pageNumber={pageNumber}
        totalPage={Math.ceil(groups?.total / pageLimit)}
        prevNext={setPageNumber}
      />

      {/* Security */}
      <div className="bg-white dark:bg-black p-5 mt-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-extrabold">Security</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                setOpenChangeUserId({ state: true, student: data?.id })
              }
              className="flex items-center gap-x-3 bg-secondary dark:bg-primary py-2.5 px-8 justify-center text-xs font-bold"
            >
              <BiSolidEditAlt /> Update ORG ID
            </button>
            <button
              onClick={() =>
                setOpenChangePassword({ state: true, student: data?.id })
              }
              className="flex items-center gap-x-3 bg-secondary dark:bg-primary py-2.5 px-8 justify-center text-xs font-bold"
            >
              <BiSolidEditAlt /> Update Password
            </button>
          </div>
        </div>
        <div className="flex items-center gap-x-13">
          <div>
            <p className="text-sm">User Name</p>
            <p className="text-sm font-bold">{data?.full_name}</p>
          </div>
          <div>
            <p className="text-sm">Password</p>
            <p className="text-sm font-bold">**************</p>
          </div>
        </div>
        <ChangePassword
          openChangePassword={openChangePassword}
          setOpenChangePassword={setOpenChangePassword}
        />
        <ChangeUserId
          openChangeUserId={openChangeUserId}
          setOpenChangeUserId={setOpenChangeUserId}
        />
        <CreateGroupModal
          openGroupModal={openGroupModal}
          setOpenGroupModal={setOpenGroupModal}
          setFetchGroup={setFetchGroup}
        />
      </div>
    </div>
  );
};

const EditOrgModal = ({ visible, setVisible, editData, setReFetch }) => {
  const countries = useMemo(() => countryList().getData(), []);
  const [country, setCountry] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({});
  useEffect(() => {
    if (editData) {
      setValue("org_name", editData?.profile?.[0]?.org_name);
      setValue("email", editData?.email);
      setValue("phone", editData?.phone);
      setValue("address", editData?.profile?.[0]?.address || "");
      setCountry(editData?.profile?.[0]?.country || "");
    }
  }, [editData, setValue]);
  const onSubmit = async (data) => {
    const submitData = {
      email: data.email,
      phone: data.phone,
      profile: {
        address: data.address,
        country: country,
        org_name: data.org_name,
      },
    };
    try {
      await axios.put(`/organization/${editData?.id}/update`, submitData);
      toast.success("Successfully Updated");
      setVisible(false);
      setReFetch((prev) => !prev);
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
        <SelectCountry
          errors={errors}
          className="mb-6"
          label="Country"
          placeholder="Enter Country"
          items={countries}
          value={country}
          onChange={setCountry}
        />
        <button className="btn-purple  w-full">Update Info</button>
      </form>
    </Modal>
  );
};

const AccountPlan = ({ data }) => {
  return (
    <div>
      <table className="bg-white dark:bg-black w-full">
        <thead>
          <tr>
            <th className="py-2 pr-3 text-start">
              <Sorting title="Group Name" />
            </th>
            <th className="th-custom text-center">
              <Sorting title="Students In" />
            </th>
            <th className="th-custom text-center">
              <Sorting title="Created In" />
            </th>
            <th className="th-custom text-right">
              <Sorting title="Average Score" />
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((group, i) => (
            <tr key={i}>
              <td className="py-2 pr-3 text-sm font-bold">{group?.name}</td>
              <td className="py-2 px-3 text-center text-sm font-bold">N/A</td>
              <td className="py-2 px-3 text-center text-sm font-bold">
                {formatDateWithName(group?.created_at, "custom")}
              </td>
              <td className="py-2 px-3 flex items-center text-sm justify-end gap-x-5">
                N/A
                <button className="btn-transparent-dark btn-small btn-square">
                  <Icon name="dots" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AccountPlanMobile = ({ data }) => {
  return (
    <div className="space-y-2 py-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium">
          {formatDateWithName(data?.created_at, "custom")}
        </p>
        <p className="text-xs font-medium">
          {formatDateWithName(data?.created_at, "custom")}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold">{data?.name}</p>
        <p className="py-[2px] px-2 rounded-sm bg-green-300 text-xs font-bold inline-block text-black">
          {calculateDaysLeft(data?.end_date)} Days Left
        </p>
      </div>
    </div>
  );
};

const ChangePassword = ({ openChangePassword, setOpenChangePassword }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const passwordData = {
      organization: openChangePassword?.student,
      ...data,
    };
    const changePass = async () => {
      const res = await axios.put(`/organization/passwordchange`, passwordData);
      setOpenChangePassword({ state: false, student: null });
      reset();
      toast.success(res?.data?.message);
    };
    changePass();
  };
  return (
    <Modal
      title="Change Password"
      visible={openChangePassword?.state}
      onClose={() => {
        setOpenChangePassword({ state: false, student: null });
        reset();
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          errors={errors}
          className="mb-4"
          label="Set New Password *"
          placeholder="Enter new password"
          type="password"
          register={register}
          name="new_password"
          required
        />
        <Field
          errors={errors}
          className="mb-4"
          label="Type Your Password *"
          placeholder="Enter your password"
          type="password"
          register={register}
          name="my_password"
          required
        />
        <button className="bg-primary py-3 text-base font-bold w-full">
          Update Password
        </button>
      </form>
    </Modal>
  );
};
const ChangeUserId = ({ openChangeUserId, setOpenChangeUserId }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const passwordData = {
      organization: openChangeUserId?.student,
      ...data,
    };
    const changePass = async () => {
      const res = await axios.put(`/organization/useridchange`, passwordData);
      setOpenChangeUserId({ state: false, student: null });
      reset();
      toast.success(res?.data?.message);
    };
    changePass();
  };
  return (
    <Modal
      title="Change Username"
      visible={openChangeUserId?.state}
      onClose={() => {
        setOpenChangeUserId({ state: false, student: null });
        reset();
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          errors={errors}
          className="mb-4"
          label="New ID *"
          placeholder="Enter new ID"
          type="text"
          register={register}
          name="userid"
          required
        />
        <Field
          errors={errors}
          className="mb-4"
          label="Type Your Password *"
          placeholder="Enter your password"
          type="password"
          register={register}
          name="my_password"
          required
        />
        <button className="bg-primary py-3 text-base font-bold w-full">
          Update
        </button>
      </form>
    </Modal>
  );
};

const CreateGroupModal = ({
  setOpenGroupModal,
  openGroupModal,
  setFetchGroup,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const onSubmit = async (data) => {
    try {
      await axios.post("/group?oid=" + openGroupModal.student, data);
      toast.success("Successfully added");
      setOpenGroupModal({
        state: false,
        student: null,
      });
      setFetchGroup((prev) => !prev);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };
  return (
    <Modal
      title="Create new Group"
      visible={openGroupModal.state}
      onClose={() => {
        setOpenGroupModal({
          state: false,
          student: null,
        });
        reset();
      }}
    >
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <Field
          errors={errors}
          className="mb-4"
          label="Group Name *"
          placeholder="Enter  name"
          required
          register={register}
          name="name"
        />
        <button className="btn-purple  w-full">Create group</button>
      </form>
    </Modal>
  );
};
