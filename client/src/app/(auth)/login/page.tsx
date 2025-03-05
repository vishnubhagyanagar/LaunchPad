"use client";
import { AlertDialog, Button, Flex, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Image from "next/image";
import "./pages.css";
import { AppDispatch, RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "@/lib/slices/authSlice";
import styled from "styled-components";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userType, setUserType] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [error, setError] = useState<{
    email?: string;
    password?: string;
    fetchError?: string;
  }>();
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); // New loading state

  const validate = () => {
    const errors: { email?: string; password?: string } = {};
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    return errors;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const err = validate();
    setError(err);
    if (Object.keys(err).length === 0) {
      setLoading(true); // Set loading to true
      try {
        const emailRes = await fetch(`http://localhost:8000/auth/login`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
            userType: userType,
          }),
        });
        if (!emailRes.ok) {
          throw new Error("Login failed");
        }
        const data = await emailRes.json();
        dispatch(
          userLogin({
            user: data.user,
            token: data.token,
            userType: userType,
          })
        );
        if(userType==='Investor'){  router.push("/dashboardInvestor"); }
        else{
          router.push("/dashboardStartup");
        }// Redirect after successful login
      } catch (error) {
        console.error("Error during login:", error);
        setAlertVisible(true); // Show error alert
      } finally {
        setLoading(false); // Reset loading state
      }
    } else {
      setAlertVisible(true); // Show validation errors
    }
  };


  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    console.log("Auth state changed:", authState);
    if (authState.authState) {
      if (authState.userType === 'Startup') {
        router.push("/dashboardStartup");
      } else if (authState.userType === 'Investor') {
        router.push("/dashboardInvestor");
      }
    }
  }, [authState, router]);
  return (
    <div className="overflow-hidden">
      {!showForm ? (
        <div className="flex flex-row justify-center items-center" style={{ height: 'calc(100vh - 64px)' }}>
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
                  className="button4 mr-5"
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
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="flex flex-row justify-center items-center" style={{ height: 'calc(100vh - 64px)' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "backIn" }}
            className="flex flex-col justify-end items-center w-2/3"
          >
            <div className="flex justify-center items-cneter object-cover w-full h-full bg-white shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl mt-1">
              <div className="w-1/2 h-full flex justify-center">
                <Image
                  src="/images/login.png"
                  alt="Login Image"
                  width={600}
                  height={600}
                  className="h-full w-full object-cover sm:rounded-xl shadow-xl"
                />
              </div>
              <div className="w-1/2 px-6 pt-10 pb-8">
                <button
                  onClick={() => {
                    setUserType("");
                    setShowForm(false);
                  }}
                  className="button4"
                >
                  <ArrowBackIosIcon fontSize="small" />
                </button>
                <div className="w-full items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-3xl font-semibold text-customBlack">Login</h1>
                  </div>
                  <div className="mt-5">
                    <div className="relative mt-6">
                      <StyledWrapper>
                        <div className="group">
                          <input
                            title="Inpit title"
                            className="input"
                            type="email"
                            id="email_field"
                            required
                            name="email"
                            value={email}
                            placeholder="Email Address"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </StyledWrapper>
                      {error?.email && <Text className="text-red-600">{error.email}</Text>}
                    </div>
                    <div className="relative mt-6">
                      <StyledWrapper>
                        <div className="group">
                          <input
                            className="input"
                            type="password"
                            required
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                          />
                        </div>
                      </StyledWrapper>
                      {error?.password && <Text className="text-red-600">{error.password}</Text>}
                    </div>

                    <div className="my-6 flex flex-row justify-center w-full">
                      <button
                        className="button4"
                        onClick={handleSubmit}
                        disabled={loading} // Disable button while loading
                      >
                        {loading ? "Loading..." : "Login"} {/* Change button text based on loading state */}
                      </button>
                    </div>
                    <p className="text-center text-sm text-gray-500">
                      Don&#x27;t have an account yet?
                      <Link
                        href="/register"
                        className="font-semibold text-gray-600 hover:text-customPurple hover:tracking-wider focus:text-gray-800 focus:outline-none"
                      >
                        Register
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {alertVisible && (
        <AlertDialog.Root open={alertVisible}>
          <AlertDialog.Content maxWidth="450px">
            <AlertDialog.Title>Login Unsuccessful</AlertDialog.Title>
            <AlertDialog.Description className="p-4 rounded">
              <Flex className="flex flex-col">
                {error?.email && <Text className="m-2">{error.email}</Text>}
                {error?.password && <Text className="m-2">{error.password}</Text>}
                {error?.fetchError && <Text className="m-2">{error.fetchError}</Text>}
              </Flex>
            </AlertDialog.Description>
            <Flex className="flex flex-row justify-center items-center w-full">
              <AlertDialog.Cancel onClick={() => setAlertVisible(false)}>
                <button className="button4">
                  <Text>Ok</Text>
                </button>
              </AlertDialog.Cancel>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      )}
    </div>
  );
}

// Styled Wrapper for input fields
const StyledWrapper = styled.div`
  .group {
    position: relative;
  }
  .input {
    font-family: "Inter", sans-serif;
    width: 100%;
    padding: 12px;
    font-size: 14px;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    transition: 0.3s;
  }
  .input:focus {
    outline: none;
    border-color: #9333ea;
  }
`;
