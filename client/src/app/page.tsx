"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import GlobeDemo from "./_globe/page";

function Home() {
  const router = useRouter();
  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if(authState.authState){
    console.log("Auth State Changed:", authState);
    if (authState.userType === 'Startup') {
      router.push("/dashboardStartup");
    } else if (authState.userType === 'Investor') {
      router.push("/dashboardInvestor");
    } else {
    }}
  }, [authState,router]);
  



  return <GlobeDemo />; // Return null when redirecting
}

export default Home;
