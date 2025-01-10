import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vibe Check",
  description: "Do a quick vibe check of a meeting or get some feedback after a presentation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={
          inter.className +
          " flex flex-col justify-center items-center h-screen text-center"
        }
      >
        {children}
      </body>
    </html>
  );
}
