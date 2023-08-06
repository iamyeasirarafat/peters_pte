"use client";
import { store } from "@/src/redux/store";
import { Provider } from "react-redux";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      {/* for dark mood toggle this normal to dark */}
      <html className="normal" lang="en">
        <body>{children}</body>
      </html>
    </Provider>
  );
}
