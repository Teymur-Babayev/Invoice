import React, { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";
import { Toaster } from "@/components/ui/toaster"

export const MainLayout = ({ children }) => {
  const { User } = useAuth();

  useEffect(() => {
  }, [User])
  
  return (
    <div className="flex flex-col bg-slate-100 w-full min-h-screen">
      <Navbar user={User}/>
      <div className="max-w-6xl mx-auto flex-1 w-full">{children}</div>
      <Toaster />
    </div>
  );
};
