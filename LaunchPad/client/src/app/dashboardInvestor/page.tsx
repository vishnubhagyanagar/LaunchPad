// app/dashboardInvestor/page.tsx
import React from "react";
import { DashboardProvider } from "../dashboard/provider"; // Adjust path if necessary
import { DashboardLayout } from "./dashboardLayout"; // Ensure correct import path

const DashboardInvestorPage = () => {
  return (
    <DashboardProvider>
      <DashboardLayout>
      </DashboardLayout>
    </DashboardProvider>
  );
};

export default DashboardInvestorPage;
