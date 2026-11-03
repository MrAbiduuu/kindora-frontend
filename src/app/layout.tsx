import type { Metadata } from "next";
import { Josefin_Sans, IBM_Plex_Serif, Oldenburg } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { ToastContainer } from "react-toastify";

const josefinSans = Josefin_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const ibmPlexSerif = IBM_Plex_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const oldenburg = Oldenburg({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Kindora — Small Acts. Greater Impact.",
  description:
    "Connect with passionate people, join meaningful community events, and make a positive difference in the world around you.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="kindora"
      className={`${josefinSans.variable} ${ibmPlexSerif.variable} ${oldenburg.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />
        {children}
        <Toaster />
        <ToastContainer />
        <Footer />
      </body>
    </html>
  );
}
