import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "@/components/Image";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { IoIosCall, IoMdMail } from "react-icons/io";
import { BiRightArrowAlt, BiSolidEditAlt } from "react-icons/bi";
import { RiRadioButtonFill, RiSettings2Fill } from "react-icons/ri";
import { CgRadioCheck } from "react-icons/cg";
import Sorting from "@/components/Sorting";
import Icon from "@/components/Icon";
import TablePagination from "@/components/TablePagination";
import { useMediaQuery } from "react-responsive";
import { useHydrated } from "@/hooks/useHydrated";
import Link from "next/link";
import Modal from "@/components/Modal";
import { useForm } from "react-hook-form";
import Field from "@/components/Field";
import toast from "react-hot-toast";
import Select from "@/components/AddStudentSelect";
import { formatDateTime } from "@/utils/formatDateTime";
import { formatDateWithName } from "@/utils/formatDateWithName";
import { calculateDaysLeft } from "@/utils/calculateDaysLeft";
import Spinner from "@/components/Spinner/Spinner";

export default function StudentDetails() {
  const [fetch, setFetch] = useState(false);
  const router = useRouter();
  const id = router.query.id;
  const [studentDetails, setStudentDetails] = useState();
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios("/student/" + id);
      setStudentDetails(res?.data);
    };
    const fetchGroup = async () => {
      const res = await axios("/groups");
      setGroups(res.data);
    };
    if (router.isReady) {
      fetchData();
      fetchGroup();
    }
  }, [id, router, fetch]);
  const myGroup = groups?.find(
    (item) => item?.id === studentDetails?.profile[0]?.group
  );

  console.log("studentDetails", studentDetails);

  return (
    <Layout title="Student Details" back>
      <div className="grid grid-cols-12 gap-x-20">
        <div className="col-span-4">
          <StudentProfileInfo
            data={studentDetails}
            group={myGroup}
            setFetch={setFetch}
          />
        </div>
        <div className="col-span-8">
          <StudentDetailsRight data={studentDetails} />
        </div>
      </div>
    </Layout>
  );
}

const StudentProfileInfo = ({ data, group, setFetch }) => {
  const [openUpdateInformation, setOpenUpdateInformation] = useState({
    state: false,
    data: null,
  });
  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Image
          className="w-21 h-w-21 rounded-full"
          src={"/images/img-2.jpg"}
          width={1000}
          height={1000}
          alt=""
        />
        <div>
          <h2 className="text-xl font-extrabold">{data?.full_name}</h2>
          <p className="text-sm">
            {data?.profile[0]?.country || "Not Available"}
          </p>
        </div>
      </div>
      <hr className="border-dotted border-black" />
      <div>
        <p className="text-sm">Email</p>
        <p className="text-sm font-bold">{data?.email}</p>
      </div>
      <div>
        <p className="text-sm">Phone</p>
        <p className="text-sm font-bold">{data?.phone || "Not Available"}</p>
      </div>
      <div>
        <p className="text-sm">Gender</p>
        <p className="text-sm font-bold">
          {data?.profile[0]?.gender || "Not Available"}
        </p>
      </div>
      <div>
        <p className="text-sm">Education</p>
        <p className="text-sm font-bold">
          {data?.profile[0]?.education || "Not Available"}
        </p>
      </div>
      <div>
        <p className="text-sm">Address</p>
        <p className="text-sm font-bold">
          {data?.profile[0]?.address || "Not Available"}
        </p>
      </div>
      <div>
        <p className="text-sm">Group</p>
        <p className="text-sm font-bold">{group?.name || "Not Available"}</p>
      </div>
      <div>
        <p className="text-sm">Birthday</p>
        <p className="text-sm font-bold">
          {formatDateTime(data?.profile[0]?.birth_date, "date") ||
            "Not Available"}
        </p>
      </div>
      <hr className="border-dotted border-black" />
      <div className="flex items-center gap-x-2">
        <button
          onClick={() => setOpenUpdateInformation({ state: true, data: data })}
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
      <UpdateInformation
        openUpdateInformation={openUpdateInformation}
        setOpenUpdateInformation={setOpenUpdateInformation}
        setFetch={setFetch}
      />
    </div>
  );
};

