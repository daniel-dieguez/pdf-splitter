import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PDF Maestro",
  description: "es una herramienta diseñada para dar control total sobre tus documentos PDF.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning // esto es apra que no me de errores de renderizado en el cliente
    >
      <body className="min-h-full flex flex-col" 
      suppressHydrationWarning // esto es apra que no me de errores de renderizado en el cliente
      >{children}</body>
    </html>
  );
}
