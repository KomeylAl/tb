import React from "react";
import "@/app/globals.css";
import { Toaster } from "react-hot-toast";
import { Metadata } from "next";
import AdminQueryProvider from "@/app/sysadmin/providers";
import {UserProvider} from "@/core/context/UserContext";
import {ThemeProvider} from "@/core/context/ThemeContext";
import SideBar from "@/core/components/common/SideBar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "داشبورد IOT",
  description: "",
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
      <html lang="fa">
        <body className="bg-gray-100 dark:bg-gray-900">
          <Toaster />
          <AdminQueryProvider>
            <UserProvider>
              <SideBar />
              <div className="lg:pr-56 pt-20 lg:pt-0">
                <ThemeProvider>{children}</ThemeProvider>
              </div>
            </UserProvider>
          </AdminQueryProvider>
        </body>
      </html>
  );
}
