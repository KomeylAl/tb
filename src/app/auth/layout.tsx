import React from "react";
import "@/app/globals.css";
import {Toaster} from "react-hot-toast";
import {Metadata} from "next";
import {UserProvider} from "@/core/context/UserContext";
import AuthQueryProvider from "@/app/auth/providers";

export const metadata: Metadata = {
  title: "داشبورد IOT",
  description: "",
};

export default function LoginLayout({children}: { children: React.ReactNode; }) {
  return (
      <html lang="fa">
        <body className="w-full h-screen">
          <Toaster/>
          <AuthQueryProvider>
            <UserProvider>
              {children}
            </UserProvider>
          </AuthQueryProvider>
        </body>
      </html>
  );
}
