import type { Metadata } from "next";
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
      <body className="m-4 min-h-screen bg-white">
        <main>{children}</main>
      </body>
    </html>
  );
}
