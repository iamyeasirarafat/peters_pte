import Field from "@/components/Field";
import Image from "@/components/Image";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import { PhoneNumberInput } from "@/components/Students_list/Row";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import { BiLoader, BiSolidEditAlt } from "react-icons/bi";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FiUpload } from "react-icons/fi";
import { getUser } from "@/redux/slice/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
function Index() {
  return (
    <Layout title="Profile Settings">
      <ProfileMain />
    </Layout>
  );
}

export default Index;

export const ProfileMain = () => {
  const [fetch, setFetch] = useState(false);
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch, fetch]);
  return (
    <>
      <div className="grid grid-cols-12 gap-x-20">
        <div className="col-span-4">
          <StudentProfileInfo data={user} setFetch={setFetch} />
        </div>
        <div className="col-span-8">
          <StudentDetailsRight data={user} />
        </div>
      </div>
    </>
  );
};

const StudentProfileInfo = ({ data, setFetch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [editData, setEditData] = useState({});
  const handelImageChange = async (e) => {
    const formData = new FormData();
    formData.append("picture", e.target.files[0]);
    if (e.target.files[0] !== undefined) {
      try {
        setIsLoading(true);
        const res = await axios.post(`/user/picture/upload`, formData);
        toast.success("Profile image update success");
        setFetch((prev) => !prev);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
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
              className="w-full h-full rounded-full object-cover"
              src={data?.picture || "/images/img-2.jpg"}
              width={1000}
              height={1000}
              alt=""
            />
          </div>
          <input
            className="hidden"
            onChange={(e) => handelImageChange(e)}
            type="file"
            id="profile_image"
          />
          <div className="group-hover:opacity-100 opacity-0 duration-200 absolute bottom-0 right-0 bg-[#f2b2777c] rounded-full w-full h-full">
            <FiUpload className="absolute top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xl" />
          </div>
          {isLoading && (
            <div className="absolute top-0 right-0 bg-[#f2b277af] rounded-full w-full h-full">
              <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <BiLoader className="animate-spin text-white text-2xl" />
              </p>
            </div>
          )}
        </label>
        <div>
          <h2 className="text-xl font-extrabold">{data?.full_name}</h2>
        </div>
      </div>
      <hr className="border-dotted border-black" />
      <div>
        <p className="text-sm">Email</p>
        <p className="text-sm font-bold">{data?.email}</p>
      </div>
      <div>
        <p className="text-sm">Phone</p>
        <p className="text-sm font-bold">{data?.phone}</p>
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
      </div>
      <EditProfile {...{ visible, setVisible, editData, setFetch }} />
    </div>
  );
};

const StudentDetailsRight = ({ data }) => {
  const [openChangePassword, setOpenChangePassword] = useState(false);
  return (
    <div>
      {/* Security */}
      <div className="bg-white dark:bg-black p-5 mt-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-extrabold">Security</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpenChangePassword(true)}
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
      </div>
    </div>
  );
};

const EditProfile = ({ visible, setVisible, editData, setFetch }) => {
  const [loading, setLoading] = useState(false);
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
    }
  }, [editData, setValue]);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await axios.put("/user/profile/update", data);
      toast.success("Successfully Updated");
      setVisible(false);
      setLoading(false);
      setFetch((prev) => !prev);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Update Profile"
      visible={visible}
      onClose={() => setVisible(false)}
    >
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <Field
          errors={errors}
          className="mb-4"
          label="Full Name"
          placeholder="Enter name"
          register={register}
          name="full_name"
        />

        <Field
          errors={errors}
          className="mb-4"
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
        <button
          disabled={loading}
          className="btn-purple  w-full mt-4  flex items-center justify-center gap-x-3"
        >
          {loading && (
            <div className="w-4 h-4 rounded-full border-2 border-t-white border-r-white animate-spin" />
          )}
          Update Info
        </button>
      </form>
    </Modal>
  );
};

const ChangePassword = ({ openChangePassword, setOpenChangePassword }) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const passwordData = {
      ...data,
    };
    try {
      setLoading(true);
      const res = await axios.put(`/user/password/change`, passwordData);
      setOpenChangePassword(false);
      reset();
      toast.success(res?.data?.message);
      setLoading(false);
    } catch (error) {
      const key = Object.keys(error?.response?.data)[0];
      const value = error?.response?.data[key];
      toast.error(value);
      setLoading(false);
    }
  };
  return (
    <Modal
      title="Change Password"
      visible={openChangePassword}
      onClose={() => {
        setOpenChangePassword(false);
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
          name="new_pass"
          required
        />
        <Field
          errors={errors}
          className="mb-4"
          label="Current Password *"
          placeholder="Enter your Current password"
          type="password"
          register={register}
          name="current_pass"
          required
        />
        <button
          disabled={loading}
          className="bg-primary py-3 text-base font-bold w-full flex items-center justify-center gap-x-3"
        >
          {loading && (
            <div className="w-4 h-4 rounded-full border-2 border-t-white border-r-white animate-spin" />
          )}
          Update Password
        </button>
      </form>
    </Modal>
  );
};
