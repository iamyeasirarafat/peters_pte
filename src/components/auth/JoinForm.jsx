import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";

const JoinForm = () => {
  const [country, setCountry] = useState([]);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (data.password !== data.confirm_password) {
      setError("confirm_password", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    console.log(data);
  };
  // get all country
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountry(data));
  }, []);

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
        <div className="flex items-center gap-x-3">
          <input
            className={`bg-white w-full text-[#616161] placeholder:text-[#B9B9B9] py-3 px-4 border ${
              errors?.first_name && "border-red-700"
            } border-[#B9B9B9] rounded-[16px] outline-none`}
            {...register("first_name", {
              required: "First name is required",
            })}
            type="text"
            placeholder="Name"
          />
          <input
            className={`bg-white w-full text-[#616161] placeholder:text-[#B9B9B9] py-3 px-4 border ${
              errors?.email && "border-red-700"
            } border-[#B9B9B9] rounded-[16px] outline-none`}
            {...register("email", {
              required: "Email is required",
            })}
            type="email"
            placeholder="myiosio@gmail.com"
          />
        </div>
        <div className="flex items-center gap-x-3">
          <select
            className={`bg-white w-2/5 text-[#616161] placeholder:text-[#B9B9B9] py-3 px-4 border ${
              errors?.country && "border-red-700"
            } border-[#B9B9B9] rounded-[16px] outline-none`}
            {...register("country", {
              required: "Country is required",
            })}
          >
            <option value="">Country</option>
            {country?.map((country, i) => (
              <option key={i} value={country?.name?.common}>
                {country?.name?.common}
              </option>
            ))}
          </select>

          <input
            className={`bg-white w-full text-[#616161] placeholder:text-[#B9B9B9] py-3 px-4 border ${
              errors?.phone && "border-red-700"
            } border-[#B9B9B9] rounded-[16px] outline-none`}
            {...register("phone", {
              required: "Phone number is required",
            })}
            type="number"
            placeholder="01739398952"
          />
        </div>
        <div className="flex items-center gap-x-3">
          <div className="relative w-full">
            <input
              className={`bg-white w-full text-[#616161] placeholder:text-[#B9B9B9] py-3 px-4 border ${
                errors?.password && "border-red-700"
              } border-[#B9B9B9] rounded-[16px] outline-none`}
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
              className={`bg-white w-full text-[#616161] placeholder:text-[#B9B9B9] py-3 px-4 border ${
                errors?.confirm_password && "border-red-700"
              } border-[#B9B9B9] rounded-[16px] outline-none`}
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
          {errors.password &&
            errors?.password?.message === "8 characters minimum" && (
              <li className={`list-disc ml-5 text-sm text-[#849900]`}>
                {errors?.password?.message}
              </li>
            )}
          {errors.password &&
            errors?.password?.message === "Upper & lower case letters" && (
              <li className={`list-disc ml-5 text-sm text-[#849900]`}>
                {errors?.password?.message}
              </li>
            )}
          {errors.password && errors?.password?.message === "A symbol" && (
            <li className={`list-disc ml-5 text-sm text-[#849900]`}>
              {errors?.password?.message}
            </li>
          )}
          {errors.confirm_password && errors?.confirm_password?.message && (
            <li className={`list-disc ml-5 text-sm text-[#849900]`}>
              {errors?.confirm_password?.message}
            </li>
          )}
        </ul>
      </div>
      {/* login button */}
      <button
        type="submit"
        className="py-5 w-full mt-2 font-semibold text-3xl text-center text-white bg-[#4399FF] rounded-[22px]"
      >
        Join Now
      </button>
    </form>
  );
};

export default JoinForm;
