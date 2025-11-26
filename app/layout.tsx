import type { Metadata } from "next";
import { Inter, Geist_Mono, Cinzel_Decorative } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-cinzel-decorative",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Talentust | Modern Recruitment Platform",
  description: "Find, evaluate, and hire the best candidates faster with our all-in-one recruitment platform. Automate CV parsing, scoring, and candidate management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} ${cinzelDecorative.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
