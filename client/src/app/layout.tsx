import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { HeaderPage } from "@/app/_header";
import { ReduxProvider } from "@/lib/storeProvider";
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
  return (
    <html lang="en">
      <body  >
        <ReduxProvider>
          <Theme>

           {/* <HeaderPage /> */}

            {children}
          </Theme>
        </ReduxProvider>
      </body>
    </html>
  );
}
