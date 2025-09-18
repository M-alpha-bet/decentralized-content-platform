import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./Providers";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Decentralized Content Platform",
  description: "Decentralized content platform for the web",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 1000,
            style: {
              background: "#333",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 600,
              borderRadius: "8px",
              padding: "10px 15px",
            },
          }}
        />
      </body>
    </html>
  );
}
