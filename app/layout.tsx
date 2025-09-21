import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "NoteHub is a simple and efficient application designed for managing personal notes. It helps keep your thoughts organized and accessible in one place, whether you are at home or on the go. The app provides a clean interface for writing, editing, and browsing notes. With support for keyword search and structured organization, NoteHub offers a streamlined experience for anyone who values clarity and productivity.",
  openGraph: {
    title: "NoteHub",
    description: "NoteHub is a simple and efficient application designed for managing personal notes. It helps keep your thoughts organized and accessible in one place, whether you are at home or on the go. The app provides a clean interface for writing, editing, and browsing notes. With support for keyword search and structured organization, NoteHub offers a streamlined experience for anyone who values clarity and productivity.",
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub icon."
      }
    ]
  }
};

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode,
  modal: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            <main>
              {children}
              {modal}
            </main>
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}