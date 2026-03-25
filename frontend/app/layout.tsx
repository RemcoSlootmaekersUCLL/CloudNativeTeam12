import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Cloud Native Team 12",
  description: "Fitness and Health Tracking App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <Header />
        <main className="min-h-screen bg-mist-500/90">{children}</main>
      </body>
    </html>
  );
}
