// DashboardLayout.tsx
'use client';
import React, { useState } from "react";

import DashBoardInvestor from "./DashBoardInvestor"; // Import your investor dashboard
import { Overlay } from "../dashboard/overlay";
import { DashboardProvider } from "../dashboard/provider";
import { Sidebar } from "../dashboard/sidebar/sidebar";
import { TopBar } from "../dashboard/topbar";



const style = {
  container: "bg-white h-screen overflow-hidden relative",
  mainContainer: "flex flex-col h-screen pl-0 w-full lg:pl-20 lg:space-y-4",
  main: "h-screen overflow-auto pb-36 pt-4 px-2 md:pb-8 md:pt-4 lg:pt-0 lg:px-4",
};

export function DashboardLayout() {
  const [searchData, setSearchData] = useState<string | null>(null);

  return (
      <div className={style.container}>
        <div className="flex items-start">
          <Overlay />
          <Sidebar mobileOrientation="end" />
          <div className={style.mainContainer}>
            <TopBar setSearchData={setSearchData} /> {/* Pass setter function to TopBar */}
            <main className={style.main}>
              <DashBoardInvestor searchData={searchData} /> {/* Pass search data to DashBoardInvestor */}
            </main>
          </div>
        </div>
      </div>
  );
}
