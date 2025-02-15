"use client";
import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";

import { TextArea, Box, Button, Flex, Text, AlertDialog } from "@radix-ui/themes";
import { Responsive } from "@radix-ui/themes/props";
import emailjs from "@emailjs/browser";
import { useRouter } from "next/navigation";

export default function RegisterStartup() {
  const [fullName, setFullName] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [companyName, setCompanyName] = useState<string>();
  const [companySize,setCompanySize]=useState<String>();
  const [industry, setIndustry] = useState<string>();
  const [location, setLocation] = useState<string>();
  const [companyDescription, setCompanyDescription] = useState<string>();
  const [linkedInProfile, setLinkedInProfile] = useState<string>();
  const [patentApplicationNumber, setPatentApplicationNumber] = useState<
    string
  >();
  
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  
  const [otp, setOtp] = useState<string>();
  const [otperror, setOtperror] = useState<string>();
  const [userotp, setUserotp] = useState<string>();
  const [otpverified, setOtpVerified] = useState<boolean>(false);
  const router=useRouter();
  const [patentVerified,setPatentVerified]=useState<boolean>(true);// have changed the patent to true for testing
  const [errors, setErrors] = useState<{
    companyName?: string;
    fullName?: string;
    email?: string;
    password?: string;
    phoneNumber?: string;
    industry?: string;
    location?: string;
    companyDescription?: string;
    linkedInProfile?: string;
    patentApplicationNumber?: string;
    fetchError?: string;
    companySize?: string;
  }>();

  const validate = () => {
    const errors: {
      fullName?: string;
      email?: string;
      password?: string;
      phoneNumber?: string;
      companyName?: string;
      companyDescription?: string;
      patentApplicationNumber?: string;
      documents?: string;
      fetchError?: string;
      industry?: string;
      location?: string;
      companySize?: string;
      linkedInProfile?: string;
    } = {};

    if (!fullName) errors.fullName = "Full Name is required";
    if (!email) errors.email = "Email does not exist";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid";
    if (!password) errors.password = "Password is required";
    else if (password.length < 6)
      errors.password = "Password must be at least 6 characters";
    if (!phoneNumber) errors.phoneNumber = "Phone Number is required";
    else if (phoneNumber.length !== 10)
      errors.phoneNumber = "Phone Number must be 10 characters";
    if (!industry) errors.industry = "Industry is required";
    if (!location) errors.location = "Location is required";
    if (!companyName) errors.companyName = "companyName is required";

    if (!companySize)
      errors.companySize = "Company Size is required";
    if (!linkedInProfile)
      errors.linkedInProfile = "LinkedIn Profile is required";
    
    if (!patentApplicationNumber){
      errors.patentApplicationNumber = "Patent Number is required";
    }
    

    return errors;
  };

  const handleSubmit = async () => {
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length === 0 && otpverified) {
      const res = await fetch(`http://localhost:8000/auth/registerstartup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName,
          companySize,
          fullName,
          email,
          password,
          phoneNumber,
          industry,
          location,
          companyDescription,
          linkedInProfile,
          patentApplicationNumber,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setErrors({ fetchError: data["error"] });
      } else {
        router.push("/login");
      }
    } else {
      setAlertVisible(true);
    }
  };

  // will be making changes here for patent validation using google patent api
const validatePatentId=async()=>{
  try{
  const res=await fetch(`http://localhost:8000/patent/${patentApplicationNumber}`,{
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if(res.ok){
    const data=await res.json();
    setPatentVerified(true);
  }}catch(e){
    console.log(e);
  }
}

  const requestotp = () => {
    if (!email) {
    } else {
      const otp = generateAlphanumericCode();
      setOtp(otp);
      const template = {
        to_email:email,
        to_name: fullName,            // The recipient's name
        from_name: "LaunchPad",  // The sender's name
        message: otp,                 // The OTP message
      };
      
      // Send the email using EmailJS
      emailjs.send("service_dv64bx6", "template_hgz8u7l", template, {
        publicKey: 'aORjRAflVVvcbkBi3',
      })
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
      })
      .catch((err) => {
        setOtperror("Error sending Otp");
        console.error('Failed to send email. Error:', err);
      });
      
    }
  };
  const verifyotp = () => {
    if (otp === userotp) {
      console.log("Idar aaya")
      setOtpVerified(true);
    }
  else{
    console.log("idar nahi aya");
    
  }
  };
  function generateAlphanumericCode(length = 6) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }

    return code;
  }

  return (
    <div className="register-component">
      <div className="flex flex-col w-screen items-center justify-center p-4 md:p-0">
        <Box className="flex flex-col items-center w-full max-w-3xl">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-customBlack">
              Register
            </h1>
          </div>
          <div className="mt-10 w-full bg-white shadow-2xl rounded-lg overflow-hidden">
            <div
              className="py-4 px-6 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-1 px-1"
                  htmlFor="Name"
                >
                  Name
                </label>
                <TextField
                  type="text"
                  required
                  id="outlined-basic"
                  name="Name"
                  error={errors?.fullName ? true : false}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your Name"
                  size="small"
                  className="appearance-none rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors?.fullName && <Text>{errors.fullName}</Text>}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-1 px-1"
                  htmlFor="Email"
                >
                  Email
                </label>
                <TextField
                  type="email"
                  required
                  id="outlined-basic"
                  name="Email"
                  error={errors?.email ? true : false}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Mail"
                  size="small"
                  className="appearance-none rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors?.email && <Text>{errors.email}</Text>}
                <button
                className="button2 my-3"
                  onClick={() => {
                    requestotp();
                  }}
                >
                  Request OTP
                </button>
                {otperror && <Text>{otperror}</Text>}
                <TextField
                  type="text"
                  required
                  id="outlined-basic"
                  name="EmailOtp"
                  value={userotp}
                  onChange={(e) => setUserotp(e.target.value)}
                  placeholder="Enter your OTP"
                  size="small"
                  className="appearance-none rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button
                                className="button2 mt-3"

                  onClick={() => {
                    verifyotp();
                  }}
                >
                  Verify OTP
                </button>
                {!otpverified? <Text>Otp Not Verified</Text>:<Text>Otp Verified!!</Text>}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-1 px-1"
                  htmlFor="Password"
                >
                  Password
                </label>
                <TextField
                  type="password"
                  required
                  id="outlined-basic"
                  name="Password"
                  error={errors?.password ? true : false}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password"
                  size="small"
                  className="appearance-none rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors?.password && <Text>{errors.password}</Text>}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-1 px-1"
                  htmlFor="Phone Number"
                >
                  Phone Number
                </label>
                <TextField
                  type="number"
                  required
                  id="outlined-basic"
                  name="Phone Number"
                  placeholder="Enter your phone number"
                  error={errors?.phoneNumber ? true : false}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  size="small"
                  className="appearance-none rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors?.phoneNumber && <Text>{errors.phoneNumber}</Text>}
                
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-1 px-1"
                  htmlFor="Company Name"
                >
                  Company Name
                </label>
                <TextField
                  type="text"
                  required
                  id="outlined-basic"
                  name="Company Name"
                  placeholder="Enter your company name"
                  error={errors?.companyName ? true : false}
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  size="small"
                  className="appearance-none rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors?.companyName && <Text>{errors.companyName}</Text>}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-1 px-1"
                  htmlFor="Company Size"
                >
                  Company Size
                </label>
                <TextField
                  type="number"
                  required
                  id="outlined-basic"
                  name="Company Size"
                  placeholder="Enter your company size"
                  error={errors?.companySize ? true : false}
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                  size="small"
                  className="appearance-none rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors?.companySize && (
                  <Text>{errors.companySize}</Text>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-1 px-1"
                  htmlFor="Industry"
                >
                  Industry
                </label>
                <TextField
                  type="text"
                  required
                  id="outlined-basic"
                  name="Industry"
                  placeholder="Enter your industry"
                  error={errors?.industry ? true : false}
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  size="small"
                  className="appearance-none rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors?.industry && <Text>{errors.industry}</Text>}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-1 px-1"
                  htmlFor="Location"
                >
                  Location
                </label>
                <TextField
                  type="text"
                  required
                  id="outlined-basic"
                  name="Location"
                  placeholder="Enter your location"
                  error={errors?.location ? true : false}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  size="small"
                  className="appearance-none rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors?.location && <Text>{errors.location}</Text>}
              </div>

              <div className="mb-4 col-span-2">
                <label
                  className="block text-gray-700 font-bold mb-1 px-1"
                  htmlFor="Company Description"
                >
                  Company Description
                </label>
                <TextArea
                  id="outlined-basic"
                  name="Company Description"
                  placeholder="Enter your company description"
                  //error={errors?.companyDescription ? true : false}
                  value={companyDescription}
                  onChange={(e) => setCompanyDescription(e.target.value)}
                  size={"medium" as Responsive<"1" | "2" | "3">}
                  className="appearance-none rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors?.companyDescription && (
                  <Text>{errors.companyDescription}</Text>
                )}
              </div>
              <div className="mb-4 col-span-2">
                <label
                  className="block text-gray-700 font-bold mb-1 px-1"
                  htmlFor="LinkedIn Profile"
                >
                  LinkedIn Profile
                </label>
                <TextField
                  type="text"
                  required
                  id="outlined-basic"
                  name="LinkedIn Profile"
                  placeholder="Enter your LinkedIn profile"
                  error={errors?.linkedInProfile ? true : false}
                  value={linkedInProfile}
                  onChange={(e) => setLinkedInProfile(e.target.value)}
                  size="small"
                  className="appearance-none rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors?.linkedInProfile && (
                  <Text>{errors.linkedInProfile}</Text>
                )}
              </div>

              <div className="mb-4 col-span-2">
                <div className="flex flex-row">
                <label
                  className="block text-gray-700 font-bold mb-1 px-1"
                  htmlFor="Patent Application Number"
                >
                  Patent Application Number
                </label>
                <TextField
                  type="text"
                  required
                  id="outlined-basic"
                  name="Patent Application Number"
                  placeholder="Enter your patent application number"
                  error={errors?.patentApplicationNumber ? true : false}
                  value={patentApplicationNumber}
                  onChange={(e) =>
                    setPatentApplicationNumber(
                      e.target.value,
                    )
                  }
                  size="small"
                  className="appearance-none rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                                  <button className="button2" onClick={validatePatentId}><Text className=" text-xs">Validate Patent Id</Text></button>

                </div>
                {errors?.patentApplicationNumber && (
                  <Text>{errors.patentApplicationNumber}</Text>
                )}
                {patentVerified?<>Patent Verified</>:<>PatentNotVerified</>}
              </div>
                <div className="flex flex-row w-full justify-center items-center col-span-2
                ">
              <button
                className="button4"
                onClick={handleSubmit}
              >
                Submit
              </button>
              </div>
            </div>
          </div>
        </Box>
      </div>
      {alertVisible && (
        <AlertDialog.Root open={alertVisible}>
          <AlertDialog.Content maxWidth="450px">
            <AlertDialog.Title>Registration Unsuccessful</AlertDialog.Title>
            <AlertDialog.Description className="p-4 rounded">
              <Flex className="flex flex-col">
                {errors?.companyName && (
                  <Text className="m-2">{errors.companyName}</Text>
                )}
                {errors?.fullName && (
                  <Text className="m-2">{errors.fullName}</Text>
                )}
                {errors?.email && <Text className="m-2">{errors.email}</Text>}
                {errors?.password && (
                  <Text className="m-2">{errors.password}</Text>
                )}
                {errors?.phoneNumber && (
                  <Text className="m-2">{errors.phoneNumber}</Text>
                )}
                {errors?.industry && (
                  <Text className="m-2">{errors.industry}</Text>
                )}
                {errors?.location && (
                  <Text className="m-2">{errors.location}</Text>
                )}
                {errors?.companyDescription && (
                  <Text className="m-2">{errors.companyDescription}</Text>
                )}
                {errors?.linkedInProfile && (
                  <Text className="m-2">{errors.linkedInProfile}</Text>
                )}
                {errors?.fetchError && (
                  <Text className="m-2">{errors.fetchError}</Text>
                )}
                {errors?.companySize && (
                  <Text className="m-2">{errors.companySize}</Text>
                )}
                {errors?.patentApplicationNumber && (
                  <Text className="m-2">{errors.patentApplicationNumber}</Text>
                )}
                {!otpverified&&<Text className="m-2">Otp Not Verified</Text>}
                {!patentVerified&&<Text className="m-2">Patent Not Verified</Text>}
              </Flex>
            </AlertDialog.Description>
            <Flex className="flex flex-row justify-center items-center w-full">
              <AlertDialog.Cancel onClick={() => setAlertVisible(false)}>
                <button className="button4">
                  <Text > Ok</Text>
                </button>
              </AlertDialog.Cancel>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      )}
    </div>
  );
}
