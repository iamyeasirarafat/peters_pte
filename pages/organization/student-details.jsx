import Select from "@/components/AddStudentSelect";
import Countdown from "@/components/Countdown";
import Field from "@/components/Field";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import Sorting from "@/components/Sorting";
import Spinner from "@/components/Spinner/Spinner";
import { PhoneNumberInput } from "@/components/Students_list/Row";
import TablePagination from "@/components/TablePagination";
import LineProgressBar from "@/components/global/LineProgressBar";
import ReusableModal from "@/components/global/ReusableModal";
import { useHydrated } from "@/hooks/useHydrated";
import { calculateDaysLeft } from "@/utils/calculateDaysLeft";
import { formatDateTime } from "@/utils/formatDateTime";
import { formatDateWithName } from "@/utils/formatDateWithName";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BiRightArrowAlt, BiSolidEditAlt } from "react-icons/bi";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { CgRadioCheck } from "react-icons/cg";
import { FiAward, FiTrendingUp, FiUpload } from "react-icons/fi";
import { IoIosCall, IoMdMail } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { RiRadioButtonFill, RiSettings2Fill } from "react-icons/ri";
import { useMediaQuery } from "react-responsive";

export default function StudentDetails() {
  const [fetch, setFetch] = useState(false);
  const router = useRouter();
  const id = router.query.id;
  const [studentDetails, setStudentDetails] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios("/student/" + id);
      setStudentDetails(res?.data);
    };
    router.isReady && fetchData();
  }, [id, router, fetch]);
  return (
    <Layout title="Student Details" back>
      <StudentsDetailsMain
        studentDetails={studentDetails}
        setFetch={setFetch}
      />
    </Layout>
  );
}

export const StudentsDetailsMain = ({ studentDetails, setFetch }) => {
  return (
    <div className="grid grid-cols-12 gap-x-20">
      <div className="col-span-4">
        <StudentProfileInfo data={studentDetails} setFetch={setFetch} />
      </div>
      <div className="col-span-8">
        <StudentDetailsRight data={studentDetails} />
      </div>
      {/* <ProgressModal /> */}
    </div>
  );
};

