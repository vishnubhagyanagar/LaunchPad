"use client";

import { RootState } from "@/lib/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";


export default function DashBoard1() {
    const authState = useSelector((state: RootState) => state.auth);
    const [data, setData] = useState<Project[]>([]);

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
  const getSearchProjects = async () => {
    // Ensure the title is URL-encoded to handle special characters
    if (!authState.user?._id) {
        console.error("User ID is missing");
        return;
    }
    const res = await fetch(
      `http://localhost:8000/search/projectsid?userId=${encodeURIComponent(
        authState.user?._id
      )}`,
      {
        method: "GET",
      }
    );

    if (res.ok) {
      const properties = await res.json();

        console.log(properties);
        setData(properties);
    } else {
      console.error("Failed to fetch properties");
    }
  };

  useEffect(()=>{
    getSearchProjects();
  },[])
    return (
        <div className=" mx-20">
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
             
            </div>
          </div>
        ))}
        </div>
    );
}
