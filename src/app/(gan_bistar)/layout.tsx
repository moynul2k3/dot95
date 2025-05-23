import type { Metadata } from "next";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import 'boxicons/css/boxicons.min.css';
import AuthPopup from "../components/registration/AuthPopup";
//import { Toaster } from "@/components/ui/sonner"
import { Skeleton } from "@/components/ui/skeleton"
import React, { Suspense } from 'react';

export const metadata: Metadata = {
  title: {
    default: "Best Books ",
    template: "Best Books | %s",
  },
  description: "",
};
export default function Layout({
  children,
}: {
  children: React.ReactNode
  }) {
  return (
    <main className="bg-amber-200">
      <Suspense fallback={<Skeleton className="fixed top-0 left-0 w-full h-14 z-50 bg-black/50"></Skeleton>}><Header/></Suspense>
      { children }
      <Footer />
      <AuthPopup />
      {/*<Toaster />*/}
    </main>
  )
}