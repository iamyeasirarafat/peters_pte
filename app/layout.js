"use client";
import { store } from "@/src/redux/store";
import axios from "axios";
import { getCookie } from "cookies-next";
import { Provider } from "react-redux";
import "./globals.css";
import "react-circular-progressbar/dist/styles.css";

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <SetValues />
      {/* for dark mood toggle this normal to dark */}
      <html className="normal font-cabin" lang="en">
        <body>{children}</body>
      </html>
    </Provider>
  );
}

const SetValues = () => {
  // Axios Interceptor
  axios.interceptors.request.use(
    async (config) => {
      config.baseURL = "http://127.0.0.1:8000";
      if (getCookie("access_token")) {
        config.headers["Authorization"] = `Bearer ${getCookie("access_token")}`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
};
