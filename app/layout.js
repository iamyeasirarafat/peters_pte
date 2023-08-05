"use client";
import { store } from "@/src/redux/store";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      {/* for dark mood toggle this normal to dark */}
      <html className="normal" lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </Provider>
  );
}
