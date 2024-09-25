// app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import ThemeWrapper from "./components/ThemeWrapper";
import { SnackbarProvider } from "./components/Snackbar";
import { ConfirmationDialogProvider } from "./components/ConfirmationDialog";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Animalis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeWrapper>
          <SnackbarProvider>
            <ConfirmationDialogProvider>
              <Navbar />
              {children}
            </ConfirmationDialogProvider>
          </SnackbarProvider>
        </ThemeWrapper>
      </body>
    </html>
  );
}
