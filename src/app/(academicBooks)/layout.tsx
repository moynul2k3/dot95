import type { Metadata } from "next";
//import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import 'boxicons/css/boxicons.min.css';
import AuthPopup from "../components/registration/AuthPopup";
//import { Toaster } from "@/components/ui/sonner"

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
    <main className="">
      <div className="max-md:px-4 md:px-8 lg:px-10 xl:px-24 h-auto w-full mt-20 md:mt-28">
        { children }
      </div>
      <Footer />
      <AuthPopup />
      {/*<Toaster />*/}
    </main>
  )
}

