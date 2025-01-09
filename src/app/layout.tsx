import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hero quest character sheet",
  description: "Web app to manage hero quest character sheets, works offline",
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