const StudentDetailsRight = ({ data }) => {
  const [openChangePassword, setOpenChangePassword] = useState({
    state: false,
    student: null,
  });
  const [openAssignNewPlan, setOpenAssignNewPlan] = useState({
    state: false,
    student: null,
  });
  const { mounted } = useHydrated();
  const isTablet = useMediaQuery({
    query: "(max-width: 1023px)",
  });
  return (
    <div>
      {/* Student Progress & Performance */}
      <div className="bg-[url('/images/student_progress.svg')] bg-cover bg-center bg-no-repeat px-5 pt-9 pb-7">
        <h2 className="text-lg font-extrabold text-black">
          Student Progress & Performance
        </h2>
        <div className="flex items-center gap-x-2 mt-2">
          <button className="flex items-center gap-x-2 bg-primary py-2.5 px-4 justify-center text-xs font-bold">
            PTE Progress <BiRightArrowAlt className="text-base" />
          </button>
          <button className="flex items-center gap-x-2 bg-primary py-2.5 px-4 justify-center text-xs font-bold">
            PTE Performance <BiRightArrowAlt className="text-base" />
          </button>
        </div>
      </div>
      {/* Exam Count Down */}
      <div className="flex items-center justify-between mt-2.5">
        <div className="p-1.5 bg-white dark:bg-black rounded-[50px] flex items-center gap-x-2 border border-primary">
          <p className="bg-gold text-white text-base leading-none py-2.5 px-3.5 rounded-[50px]">
            Exam Count Down
          </p>
          <p className="text-xl font-medium text-gray dark:text-white">
            20d 03h 03m 52s
          </p>
          <RiSettings2Fill className="text-xl text-cream" />
        </div>
        <div className="p-1.5 bg-white dark:bg-black rounded-[50px] flex items-center gap-x-2 border border-primary">
          <p className="bg-cream text-white text-base leading-none py-2.5 px-3.5 rounded-[50px]">
            Target Score
          </p>
          <p className="text-3xl font-medium text-gray dark:text-white">79+</p>
          <RiSettings2Fill className="text-xl text-cream" />
        </div>
      </div>
      {/* Account Plan History */}
      <div className="bg-white dark:bg-black p-5 mt-9">
        <div className="flex items-center justify-between">
          <p className="text-lg font-extrabold">Account Plan History</p>
          <button
            onClick={() =>
              setOpenAssignNewPlan({
                state: true,
                student: data?.id,
              })
            }
            className="flex items-center gap-x-3 bg-secondary dark:bg-primary py-2.5 px-8 justify-center text-xs font-bold"
          >
            <BsFillPlusCircleFill /> Assign New Plan
          </button>
        </div>
        {/* Plan */}
        {mounted && isTablet ? (
          data?.plans?.map((plan, i) => (
            <AccountPlanMobile key={i} data={plan} />
          ))
        ) : (
          <AccountPlan data={data} />
        )}
        <AssignNewPlan
          openAssignNewPlan={openAssignNewPlan}
          setOpenAssignNewPlan={setOpenAssignNewPlan}
        />
      </div>
      <TablePagination />

      {/* Security */}
      <div className="bg-white dark:bg-black p-5 mt-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-extrabold">Security</p>
          <button
            onClick={() =>
              setOpenChangePassword({ state: true, student: data?.id })
            }
            className="flex items-center gap-x-3 bg-secondary dark:bg-primary py-2.5 px-8 justify-center text-xs font-bold"
          >
            <BiSolidEditAlt /> Update Password
          </button>
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
      </div>
    </div>
  );
};

