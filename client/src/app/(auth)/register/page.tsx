"use client";
import { Button, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import RegisterInvestor from "./_RegisterInvestor";
import RegisterStartup from "./_RegisterStartup";
import { motion } from "framer-motion";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import "./pages.css";
import Link from "next/link";

export default function Register() {
  const [userType, setUserType] = useState<string>("");
  const router = useRouter();
  const [showForm, setShowForm] = useState<boolean>(false);
  const authState = useSelector((state: RootState) => state.auth);


  useEffect(() => {
    if(authState.userType==='Startup'){
        router.push("/dashboardStartup");
      }else if(authState.userType==='Investor'){
        router.push('/dashboardInvestor');
      }else{
  
      }
    },[]);

  return (
    <div
      className="flex flex-col justify-center items-center"
      style={{ height: "calc(100vh - 64px)" }}
    >
      {!showForm ? (
        <motion.div
          initial={{ opacity: 1, scale: 0 }}
          animate={{ opacity: showForm ? 0 : 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "linear" }}
          className="flex flex-col justify-center items-center px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 rounded-full"
        >
          <div className="p-10 styled">
            <div className="flex flex-row justify-center items-center">
              <Text className="text-black font">
                Are you an Investor or an Entrepreneur/Startup Company?
              </Text>
            </div>
            <div className="flex flex-row justify-between w-full px-6 mt-8">
              <button
                className="button4 border-yellow-200 mx-6"
                onClick={() => {
                  setUserType("Investor");
                  setShowForm(true);
                }}
              >
                Investor
              </button>
              <button
                className="button4"
                onClick={() => {
                  setUserType("Startup");
                  setShowForm(true);
                }}
              >
                Entrepreneur/Startup
              </button>
            </div>
            <p className="text-center text-sm text-gray-500 mt-3">
             Already have an account?
              <Link
                href="/login"
                className="font-semibold text-gray-600 hover:text-customPurple hover:tracking-wider focus:text-gray-800 focus:outline-none"
              >
                Login
              </Link>
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "backIn" }}
          className="flex flex-col items-center w-full h-full"
        >
          <div className="flex items-start w-full h-full justify-start pl-4 pt-6 relative bg-transparent">
            <button
              onClick={() => {
                setUserType("");
                setShowForm(false);
              }}
              className="button4"
            >
              <ArrowBackIosIcon fontSize="small" />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full mt-4">
            {userType === "Investor" ? (
              <div className="w-full h-full flex justify-center items-center p-4">
                <RegisterInvestor />
              </div>
            ) : (
              <div className="w-full h-full flex justify-center items-center p-4">
                <RegisterStartup />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
