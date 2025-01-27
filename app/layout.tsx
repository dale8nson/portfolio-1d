import type { Metadata } from "next";
import "./globals.css";
import { makeStore } from "@/lib/store";
import { StoreProvider } from "@/components/StoreProvider";


const store = makeStore();

export const metadata: Metadata = {
  title: "Dale Tristan Hutchinson",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-screen h-screen">
      <StoreProvider>
      <body
        className={`bg-black w-screen h-screen text-[#607B96] font-[fira-code] antialiased`}
      >
        {children}
      </body>
      </StoreProvider>
    </html>
  );
}
