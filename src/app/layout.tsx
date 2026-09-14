import type { Metadata , Viewport } from "next";
import { Providers } from "./providers";
import "./globals.css";
import { Nunito } from 'next/font/google'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // Jo weights aap ko chahiye (e.g., Regular, Semi-Bold, Bold)
  variable: '--font-nunito',     // CSS variable ka naam
})
export const metadata: Metadata = {
  title: "Rider",
  description: "Enterprise resource planning admin dashboard",
   manifest: "/manifest.json", // Yeh line manifest ko link karti hay
    // themeColor: "#27AE60",
  icons: {
    icon: [
      { url: "/icon/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/icon/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#27AE60",
};

// export const viewport: Viewport = {
//   themeColor: '#27AE60', // active color or your design color
// }
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="corporate">
      <body className={`${nunito.variable} font-sans min-h-screen bg-base-200 antialiased`}>
         
        <Providers> {children}</Providers>
      </body>
    </html>
  );
}
