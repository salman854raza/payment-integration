import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Navbar />
        <main className="container mx-auto py-8">{children}</main>
      </body>
    </html>
  );
}