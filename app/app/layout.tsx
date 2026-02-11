import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bolt KS | Bang & Olufsen Kosovo",
  description: "Premium Bang & Olufsen audio products in Kosovo. Speakers, headphones, and televisions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
