import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Spinner from "@/components/Spinner/Spinner";
import { PhoneNumberInputJoin } from "@/components/Students_list/Row";

const JoinForm = ({ setPage }) => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    if (data.password !== data.confirm_password) {
      setError("confirm_password", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    try {
      setIsLoading(true);
      const res = await axios.post("/auth/user/join", data);
      if (res.statusText === "OK") {
        toast.success("Account successfully created. Please log in");
        setIsLoading(false);
        setPage("login");
      }
    } catch (e) {
      setIsLoading(false);
      Object.keys(e?.response?.data).length > 0 &&
        Object.keys(e?.response?.data).map((item) => {
          if (item === "email") {
            setError("email", {
              type: "manual",
              message: e?.response?.data["email"][0],
            });
          } else if (item === "phone") {
            setError("phone", {
              type: "manual",
              message: e?.response?.data["phone"][0],
            });
          } else {
            setError("custom", {
              type: "manual",
              message: "something went wrong, Please try again later",
            });
          }
        });
    }
  };

  // Custom validation function to check for uppercase, lowercase, and symbol
  const validatePassword = (value) => {
    const caseRegex = /^(?=.*?[A-Z])(?=.*?[a-z]).*$/;
    const symbolRegex = /^(?=.*[!@#$%^&*])/;
    if (value.length < 8) {
      return "8 characters minimum";
    } else if (!caseRegex.test(value)) {
      return "Upper & lower case letters";
    } else if (!symbolRegex.test(value)) {
      return "A symbol";
    }
    return true;
  };
  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="p-4 space-y-2 bg-[#FFF4EB] rounded-[32px] w-full">
        <div className="flex md:flex-col flex-row items-center gap-3">
          <input
            className={`bg-white w-full text-[#616161] placeholder:text-[#B9B9B9] py-3 px-4 ${
              errors?.full_name ? "border-red" : "border-[#B9B9B9]"
            }  rounded-[16px] outline-none`}
            {...register("full_name", {
              required: "First name is required",
            })}
            type="text"
            placeholder="Name"
          />
          <input
            className={`bg-white w-full text-[#616161] placeholder:text-[#B9B9B9] py-3 px-4 ${
              errors?.email ? "border-red" : "border-[#B9B9B9]"
            }  rounded-[16px] outline-none`}
            {...register("email", {
              required: "Email is required",
            })}
            type="email"
            placeholder="myiosio@gmail.com"
          />
        </div>

        {/* phone */}
        <PhoneNumberInputJoin name="phone" control={control} errors={errors} />
        {/* pass */}
        <div className="flex md:flex-col flex-row items-center gap-3">
          <div className="relative w-full">
            <input
              className={`bg-white w-full text-[#616161] placeholder:text-[#B9B9B9] py-3 px-4 ${
                errors?.password ? "border-red" : "border-[#B9B9B9]"
              }  rounded-[16px] outline-none`}
              {...register("password", {
                required: "Password is required",
                validate: validatePassword,
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
          <div className="relative w-full">
            <input
              className={`bg-white w-full text-[#616161] placeholder:text-[#B9B9B9] py-3 px-4 ${
                errors?.confirm_password ? "border-red" : "border-[#B9B9B9]"
              }  rounded-[16px] outline-none`}
              {...register("confirm_password", {
                required: "Password is required",
              })}
              type={showConfirm === true ? "text" : "password"}
              placeholder="Confirm Password"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {showConfirm === true ? (
                <FiEye
                  className="text-xl cursor-pointer"
                  onClick={() => setShowConfirm(!showConfirm)}
                />
              ) : (
                <FiEyeOff
                  className="text-xl cursor-pointer"
                  onClick={() => setShowConfirm(!showConfirm)}
                />
              )}
            </div>
          </div>
        </div>
        <ul>
          {errors.password && errors?.password?.message && (
            <li className={`list-disc ml-5 text-sm text-red`}>
              {errors?.password?.message}
            </li>
          )}
          {errors.email && errors?.email?.message && (
            <li className={`list-disc ml-5 text-sm text-red`}>
              {errors?.email?.message}
            </li>
          )}
          {errors.phone && errors?.phone?.message && (
            <li className={`list-disc ml-5 text-sm text-red`}>
              {errors?.phone?.message}
            </li>
          )}
          {errors.custom && errors?.custom?.message && (
            <li className={`list-disc ml-5 text-sm text-red`}>
              {errors?.custom?.message}
            </li>
          )}
          {/* {errors.password &&
            errors?.password?.message === "Upper & lower case letters" && (
              <li className={`list-disc ml-5 text-sm text-red`}>
                {errors?.password?.message}
              </li>
            )}
          {errors.password && errors?.password?.message === "A symbol" && (
            <li className={`list-disc ml-5 text-sm text-red`}>
              {errors?.password?.message}
            </li>
          )} */}
          {errors.confirm_password && errors?.confirm_password?.message && (
            <li className={`list-disc ml-5 text-sm text-red`}>
              {errors?.confirm_password?.message}
            </li>
          )}
        </ul>
      </div>
      {/* login button */}
      <button
        type="submit"
        className="py-5 w-full mt-2 font-semibold text-3xl flex items-center gap-x-3 justify-center text-white bg-[#4399FF] rounded-[22px]"
      >
        Join Now {isLoading && <Spinner />}
      </button>
    </form>
  );
};

export default JoinForm;
