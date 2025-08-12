"use client";

import {CgMenuRightAlt} from "react-icons/cg";
import Input from "@/core/components/ui/Input";
import React from "react";
import {ThemeToggleButton} from "@/core/components/ui/ThemeToggleButton";
import NotificationDropdown from "@/core/components/ui/NotificationDropDown";
import UserDropdown from "@/core/components/ui/UserDropDown";

interface HeaderProps {
  title?: string;
  isShowSearch: boolean;
  searchFn: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Header = ({isShowSearch, searchFn, className}: HeaderProps) => {
  return (
      <div
          className={`${className} w-full h-20 p-6 border-b border-gray-300 flex items-center justify-between bg-white dark:bg-gray-900 dark:border-gray-700`}>
        <div className="w-full flex items-center gap-3">
          <div className="flex items-center justify-center p-2 border rounded-sm dark:border-gray-100">
            <CgMenuRightAlt
                // onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
                size={25}
                className="text-gray-500 dark:text-white"
            />
          </div>
          <Input
              type="text"
              disabled={!isShowSearch}
              placeholder="جستجو"
              className="max-w-96 focus:ring-transparent"
              onChange={searchFn}
          />
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggleButton/>
          <NotificationDropdown/>
          <UserDropdown/>
        </div>
      </div>
  );
};

export default Header;
