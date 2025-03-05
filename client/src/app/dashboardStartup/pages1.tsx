"use client";
import { TextField } from "@mui/material";
import { Box, Button, AlertDialog, Flex, Text } from "@radix-ui/themes";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import "../dashboardStartup/pages.css";
import axios from 'axios';
import styled from "styled-components";


export default function DashBoardStartup() {
  const authState = useSelector((state: RootState) => state.auth);

  const [projectTitle, setProjectTitle] = useState<string>();
  const [projectDescription, setProjectDescription] = useState<string>();
  const [targetMarket, setTargetMarket] = useState<string>();
  const [businessModel, setBusinessModel] = useState<string>();
  const [fundingGoals, setFundingGoals] = useState<string>();
  const [useOfFunds, setUseOfFunds] = useState<string>();
  const [expectedROI, setExpectedROI] = useState<string>();
  const [patentDetails, setPatentDetails] = useState<string>();
  const [legalDocuments, setLegalDocuments] = useState<File|null>(null);
  const [errors, setErrors] = useState<{
    projectTitle?: string;
    projectDescription?: string;
    targetMarket?: string;
    businessModel?: string;
    fundingGoals?: string;
    useOfFunds?: string;
    expectedROI?: string;
    patentDetails?: string;
    legalDocuments?: string;
    fetchError?: string;
  }>();
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const router = useRouter();
  const validate = () => {
    const errors: {
      projectTitle?: string;
      projectDescription?: string;
      targetMarket?: string;
      businessModel?: string;
      fundingGoals?: string;
      useOfFunds?: string;
      expectedROI?: string;
      patentDetails?: string;
      legalDocuments?: string;
      fetchError?: string;
    } = {};
    if (!projectTitle) {
      errors["projectTitle"] = "projectTitle is required";
    }

    if (!projectDescription) {
      errors.projectDescription = "projectDescription is required";
    }

    if (!targetMarket) {
      errors.targetMarket = "targetMarket is required";
    }
    if (!businessModel) {
      errors.businessModel = "businessModel is required";
    } 

    if (!fundingGoals) {
      errors.fundingGoals = "fundingGoals is required";
    }
 

    if (!useOfFunds) {
      errors.useOfFunds = "useOfFunds is required";
    }

    if (!expectedROI) {
      errors.expectedROI = "expectedROI is required";
    }

    if (!patentDetails) {
      errors.patentDetails = "patentDetails is required";
    }

    if (!legalDocuments) {
      errors.legalDocuments = "legalDocuments is required";
    }

    return errors;
  };
 

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setLegalDocuments(selectedFile);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const err = validate();
    setErrors(err);
    if (
      // Object.keys(err).length === 0 && 
    legalDocuments) {
      // Handle successful validation

      const url = `https://api.cloudinary.com/v1_1/dzqij2vui/image/upload`; // Replace with your Cloudinary cloud name
      const formData = new FormData();
      formData.append('file', legalDocuments);
      formData.append('upload_preset', 'ewaedee'); // Replace with your upload preset
  
   
        const response = await axios.post(url, formData);
        const image=response.data.secure_url; // Get the image URL
        console.log('Image uploaded successfully:',image);
      

      const res = await fetch(`http://localhost:8000/post/project`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          startupId: authState.user!["_id"],
          projectTitle: projectTitle,
          projectDescription: projectDescription,
          targetMarket: targetMarket,
          businessModel: businessModel,
          fundingGoals: fundingGoals,
          useOfFunds: useOfFunds,
          expectedROI: expectedROI,
          patentDetails: patentDetails,
          legalDocuments: image,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setErrors({ fetchError: data["error"] });
        setAlertVisible(true);
        router.push("/")
      } else {
       window.location.reload();
      }
    } else {
      setAlertVisible(true);
    }
  };
  interface Follow {
    startupId: string;
    investorId: string;
    createdAt: Date;
  }
  
  return (
    <div className="flex  flex-col w-full items-center h-screen justify-center">
      <Box className="flex flex-col w-screen items-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-customBlack mt-10">
            New Post/Project Idea
          </h1>
        </div>
        <div>
        </div>
        <div className="max-w-xl mx-auto mt-10 bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="py-4 px-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-1 px-1"
                htmlFor="Project Title"
              >
                Project Title
              </label>
              <TextField
                type="text"
                required
                id="outlined-basic"
                name="Project Title"
                error={errors?.projectTitle ? true : false}
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="Enter Project Title"
                size="small"
                className=" appearance-none rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors?.projectTitle && <Text>{errors.projectTitle}</Text>}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-1 px-1"
                htmlFor="Project Description"
              >
                Project Description
              </label>
              <TextField
                type="text"
                required
                id="outlined-basic"
                name="ProjectDescription"
                error={errors?.projectDescription ? true : false}
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Enter Description"
                size="small"
                className=" appearance-none rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors?.projectDescription && (
                <Text>{errors.projectDescription}</Text>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-1 px-1"
                htmlFor="targetMarket"
              >
                Target Market
              </label>
              <TextField
                type="text"
                required
                id="outlined-basic"
                name="Target Market"
                error={errors?.targetMarket ? true : false}
                value={targetMarket}
                onChange={(e) => setTargetMarket(e.target.value)}
                placeholder="Enter your Target Market"
                size="small"
                className=" appearance-none rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors?.targetMarket && <Text>{errors.targetMarket}</Text>}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-1 px-1"
                htmlFor="businessModel"
              >
                Business Model
              </label>
              <TextField
                type="text"
                required
                id="outlined-basic"
                name="businessModel"
                placeholder="businessModel"
                error={errors?.businessModel ? true : false}
                value={businessModel}
                onChange={(e) => setBusinessModel(e.target.value)}
                size="small"
                className=" appearance-none rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors?.businessModel && <Text>{errors.businessModel}</Text>}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-1 px-1"
                htmlFor="fundingGoals"
              >
                Funding Goals
              </label>
              <TextField
                type="text"
                required
                id="outlined-basic"
                name="fundingGoals"
                error={errors?.fundingGoals ? true : false}
                value={fundingGoals}
                onChange={(e) => setFundingGoals(e.target.value)}
                placeholder="fundingGoals"
                size="small"
                className=" appearance-none rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors?.fundingGoals && <Text>{errors.fundingGoals}</Text>}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-1 px-1"
                htmlFor="useOfFunds"
              >
                Use Of Funds{" "}
              </label>
              <TextField
                type="text"
                required
                id="outlined-basic"
                name="useOfFunds"
                error={errors?.useOfFunds ? true : false}
                value={useOfFunds}
                onChange={(e) => setUseOfFunds(e.target.value)}
                placeholder="useOfFunds"
                size="small"
                className=" appearance-none rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors?.useOfFunds && <Text>{errors.useOfFunds}</Text>}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-1 px-1"
                htmlFor="expectedROI"
              >
                Expected ROI
              </label>
              <TextField
                type="text"
                required
                id="outlined-basic"
                name="expectedROI"
                error={errors?.expectedROI ? true : false}
                value={expectedROI}
                onChange={(e) => setExpectedROI(e.target.value)}
                placeholder="expectedROI"
                size="small"
                className=" appearance-none rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors?.expectedROI && <Text>{errors.expectedROI}</Text>}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-1 px-1"
                htmlFor="patentDetails"
              >
                Patent Details
              </label>
              <TextField
                type="text"
                required
                id="outlined-basic"
                name="patentDetails"
                error={errors?.patentDetails ? true : false}
                value={patentDetails}
                onChange={(e) => setPatentDetails(e.target.value)}
                placeholder="patentDetails"
                size="small"
                className=" appearance-none rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors?.patentDetails && <Text>{errors.patentDetails}</Text>}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-1 px-1"
                htmlFor="legalDocuments"
              >
                Legal Documents
              </label>
              <StyledWrapper>
      <label htmlFor="file" className="custum-file-upload">
        <div className="icon">
          <svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill="" /> </g></svg>
        </div>
        <div className="text">
          <span>Click to upload image</span>
        </div>
        <TextField
                type="file"
                required
                id="file"
                name="legalDocuments"
                error={errors?.legalDocuments ? true : false}
                onChange={handleFileChange}
                style={{display:"none"}}
              />      </label>
    </StyledWrapper>
              
              {errors?.legalDocuments && <Text>{errors.legalDocuments}</Text>}
            </div>

            <div className="col-span-2 flex items-center justify-center mb-4">
              <button className="button4" onClick={handleSubmit}>
                <Text >Submit</Text>
              </button>
            </div>
          </div>
        </div>
      </Box>
      {alertVisible && (
        <AlertDialog.Root open={alertVisible}>
          <AlertDialog.Content maxWidth="450px">
            <AlertDialog.Title>Registration Unsuccessful</AlertDialog.Title>
            <AlertDialog.Description className="p-4 rounded">
              <Flex className="flex flex-col">
                {errors?.projectTitle && (
                  <Text className="m-2">{errors.projectTitle}</Text>
                )}
                {errors?.projectDescription && (
                  <Text className="m-2">{errors.projectDescription}</Text>
                )}
                {errors?.targetMarket && (
                  <Text className="m-2">{errors.targetMarket}</Text>
                )}
                {errors?.businessModel && (
                  <Text className="m-2">{errors.businessModel}</Text>
                )}
                {errors?.fundingGoals && (
                  <Text className="m-2">{errors.fundingGoals}</Text>
                )}
                {errors?.useOfFunds && (
                  <Text className="m-2">{errors.useOfFunds}</Text>
                )}
                {errors?.expectedROI && (
                  <Text className="m-2">{errors.expectedROI}</Text>
                )}
                {errors?.patentDetails && (
                  <Text className="m-2">{errors.patentDetails}</Text>
                )}
                {errors?.legalDocuments && (
                  <Text className="m-2">{errors.legalDocuments}</Text>
                )}

                {errors?.fetchError && (
                  <Text className="m-2">{errors.fetchError}</Text>
                )}
              </Flex>
            </AlertDialog.Description>
            <Flex className="flex flex-row justify-center items-center w-full">
              <AlertDialog.Cancel onClick={() => setAlertVisible(false)}>
                <Button variant="soft" className="button1">
                  <Text className="text-white text-lg font-light">Ok</Text>
                </Button>
              </AlertDialog.Cancel>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      )}
    </div>
  );
}



const StyledWrapper = styled.div`
  .custum-file-upload {
    height: 200px;
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: space-between;
    gap: 20px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border: 2px dashed #000000;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0px 48px 35px -48px #e8e8e8;
  }

  .custum-file-upload .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custum-file-upload .icon svg {
    height: 80px;
    fill: #000000;
  }

  .custum-file-upload .text {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custum-file-upload .text span {
    font-weight: 400;
    color: #000000;
  }

  .custum-file-upload input {
    display: none;
  }`;