const AccountPlan = ({ data }) => {
  return (
    <div>
      <table className="bg-white dark:bg-black w-full">
        <thead>
          <tr>
            <th className="py-2 pr-3 text-start">
              <Sorting title="Plan Name" />
            </th>
            <th className="th-custom text-center">
              <Sorting title="Start In" />
            </th>
            <th className="th-custom text-center">
              <Sorting title="End In" />
            </th>
            <th className="th-custom text-center">
              <Sorting title="Remaining Days" />
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.plans?.map((plan, i) => (
            <tr key={i}>
              <td className="py-2 pr-3 font-bold">{plan?.title}</td>
              <td className="py-2 px-3 text-center font-bold">
                {formatDateWithName(plan?.start_date, "custom")}
              </td>
              <td className="py-2 px-3 text-center font-bold">
                {formatDateWithName(plan?.end_date, "custom")}
              </td>
              <td className="py-2 px-3 flex items-center justify-center gap-x-5">
                <p className="py-[2px] px-2 rounded-sm bg-green-300 text-xs font-bold inline-block text-black">
                  {calculateDaysLeft(plan?.end_date)} Days Left
                </p>
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
          {formatDateWithName(data?.start_date, "custom")}
        </p>
        <p className="text-xs font-medium">
          {formatDateWithName(data?.end_date, "custom")}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold">{data?.title}</p>
        <p className="py-[2px] px-2 rounded-sm bg-green-300 text-xs font-bold inline-block text-black">
          {calculateDaysLeft(data?.end_date)} Days Left
        </p>
      </div>
    </div>
  );
};

// Modal
// Update Information profile
const UpdateInformation = ({
  openUpdateInformation,
  setOpenUpdateInformation,
  setFetch,
}) => {
  const genders = [
    { id: 1, name: "male" },
    { id: 2, name: "female" },
  ];
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState("");
  const [gender, setGender] = useState(genders[0]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGroup = async () => {
      const res = await axios("/groups");
      setGroups(res.data);
    };
    fetchGroup();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const updateData = {
      ...data,
      phone: `+88${data?.phone}`,
      group: group?.id,
      organization: openUpdateInformation?.data?.profile[0]?.organization,
      profile: {
        gender: gender?.name,
        ...data?.profile,
      },
    };

    const updateProfile = async () => {
      setLoading(true);
      const res = await axios.put(
        `/student/${openUpdateInformation?.data?.id}/update`,
        updateData
      );
      setLoading(false);
      toast.success(res?.data?.success);
      setOpenUpdateInformation({ state: false, data: null });
      reset();
      setFetch((prev) => !prev);
    };
    updateProfile();
  };

  // set Default value
  useEffect(() => {
    setValue("full_name", openUpdateInformation?.data?.full_name);
    setValue("email", openUpdateInformation?.data?.email);
    setValue("phone", openUpdateInformation?.data?.phone?.slice(3));
    setValue(
      "profile.country",
      openUpdateInformation?.data?.profile[0]?.country
    );
    setValue(
      "profile.education",
      openUpdateInformation?.data?.profile[0]?.education
    );
    setValue(
      "profile.address",
      openUpdateInformation?.data?.profile[0]?.address
    );
    setValue(
      "profile.birth_date",
      formatDateTime(
        openUpdateInformation?.data?.profile[0]?.birth_date,
        "datere"
      )
    );
    setGender(
      openUpdateInformation?.data?.profile[0]?.gender === "male"
        ? genders[0]
        : genders[1]
    );
    setGroup(
      groups?.find(
        (item) => item?.id === openUpdateInformation?.data?.profile[0]?.group
      )
    );
  }, [openUpdateInformation?.data]);

  return (
    <Modal
      title="Update Information"
      visible={openUpdateInformation?.state}
      onClose={() => {
        setOpenUpdateInformation({ state: false, data: null });
        reset();
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          errors={errors}
          className="mb-2"
          label="Student Name"
          placeholder="Student Name"
          required
          register={register}
          name="full_name"
        />
        <Field
          errors={errors}
          className="mb-2"
          label="Email"
          placeholder="Enter email"
          type="email"
          required
          register={register}
          name="email"
        />
        <Field
          errors={errors}
          className="mb-2"
          label="Phone Number"
          placeholder="01712345678"
          type="number"
          required
          register={register}
          name="phone"
        />
        <Field
          errors={errors}
          className="mb-2"
          label="Address"
          placeholder="Enter Address"
          required
          register={register}
          name="profile.address"
        />
        <Select
          label="Gender"
          className="mb-2"
          items={genders}
          value={gender}
          onChange={setGender}
        />
        <Select
          label="Group *"
          className="mb-2"
          items={groups}
          value={group}
          onChange={setGroup}
        />
        <Field
          errors={errors}
          className="mb-2"
          label="Country"
          placeholder="Enter Country"
          required
          register={register}
          name="profile.country"
        />
        <Field
          errors={errors}
          className="mb-2"
          label="Education"
          placeholder="Enter Education"
          required
          register={register}
          name="profile.education"
        />
        <Field
          errors={errors}
          className="mb-2"
          label="Birth Date"
          placeholder="Enter Birth Date"
          type="date"
          required
          register={register}
          name="profile.birth_date"
        />
        <button className="bg-primary py-3 text-base font-bold w-full flex items-center gap-x-2 justify-center">
          Update Info {isLoading && <Spinner className="w-6 h-6" />}
        </button>
      </form>
    </Modal>
  );
};

// password change Modal
const ChangePassword = ({ openChangePassword, setOpenChangePassword }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const passwordData = {
      student: openChangePassword?.student,
      ...data,
    };
    const changePass = async () => {
      const res = await axios.post(`/student/change_password`, passwordData);
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

// Assign New Plan
const AssignNewPlan = ({ openAssignNewPlan, setOpenAssignNewPlan }) => {
  const [planActive, setPlanActive] = useState("immediate");
  const [plansData, setPlansData] = useState([]);
  const [plan, setPlan] = useState({});
  const plans = plansData?.map((item) => ({
    id: item?.id,
    name: item?.plan?.title,
    planId: item?.plan?.id,
  }));

  // get plans
  useEffect(() => {
    const getPlans = async () => {
      const res = await axios.get("/plans");
      setPlansData(res?.data);
    };
    getPlans();
  }, [openAssignNewPlan]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const planData = {
      student: openAssignNewPlan?.student,
      plan: plan?.planId,
      // Immediate: "",
    };
    const AssignPlan = async () => {
      const res = await axios.post("/plan/assign", planData);
      toast.success(res?.data?.message);
      setOpenAssignNewPlan({
        state: false,
        student: null,
      });
      reset();
    };
    AssignPlan();
  };
  return (
    <Modal
      title="Assign New Plan"
      visible={openAssignNewPlan?.state}
      onClose={() => {
        setOpenAssignNewPlan({
          state: false,
          student: null,
        });
        reset();
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          errors={errors}
          className="mb-2"
          label="Current Plan"
          placeholder="Free"
          register={register}
          name="plan"
          isReadOnly
        />
        <Select
          label="Choose Plan *"
          className="mb-2"
          items={plans}
          value={plan}
          onChange={setPlan}
        />
        <div className="flex items-center gap-x-4 my-4">
          <button
            onClick={() => setPlanActive("immediate")}
            type="button"
            className="flex items-center gap-x-2 text-xs font-bold"
          >
            {planActive === "immediate" ? (
              <RiRadioButtonFill className="text-xl text-[#98E9AB]" />
            ) : (
              <CgRadioCheck className="text-xl text-black dark:text-white" />
            )}
            Immediate Assign
          </button>
          <button
            onClick={() => setPlanActive("after")}
            type="button"
            className="flex items-center gap-x-2 text-xs font-bold"
          >
            {planActive === "after" ? (
              <RiRadioButtonFill className="text-xl text-[#98E9AB]" />
            ) : (
              <CgRadioCheck className="text-xl text-black dark:text-white" />
            )}
            Start After Current Plan End
          </button>
        </div>
        <button className="bg-primary py-3 text-base font-bold w-full">
          Update Plan
        </button>
      </form>
    </Modal>
  );
};
