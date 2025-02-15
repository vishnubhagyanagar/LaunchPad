"use client";
import { AppDispatch, RootState } from "@/lib/store";
import { Button, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import '../app/pages.css';
import { useDispatch, useSelector } from "react-redux";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { userLogout } from "@/lib/slices/authSlice";
import { useRouter } from "next/navigation";
export const HeaderPage = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const router= useRouter();
  return (
    <div className="flex flex-row w-screen h-16 rounded-br-md rounded-bl-md">
      <div className="flex flex-row items-center gap-3 px-10 justify-between w-full">
        <Link href="/" className="gap-3 px-10 button1">
          <Text className="  text-2xl text-white  font-light">LaunchPad </Text>
          {/* <Text className=" text-2xl text-white font-light">Connect</Text> */}
        </Link>
        {authState.authState ? (
          <div className="flex flex-row gap-3">
            <Button
              className="button1"
              onClick={() => {
                dispatch(userLogout());
                router.push('/');
              }}
            >
              <PowerSettingsNewIcon sx={{ color: '#FFFFFF' }} />
            </Button>
          </div>
        ) : (
          <div className="flex flex-row gap-3 ">
            <Link href="/login">
              <Button className="button1">
                <Text className="text-white text-lg font-light">Login</Text>
              </Button>
            </Link>
            <Link href="/register">
              <Button className="button1">
                <Text className="text-white text-lg font-light">Register</Text>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
