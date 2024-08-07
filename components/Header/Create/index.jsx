import Icon from "@/components/Icon";
import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { AddOrgModal } from "pages/admin/organization";
import { AddStudentModalAdmin } from "pages/admin/students";
import { AddStudentModal } from "pages/organization/students";
import { useState } from "react";

const Create = ({}) => {
  const [visible, setVisible] = useState(false);
  const [orgModal, setOrgModal] = useState(false);
  const router = useRouter();
  const buttons = [
    {
      id: "0",
      title: "Add New Student",
      icon: "add-circle",
      onClick: () => setVisible(true),
    },
  ];
  const adminButton = [
    {
      id: "0",
      title: "Add New Student",
      icon: "add-circle",
      onClick: () => setVisible(true),
    },
    {
      id: "1",
      title: "Add New Organization",
      icon: "add-circle",
      onClick: () => setOrgModal(true),
    },
  ];

  return (
    <Menu className="relative" as="div">
      <Menu.Button className=" flex items-center gap-x-2 py-2 px-4 bg-primary font-semibold">
        <Icon name="add-circle" />
        <span>Create new</span>
      </Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute top-full right-0 w-[14.69rem] mt-2.5 py-2 border border-n-1 rounded-sm bg-white shadow-primary-4 dark:bg-white/20 dark:border-white">
          {router?.asPath?.includes("admin")
            ? adminButton.map((button) => (
                <Menu.Item
                  className="flex items-center w-full h-10 mb-1.5 px-6.5 text-sm font-bold last:mb-0 transition-colors hover:bg-n-3/10 dark:hover:bg-white/20"
                  key={button.id}
                  as="button"
                  onClick={button.onClick}
                >
                  <Icon
                    className="-mt-0.25 mr-3 dark:fill-white"
                    name={button.icon}
                  />
                  {button.title}
                </Menu.Item>
              ))
            : buttons.map((button) => (
                <Menu.Item
                  className="flex items-center w-full h-10 mb-1.5 px-6.5 text-sm font-bold last:mb-0 transition-colors hover:bg-n-3/10 dark:hover:bg-white/20"
                  key={button.id}
                  as="button"
                  onClick={button.onClick}
                >
                  <Icon
                    className="-mt-0.25 mr-3 dark:fill-white"
                    name={button.icon}
                  />
                  {button.title}
                </Menu.Item>
              ))}
        </Menu.Items>
      </Transition>
      {router?.asPath?.includes("admin") && visible ? (
        <AddStudentModalAdmin visible={visible} setVisible={setVisible} />
      ) : (
        <AddStudentModal visible={visible} setVisible={setVisible} />
      )}
      {orgModal && <AddOrgModal visible={orgModal} setVisible={setOrgModal} />}
    </Menu>
  );
};

export default Create;
