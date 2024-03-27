import Empty from "@/components/Empty";
import Field from "@/components/Field";
import Icon from "@/components/Icon";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import OrganizationList from "@/components/OrganizationList";
import { PhoneNumberInput } from "@/components/Students_list/Row";
import TablePagination from "@/components/TablePagination";
import { toggle } from "@/redux/slice/refetchSlice";
import { Listbox, Transition } from "@headlessui/react";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { default as toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import countryList from "react-select-country-list";
import { twMerge } from "tailwind-merge";
const Organizations = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(true);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const pageLimit = 9;
  const { state } = useSelector((state) => state.refetch);

  useEffect(() => {
    const getData = async () => {
      const res = await axios(
        `/organizations?limit=${pageLimit}&page=${pageNumber}`
      );
      setData(res.data);
      setLoading(false);
    };
    getData();
  }, [pageNumber, status, state]);

  return (
    <Layout title="Organizations" background>
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div
            className="w-12 h-12 rounded-full animate-spin
                  border-x-8 border-solid border-orange-400 border-t-transparent"
          ></div>
        </div>
      ) : data?.results?.length > 0 ? (
        <>
          <OrganizationList setStatus={setStatus} items={data?.results} />
          <TablePagination
            pageNumber={pageNumber}
            totalPage={Math.ceil(data?.total / pageLimit)}
            prevNext={setPageNumber}
          />
        </>
      ) : (
        <EmptyPage setStatus={setStatus} />
      )}
    </Layout>
  );
};

export default Organizations;

const EmptyPage = ({ setStatus }) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Empty
        title="No Organization found?"
        imageSvg={
          <svg
            className="fill-n-1 dark:fill-white"
            xmlns="http://www.w3.org/2000/svg"
            width="63"
            height="84"
            viewBox="0 0 63 84"
          >
            <path d="M28.718.02C21.91.709 15.764 4.488 12.427 10.589c-3.45 6.307-3.188 14.053.571 20.182 7.905 12.887 27.093 13.619 36.543 2.073 3.04-3.714 5.143-8.267 4.253-13.169-.729-4.018-4.057-7.984-8.235-8.563-2.648-.367-5.644.641-6.315 3.598-.55 2.424.74 5.944 3.586 6.338.226.031.445.081.669.117.673.108-.238-.058-.184-.118-.274.307 1.331.054.052-.008l.159.164c.199.217.212.22.039.009-.21.092.068-.255.119.242-.008-.075-.242-.742-.054-.166.072.22.139.442.187.67-.122-.59-.026-.136-.047.208 0-.004-.119.864-.031.428.104-.517-.197.592-.225.686-.16.527-.05.228.004.095-.106.262-.253.517-.387.765a17.59 17.59 0 0 1-.882 1.43c-.323.481-.038.079.034-.014a13.84 13.84 0 0 1-.844.967 18.14 18.14 0 0 1-1.098 1.079 17.88 17.88 0 0 1-.581.505c.086-.072.498-.365.022-.023-.971.699-2.011 1.312-3.101 1.805-.544.246-.057.015.044-.023l-.725.255a18.05 18.05 0 0 1-1.478.421c-.243.058-1.741.293-.907.207a17.2 17.2 0 0 1-1.842.089 17.73 17.73 0 0 1-1.597-.079c-.882-.084.65.137-.219-.04l-.783-.163c-.519-.122-1.033-.267-1.539-.435a14.32 14.32 0 0 1-.752-.271c-.808-.32.535.278-.237-.12a20.12 20.12 0 0 1-1.622-.913c-.159-.102-1.149-.852-.675-.456a15.1 15.1 0 0 1-1.169-1.093c-.186-.192-.361-.393-.539-.592-.222-.269-.233-.269-.033.001l-.309-.436a19.12 19.12 0 0 1-.838-1.366c-.091-.167-.632-1.319-.383-.706a13.92 13.92 0 0 1-.569-1.779c-.065-.253-.307-1.734-.234-.991a14.22 14.22 0 0 1-.065-1.599c.005-.323.126-1.495-.016-.58.085-.544.209-1.083.36-1.613.079-.278.573-1.58.211-.763.256-.575.555-1.135.882-1.673a15.64 15.64 0 0 1 .384-.598c.052-.077.615-.827.299-.434-.334.416.173-.183.201-.212l.649-.692c.195-.196 1.47-1.295.75-.746a14.16 14.16 0 0 1 2.841-1.679c-.821.364.663-.185.988-.271.315-.083 1.955-.32.959-.219 2.664-.269 5.267-2.177 5.134-5.152-.114-2.56-2.272-5.441-5.134-5.152h0zm-18.37 75.785c-.1-5.584-.543-12.502 3.38-17.023s11.477-3.38 16.77-3.329l11.096.109c.769.008 1.557-.041 2.324.03 2.475.228-.262.095.323-.454a225.67 225.67 0 0 1 1.453 3.879l7.059 21.382c2.091 6.334 12.066 3.619 9.957-2.772l-4.392-13.304c-1.433-4.341-2.567-8.966-4.481-13.12-2.065-4.483-6.107-5.935-10.729-6.052-4.536-.116-9.081-.089-13.618-.134-8.103-.08-17.128-.159-23.063 6.392C.357 58.11-.131 67.187.022 75.805c.12 6.701 10.446 6.723 10.326 0z" />
          </svg>
        }
        buttonText="Add new Student"
        onClick={() => setVisible(true)}
      />
      <AddOrgModal
        setStatus={setStatus}
        visible={visible}
        setVisible={setVisible}
      />
    </>
  );
};

