import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "@/components/Toast";

export const metadata: Metadata = {
  title: "Bolt KS | Bang & Olufsen Kosovo",
  description: "Premium Bang & Olufsen audio products in Kosovo. Speakers, headphones, and televisions. Experience exceptional sound quality and timeless Danish design.",
  keywords: "Bang & Olufsen, B&O, speakers, headphones, televisions, audio, Kosovo, Pristina, premium audio",
  openGraph: {
    title: "Bolt KS | Bang & Olufsen Kosovo",
    description: "Premium Bang & Olufsen audio products in Kosovo. Experience exceptional sound quality and timeless Danish design.",
    type: "website",
    locale: "en_US",
    siteName: "Bolt KS",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bolt KS | Bang & Olufsen Kosovo",
    description: "Premium Bang & Olufsen audio products in Kosovo.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
