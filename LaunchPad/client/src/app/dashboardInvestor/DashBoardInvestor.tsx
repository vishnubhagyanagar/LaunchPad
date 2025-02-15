"use client";
import { RootState } from "@/lib/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../dashboardInvestor/pages.css";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Project {
  startupId: string;
  patentDetails: string;
  projectTitle: string;
  projectDescription: string;
  targetMarket: number;
  businessModel: string;
  fundingGoals: string;
  useOfFunds: string;
  expectedROI: string;
  legalDocuments: string;
}
interface DashBoardInvestorProps {
  searchData: string | null; // Receive search data as a prop
}

export default function DashBoardInvestor({
  searchData,
}: DashBoardInvestorProps) {
  const authState = useSelector((state: RootState) => state.auth);
  const [data, setData] = useState<Project[]>([]);

  useEffect(() => {
    if (searchData) {
      getSearchProjects(searchData);
    } else {
      getProjects();
    }
  }, [searchData]);

  const getSearchProjects = async (title: string) => {
    // Ensure the title is URL-encoded to handle special characters
    const res = await fetch(
      `http://localhost:8000/search/projects?title=${encodeURIComponent(
        title
      )}`,
      {
        method: "GET",
      }
    );

    if (res.ok) {
      const properties = await res.json();
      setData([]);

      if (properties.length === 0) {
        getProjects();
      } else {
        setData(properties);
      }
    } else {
      console.error("Failed to fetch properties");
    }
  };

  const getProjects = async () => {
    const res = await fetch(`http://localhost:8000/post/allprojects`, {
      method: "GET",
    });

    if (res.ok) {
      const properties = await res.json();
      setData(properties);
    } else {
      console.error("Failed to fetch properties");
    }
  };

  const handleFollow = async (startupId: string) => {
    try {
      const res = await fetch(`http://localhost:8000/follow/followreq`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          investorId: authState.user!["_id"],
          startupId: startupId,
        }),
      });
      if (res.ok) {
        toast.success("Follow Request Sent", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      } else {
        toast.error(await res.json(), {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    } catch (e: any) {
      toast.error(e, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-wrap bg-white">
        <div className="w-full lg:w-full rounded-3xl bg-white p-6 mb-8">
          <div className="flex items-center justify-between text-black mb-8">
            {authState.user&&<p className="text-2xl font-bold">Welcome {authState.user.fullName}</p>}
          </div>
          <div className="max-w-full">
            {data.map((project) => (
              <div
                className="relative grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8 border border-gray-300 transition-transform transform hover:scale-105"
                key={project.startupId}
              >
                <div
                  className="relative rounded-xl overflow-hidden bg-white text-gray-700 shadow-lg"
                  style={{ height: "500px" }}
                >
                  <Image
                    src={project.legalDocuments} // Use the URL directly
                    alt={project.projectTitle} 
                    // Use project title for better accessibility
                    width={700}
                    height={700}
                    objectFit="cover"
                  />
                </div>
                <div className="p-8 flex flex-col justify-start h-full bg-white text-gray-700">
                  <p className="text-2xl font-light leading-normal mb-4">
                    {project.projectTitle}
                  </p>
                  <p className="text-base leading-relaxed mb-2 font-normal text-gray-500">
                    {project.projectDescription}
                  </p>
                  <p>
                    <strong>Patent Details:</strong> {project.patentDetails}
                  </p>
                  <p>
                    <strong>Target Market:</strong> ${project.targetMarket}
                  </p>
                  <p>
                    <strong>Business Model:</strong> {project.businessModel}
                  </p>
                  <p>
                    <strong>Funding Goals:</strong> {project.fundingGoals}
                  </p>
                  <p>
                    <strong>Use of Funds:</strong> {project.useOfFunds}
                  </p>
                  <p>
                    <strong>Expected ROI:</strong> {project.expectedROI}
                  </p>
                  <Button
                    onClick={() => handleFollow(project.startupId)}
                    disabled={authState.user?.following?.includes(
                      project.startupId
                    )}
                  >
                    {authState.user?.following?.includes(project.startupId) ? (
                      <>Following</>
                    ) : (
                      <>Follow</>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          />
        </div>
      </div>
    </div>
  );
}
