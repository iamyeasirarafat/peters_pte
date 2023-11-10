
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Spinner from "../Spinner/Spinner";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // react hook form
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.post("/auth/token", data);

      if (res?.data?.access) {
        setCookie("access_token", res?.data?.access, { maxAge: 60 * 60 });
      }
      if (res?.data?.refresh) {
        setCookie("refresh_token", res?.data?.refresh, {
          maxAge: 60 * 60 * 24,
        });
      }
      setIsLoading(false);
      router.push("/app");
    } catch (e) {
      if (e?.response?.data?.error) {
        setError("email", {
          type: "manual",
          message: e?.response?.data?.error,
        });
      }
      if (e?.response?.data?.error) {
        setError("password", {
          type: "manual",
          message: e?.response?.data?.error,
        });
      }
    }
  };
  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="p-4 space-y-2 bg-[#FFF4EB] rounded-[32px] w-full">
        <div className="w-full">
          <input
            className={`bg-white w-full text-[#616161] placeholder:text-[#B9B9B9] py-3 px-4 border ${errors.email ? "border-red" : "border-[#B9B9B9] "
              } rounded-[16px] outline-none`}
            {...register("email", {
              required: "Password is required",
            })}
            type="email"
            placeholder="Email Address"
          />
        </div>
        <div className="relative w-full">
          <input
            className={`bg-white w-full text-[#616161] placeholder:text-[#B9B9B9] py-3 px-4 border ${errors.password ? "border-red" : "border-[#B9B9B9] "
              } rounded-[16px] outline-none`}
            {...register("password", {
              required: "Password is required",
            })}
            type={showPass === true ? "text" : "password"}
            placeholder="Password"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {showPass === true ? (
              <FiEye
                className="text-xl cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              />
            ) : (
              <FiEyeOff
                className="text-xl cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              />
            )}
          </div>
        </div>
        {errors.email && errors?.email?.message && (
          <li className={`list-disc ml-5 text-sm text-red`}>
            {errors?.email?.message}
          </li>
        )}
      </div>
      {/* login button */}
      <button
        type="submit"
        className="py-5 w-full flex items-center gap-x-3 justify-center mt-2 font-semibold text-3xl text-white bg-[#4399FF] rounded-[22px]"
      >
        Login {isLoading && <Spinner />}
      </button>
    </form>
  );
};

export default Login;
