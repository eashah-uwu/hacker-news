import type { Metadata } from "next";
import "./ui/globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="w-full md:w-10/12 md:mt-2 mb-2 mx-auto bg-[#f6f6ef] min-h-screen text-sm flex flex-col">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
