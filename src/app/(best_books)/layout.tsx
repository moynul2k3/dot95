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
    <main className="bg-amber-200">
      { children }
      <Footer />
      <AuthPopup />
      {/*<Toaster />*/}
    </main>
  )
}