const StudentProfileInfo = ({ data, setFetch }) => {
  const [openUpdateInformation, setOpenUpdateInformation] = useState({
    state: false,
    data: null,
  });
  const handelImageChange = (e) => {
    const formData = new FormData();
    formData.append("picture", e.target.files[0]);
    try {
      const res = axios.post(`/user/picture/upload`, formData);
      setFetch((prev) => !prev);
      toast.success("Profile image update success");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <label
          htmlFor="profile_image"
          className="group cursor-pointer relative w-21 h-21 inline-block"
        >
          <div className="w-21 h-21 rounded-full overflow-hidden">
            <Image
              className="w-full h-full object-cover"
              src={"/images/img-2.jpg"}
              width={1000}
              height={1000}
              alt=""
            />
          </div>
          <input
            className="hidden"
            // onChange={(e) => handelImageChange(e)}
            type="file"
            name=""
            id="profile_image"
          />
          <div className="group-hover:opacity-100 opacity-0 duration-200 absolute bottom-0 right-0 bg-[#f2b2777c] rounded-full w-full h-full">
            <FiUpload className="absolute top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xl" />
          </div>
        </label>

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
        <p className="text-sm font-bold">
          {data?.profile[0]?.group?.name || "Not Available"}
        </p>
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
  const router = useRouter();
  const [openChangePassword, setOpenChangePassword] = useState({
    state: false,
    student: null,
  });
  const [openAssignNewPlan, setOpenAssignNewPlan] = useState({
    state: false,
    student: null,
  });
  const [openExamCountDown, setOpenExamCountDown] = useState({
    state: false,
    uid: null,
  });
  const [openTargetScore, setOpenTargetScore] = useState({
    state: false,
    uid: null,
  });
  const [examDate, setExamDate] = useState("");
  const [score, setScore] = useState(0);
  const [reFetch, setRefetch] = useState(false);
  const { mounted } = useHydrated();
  const isTablet = useMediaQuery({
    query: "(max-width: 1023px)",
  });
  useEffect(() => {
    const getExamDate = async () => {
      const res = await axios.get(`/exam_countdown?uid=${data?.id}`);
      setExamDate(res?.data);
    };
    const getScore = async () => {
      const res = await axios.get(`/target_score?uid=${data?.id}`);
      setScore(res?.data);
    };
    router.isReady && data?.id && getExamDate();
    router.isReady && data?.id && getScore();
  }, [reFetch, data?.id, router.isReady]);

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
          <button
            disabled={router?.asPath?.startsWith("/admin")}
            onClick={() => setOpenExamCountDown({ state: true, uid: data?.id })}
            className="bg-gold text-white text-base leading-none py-2.5 px-3.5 rounded-[50px]"
          >
            Exam Count Down
          </button>
          <p className="text-xl font-medium text-gray dark:text-white">
            {examDate?.exam_date ? (
              <Countdown targetDate={examDate?.exam_date} />
            ) : (
              <p>Not set Exam date</p>
            )}
          </p>
          <RiSettings2Fill className="text-xl text-cream" />
        </div>
        <div className="p-1.5 bg-white dark:bg-black rounded-[50px] flex items-center gap-x-2 border border-primary">
          <button
            disabled={router?.asPath?.startsWith("/admin")}
            onClick={() => setOpenTargetScore({ state: true, uid: data?.id })}
            className="bg-cream text-white text-base leading-none py-2.5 px-3.5 rounded-[50px]"
          >
            Target Score
          </button>
          <p className="text-3xl font-medium text-gray dark:text-white">
            {score?.score}+
          </p>
          <RiSettings2Fill className="text-xl text-cream" />
        </div>
        <ExamCountDown
          openExamCountDown={openExamCountDown}
          setOpenExamCountDown={setOpenExamCountDown}
          setRefetch={setRefetch}
        />
        <TargetScore
          openTargetScore={openTargetScore}
          setOpenTargetScore={setOpenTargetScore}
          setRefetch={setRefetch}
        />
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
export const UpdateInformation = ({
  openUpdateInformation,
  setOpenUpdateInformation,
  setFetch,
}) => {
  const genders = [
    { id: 1, name: "male" },
    { id: 2, name: "female" },
  ];
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState({});
  const [gender, setGender] = useState(genders[0]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGroup = async () => {
      const formattedGroup = [
        {
          id: null,
          name: "None"
        }
      ]
      const res = await axios("/groups");
      formattedGroup.push(...res.data?.results);
      setGroups(formattedGroup)
    };
    fetchGroup();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const updateData = {
      ...data,
      ...(group?.id && { group: group.id }),
      organization: openUpdateInformation?.data?.profile[0]?.organization?.id,
      profile: {
        gender: gender?.name,
        ...data?.profile,
      },
    };
    try {
      setLoading(true);
      const res = await axios.put(
        `/student/${openUpdateInformation?.data?.id}/update`,
        updateData
      );
      toast.success(res?.data?.success);
      setOpenUpdateInformation({ state: false, data: null });
      reset();
      setFetch((prev) => !prev);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error?.data?.response?.message || "Something went wrong");
    }
  };

  // set Default value
  useEffect(() => {
    setValue("full_name", openUpdateInformation?.data?.full_name);
    setValue("email", openUpdateInformation?.data?.email);
    setValue("phone", openUpdateInformation?.data?.phone);
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
    setGroup(openUpdateInformation?.data?.profile[0]?.group);
  }, [openUpdateInformation?.data, groups, setValue]);

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
        <PhoneNumberInput
          label="Phone Number"
          name="phone"
          control={control}
          errors={errors}
        />
        <Field
          errors={errors}
          className="my-2"
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
          Update Information {isLoading && <Spinner className="w-6 h-6" />}
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
  const onSubmit = async (data) => {
    const passwordData = {
      student: openChangePassword?.student,
      ...data,
    };
    try {
      const res = await axios.post(`/student/change_password`, passwordData);
      setOpenChangePassword({ state: false, student: null });
      reset();
      toast.success(res?.data?.message);
    } catch (error) {
      const key = Object?.keys(error?.response?.data)[0];
      const value = error?.response?.data[key];
      toast.error(value);
    }
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
    name: item?.title,
    planId: item?.id,
  }));

  // get plans
  useEffect(() => {
    const getPlans = async () => {
      const res = await axios.get("/packages/student");
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

const ExamCountDown = ({
  openExamCountDown,
  setOpenExamCountDown,
  setRefetch,
}) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const examDate = {
      exam_date: data?.exam_date,
      student: openExamCountDown?.uid,
    };
    try {
      setLoading(true);
      const res = await axios.post("/exam_countdown", examDate);
      setOpenExamCountDown({ state: false, uid: null });
      toast.success("Countdown added success");
      setRefetch((prev) => !prev);
      setLoading(false);
      reset();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };
  return (
    <Modal
      title="Exam Countdown"
      visible={openExamCountDown?.state}
      onClose={() => {
        setOpenExamCountDown({ state: false, uid: null });
        reset();
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          errors={errors}
          className="mb-2"
          label="Exam Date"
          placeholder="05/07/23"
          register={register}
          name="exam_date"
          type="datetime-local"
        />
        <button
          disabled={loading}
          className="bg-primary disabled:opacity-70 py-3 text-base font-bold w-full flex items-center justify-center gap-x-2"
        >
          Update Plan {loading && <Spinner className="w-6 h-6" />}
        </button>
      </form>
    </Modal>
  );
};

const TargetScore = ({ openTargetScore, setOpenTargetScore, setRefetch }) => {
  const scores = [
    { id: null, name: "None" },
    { id: 1, name: "35" },
    { id: 2, name: "55" },
    { id: 3, name: "75" },
    { id: 4, name: "90" },
  ];
  const [score, setScore] = useState(scores[0]);
  const [loading, setLoading] = useState(false);
  const { handleSubmit, reset } = useForm();
  const onSubmit = () => {
    const scoreData = {
      score: score?.name,
      student: openTargetScore?.uid,
    };
    try {
      setLoading(true);
      const res = axios.post("/target_score", scoreData);
      setOpenTargetScore({ state: false, uid: null });
      toast.success("Score added success");
      setRefetch((prev) => !prev);
      setLoading(false);
      reset();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };
  return (
    <Modal
      title="Target Score"
      visible={openTargetScore?.state}
      onClose={() => {
        setOpenTargetScore({ state: false, uid: null });
        reset();
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Select
          label="Target Score*"
          className="mb-4"
          items={scores}
          value={score}
          onChange={setScore}
        />
        <button
          disabled={loading}
          className="bg-primary disabled:opacity-70 py-3 text-base font-bold w-full flex items-center justify-center gap-x-2"
        >
          Update Plan {loading && <Spinner className="w-6 h-6" />}
        </button>
      </form>
    </Modal>
  );
};

// student progress & performance

const ProgressModal = ({ data }) => {
  const [open, setOpen] = useState(true);
  const [tab, setTab] = useState("performance");
  return (
    <div>
      <ReusableModal open={open} setOpen={setOpen}>
        <div className="bg-[#faf4f0] w-[1240px] mx-auto p-4 rounded-md">
          <div className="flex items-center justify-between">
            <p className="text-lg font-extrabold">Progress & Performance</p>
            <IoCloseSharp
              onClick={() => setOpen(false)}
              className="text-xl cursor-pointer text-red hover:text-primary duration-200"
            />
          </div>

          <div className="flex justify-between mt-4">
            {/* tabs */}
            <div className="flex items-center gap-x-4 w-full">
              <button
                onClick={() => setTab("performance")}
                className={` ${tab === "performance" ? "bg-[#849C3E] text-white" : "bg-white"
                  } p-2.5 text-xl text-center rounded border border-[#849C3E]`}
              >
                <p className="leading-none">Your Performance</p>
                <FiAward className="text-2xl inline-block mt-2" />
              </button>
              <button
                onClick={() => setTab("progress")}
                className={`${tab === "progress" ? "bg-blue text-white" : "bg-white"
                  } p-2.5 text-xl text-center rounded border border-blue`}
              >
                <p className="leading-none">Practice Progress</p>
                <FiTrendingUp className="text-2xl inline-block mt-2" />
              </button>
            </div>
            <div className="w-full flex flex-col items-end gap-2">
              <select className="appearance-none py-2 px-3 bg-white rounded-md border focus:ring-primary focus:border-primary w-1/5 border-primary">
                <option value="all-time">All Time</option>
              </select>
              <p className="text-gray text-base">Last updated on 25/07/2023</p>
            </div>
          </div>
          {/*  */}
          <div className="bg-secondary border border-primary mt-4 pb-2.5 rounded-md font-cabin">
            <p className="py-2.5 text-gray text-xl text-center font-medium">
              All Time Progress
            </p>
            {/*  */}
            <div className="px-2.5">
              <div className="bg-white rounded-md p-2.5 grid grid-cols-5 gap-x-2">
                <Progress />
                <Progress />
                <Progress />
                <Progress />
                <Progress />
              </div>
            </div>
            <hr className="border border-primary my-2.5" />
          </div>
        </div>
      </ReusableModal>
    </div>
  );
};

const Progress = ({ data }) => {
  return (
    <div className="rounded-xl border border-primary p-3 bg-white text-start">
      <p className="text-base text-gray">Mock Test Questions</p>
      <p className="text-4xl font-bold text-red">52/475</p>
      <LineProgressBar height={8} lineColor={"red"} strokeWidth={50} />
    </div>
  );
};
