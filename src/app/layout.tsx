import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/store/provider";
import { Toaster } from "sonner";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ispahani Banglabid Admin Portal",
  description: "Management portal for Ispahani Banglabid contest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-surface" suppressHydrationWarning>
        <StoreProvider>
          {children}
          <Toaster position="top-right" richColors />
        </StoreProvider>
      </body>
    </html>
  );
}
