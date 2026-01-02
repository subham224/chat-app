import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from "@/components/Navbar";
import { Providers } from "@/components/Providers";
import { Toaster } from 'sonner'; // <--- IMPORT THIS

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NextChat 3D",
  description: "Experience spatial conversation.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className} suppressHydrationWarning>
          <Providers>
            <Navbar />
            {children}
            
            {/* ADD THIS AT THE BOTTOM */}
            <Toaster position="bottom-right" richColors theme="system" />
            
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}