export const AddOrgModal = ({ visible, setVisible, setStatus }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({});
  const [country, setCountry] = useState("");
  const countries = useMemo(() => countryList().getData(), []);
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    if (country !== "") {
      try {
        await axios.post("/organization/add", { ...data, country: country });
        toast.success("Successfully added");
        setVisible(false);
        setStatus && setStatus(Math.random());
        dispatch(toggle());
      } catch (err) {
        const key = Object.keys(err?.response?.data)[0];
        const value = err?.response?.data[key];
        toast.error(`${key} - ${value}`);
      }
    } else {
      toast.error("Country is required");
    }
  };

  return (
    <Modal
      title="Add Organization"
      visible={visible}
      onClose={() => setVisible(false)}
    >
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <Field
          errors={errors}
          className="mb-4"
          label="organization Name *"
          placeholder="Enter  name"
          required
          register={register}
          name="full_name"
        />
        <Field
          errors={errors}
          className="mb-4"
          label="User ID *"
          placeholder="Enter User ID"
          required
          register={register}
          name="userid"
        />
        <Field
          errors={errors}
          className="mb-4"
          label="Password *"
          placeholder="Enter Password"
          type="password"
          register={register}
          name="password"
          required
        />
        <Field
          errors={errors}
          className="mb-6"
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
          className="my-4"
          label="Owner Name"
          placeholder="Enter Owner Name"
          register={register}
          name="org_name"
        />
        {/* <Field
          errors={errors}
          className="mb-6"
          label="Country"
          placeholder="Enter Country"
          register={register}
          name="country"
        /> */}
        <SelectCountry
          errors={errors}
          className="mb-6"
          label="Country"
          placeholder="Enter Country"
          items={countries}
          value={country}
          onChange={setCountry}
        />
        <button className="btn-purple  w-full">Add Organization</button>
      </form>
    </Modal>
  );
};

export const SelectCountry = ({
  label,
  className,
  classButton,
  classArrow,
  classOptions,
  classOption,
  placeholder,
  items,
  value,
  onChange,
  up,
  small,
}) => (
  <div className={`relative ${className}`}>
    {label && <div className="mb-3 text-xs font-bold">{label}</div>}
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <>
          <Listbox.Button
            className={twMerge(
              `flex items-center w-full h-16 px-5 bg-white border-none rounded-sm text-sm text-n-1 font-bold outline-none transition-colors tap-highlight-color dark:bg-n-1 dark:border-white dark:text-white ${small ? "h-6 px-4 text-xs" : ""
              } ${open ? "border-purple-1 dark:border-purple-1" : ""
              } ${classButton}`
            )}
          >
            <span className="mr-auto truncate">
              {value ? (
                value
              ) : (
                <span className="text-n-2 dark:text-white/75">
                  {placeholder}
                </span>
              )}
            </span>
            <Icon
              className={`shrink-0 icon-20 ml-6 -mr-0.5 transition-transform dark:fill-white ${small ? "ml-2 -mr-2" : ""
                } ${open ? "rotate-180" : ""} ${classArrow}`}
              name="arrow-bottom"
            />
          </Listbox.Button>
          <Transition
            leave="transition duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={twMerge(
                `absolute left-0 right-0 w-full mt-1 p-2 bg-white h-40 overflow-y-auto  border-n-3 rounded-sm shadow-lg dark:bg-n-1 dark:border-white ${small ? "p-0" : ""
                } ${up ? "top-auto bottom-full mt-0 mb-1" : ""} ${open ? "z-10" : ""
                } ${classOptions}`
              )}
            >
              {items?.map((item) => (
                <Listbox.Option
                  className={`flex items-start px-3 py-2 rounded-sm capitalize text-sm font-bold text-n-3 transition-colors cursor-pointer hover:text-n-1 ui-selected:!bg-n-3/20 ui-selected:!text-n-1 tap-highlight-color dark:text-white/50 dark:hover:text-white dark:ui-selected:!text-white ${small ? "!py-1 !pl-4 text-xs" : ""
                    } ${classOption}`}
                  key={item.value}
                  value={item.label}
                >
                  {item.label}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </>
      )}
    </Listbox>
  </div>
);
