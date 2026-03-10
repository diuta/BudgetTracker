import type { Metadata } from "next";
import "@/app/globals.css";
import { Layout } from "@/components/layout/Layout";

export const metadata: Metadata = {
  title: "Spendings — Personal Finance Ledger",
  description: "Track your personal finances with an editorial aesthetic.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
