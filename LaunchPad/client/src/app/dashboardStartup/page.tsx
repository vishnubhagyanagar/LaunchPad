"use client";

import { RootState } from "@/lib/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import DashBoardStartup from "./pages1";
import DashBoard1 from "./previous";

export default function DashBoard() {
    const authState = useSelector((state: RootState) => state.auth);
    const [show, setShow] = useState(false);

    return (
        <div className="flex flex-col justify-center items-center gap-6 w-full">
            <div className="text-4xl">Welcome {authState.user?.fullName}</div>
            <button 
                className="button4 fixed bottom-4 right-4 p-2 bg-blue-500  rounded-md shadow-lg"
                onClick={() => { setShow(!show) }}
            >
               
                {show ? <div>DashBoard</div> : <div>Upload Project</div>}
            </button>
            {!show?<DashBoard1 />:<></>}
            {show ? <DashBoardStartup /> : <div></div>}
        </div>
    );
}
