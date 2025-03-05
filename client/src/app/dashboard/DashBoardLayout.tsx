'use client';
import React, { useState } from "react";
import { Sidebar } from "./sidebar/sidebar";
import { Overlay } from "./overlay";
import { DashboardProvider } from "./provider";
import { TopBar } from "./topbar";

type LayoutProps = {
  children: React.ReactNode;
};

const style = {
  container: "bg-white h-screen overflow-hidden relative",
  mainContainer: "flex flex-col h-screen pl-0 w-full lg:pl-20 lg:space-y-4",
  main: "h-screen overflow-auto pb-36 pt-4 px-2 md:pb-8 md:pt-4 lg:pt-0 lg:px-4",
};

export function DashboardLayout(props: LayoutProps) {
  const [searchData, setSearchData] = useState<string | null>(null);


  return (
    <DashboardProvider>
      <div className={style.container}>
        <div className="flex items-start">
          <Overlay />
          <Sidebar mobileOrientation="end" />
          <div className={style.mainContainer}>
            <TopBar setSearchData={setSearchData}/>
            <main className={style.main}>{props.children}</main>
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
}
