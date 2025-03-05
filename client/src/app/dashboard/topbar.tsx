"use client";
import { userLogout } from "@/lib/slices/authSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDashboardContext } from "./provider";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface TopBarProps {
  setSearchData: React.Dispatch<React.SetStateAction<string | null>>;
}

export function TopBar({ setSearchData }: TopBarProps) {
  const { openSidebar } = useDashboardContext();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const authState = useSelector((state: RootState) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Check if the Enter key is pressed
    if (event.key === "Enter") {
      setSearchData(searchTerm || null); // Update search data in parent component
    }
  };

  return (
    <header className="relative z-10 h-20 items-center bg-white">
      <div className="relative z-10 mx-auto flex h-full flex-col justify-center px-3 text-black">
        <div className="relative flex w-full items-center pl-1 sm:ml-0 sm:pr-2">
          <div className="group relative flex h-full w-12 items-center">
            <button
              type="button"
              aria-expanded="false"
              aria-label="Toggle sidenav"
              onClick={openSidebar}
              className="text-4xl text-black focus:outline-none"
            >
              &#8801;
            </button>
          </div>
          <div className="relative left-0 flex w-3/4">
            <div className="group relative ml-8 hidden w-full items-center md:flex lg:w-72">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch} // Update search term
                onKeyPress={handleKeyPress} // Handle key press events
                className="block w-full rounded-2xl border-2 border-black py-1.5 pl-10 pr-4 leading-normal text-gray-400 opacity-90 focus:outline-none focus:bg-transparent"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="relative ml-5 flex w-full items-center justify-end p-1 sm:right-auto">
            <button
              type="button"
              className="text-4xl text-black focus:outline-none"
              onClick={() => {
                dispatch(userLogout());
                router.push("/");
              }}
            >
              <LogoutIcon sx={{ color: "#000000" }} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
