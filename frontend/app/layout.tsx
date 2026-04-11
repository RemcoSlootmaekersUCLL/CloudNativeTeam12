import type { Metadata } from "next";
import Header from "@/components/header";
import "./globals.css";

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
      <body>
        <Header />
        <main className="min-h-screen bg-[rgb(238,238,238)] text-black">
          {children}
        </main>
        {/* <main className="min-h-screen bg-mist-500/50">{children}</main> */}
      </body>
    </html>
  );
}
