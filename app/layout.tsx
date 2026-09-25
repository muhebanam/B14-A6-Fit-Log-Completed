import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toast } from "@/components/Toast";
import { PlanProvider } from "@/context/PlanContext";

export const metadata: Metadata = {
  title: {
    default: "FitLog — Workout Library",
    template: "%s | FitLog",
  },
  description: "A focused workout library and daily training log built with Next.js.",
  icons: { icon: "/images/logo.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <PlanProvider>
          <Navbar />
          <main className="min-h-[calc(100vh-168px)]">{children}</main>
          <Footer />
          <Toast />
        </PlanProvider>
      </body>
    </html>
  );
}
