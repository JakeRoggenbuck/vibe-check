import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vibe Check",
  description:
    "Do a quick vibe check of a meeting or get some feedback after a presentation",

  openGraph: {
    title: "Vibe Check",
    description:
      "Do a quick vibe check of a meeting or get some feedback after a presentation",
    url: "https://the-vibe-check.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://github.com/user-attachments/assets/af9488da-9bce-468e-a508-2a73a0f5243e",
        width: 1900,
        height: 940,
        alt: "Vibe Check Preview",
      },
    ],
  },
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
          " flex flex-col justify-center items-center h-screen text-center bg-neutral"
        }
      >
        {children}
      </body>
    </html>
  );
}
