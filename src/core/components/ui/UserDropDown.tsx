"use client";

import React, {useState} from "react";
import {Dropdown} from "./DropDown";
import {IoExit, IoPersonOutline} from "react-icons/io5";
import {useUser} from "@/core/context/UserContext";
import {convertUserName} from "@/config/convertUserName";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const {user, logout} = useUser();

  function toggleDropdown(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const userName = convertUserName(user);

  return (
      <div className="relative">
        <button
            onClick={toggleDropdown}
            className="w-12 h-12 dropdown-toggle relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        >
          <IoPersonOutline className="" size={18}/>
        </button>

        <Dropdown
            isOpen={isOpen}
            onCloseAction={closeDropdown}
            className="absolute left-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white dark:bg-gray-700 p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark shadow-lg"
        >
          <div>
          <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
            {userName}
          </span>
            <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
            {user && user.name}
          </span>
          </div>

          <div className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800"/>
          <button
              onClick={logout}
              className="text-rose-500 flex items-center gap-2 p-2 mt-2 hover:bg-gray-100 rounded-md transition duration-300"
          >
            <IoExit size={20}/> خروج
          </button>
        </Dropdown>
      </div>
  );
}
