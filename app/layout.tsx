import type { Metadata } from "next";
import "./ui/globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import TanstackProvider from "@/providors/TanstackProvider";

export const metadata: Metadata = {
  title: "Hacker News",
  icons: "/logo.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TanstackProvider>
          <div className="w-full md:w-10/12 md:mt-2 mb-2 mx-auto bg-[#f6f6ef] min-h-screen text-sm flex flex-col">
            <Navbar />
            {children}
            <Footer />
          </div>
        </TanstackProvider>
      </body>
    </html>
  );
}
