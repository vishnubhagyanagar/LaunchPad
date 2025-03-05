import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { DashboardLayout } from "./DashBoardLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LaunchPad",
  description: "A Medium for Startups and Investors to Connect!!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
