import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from "@/components/Navbar"; // Ensure this path is correct now

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Chat App",
  description: "Built with Next.js, Clerk, and Stream",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      {/* Add suppressHydrationWarning here 👇 */}
      <html lang="en" suppressHydrationWarning> 
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}