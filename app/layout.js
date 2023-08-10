"use client";
import { store } from "@/src/redux/store";
import axios from "axios";
import { getCookie } from "cookies-next";
import { Provider } from "react-redux";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <SetValues />
      {/* for dark mood toggle this normal to dark */}
      <html className="normal" lang="en">
        <body>{children}</body>
      </html>
    </Provider>
  );
}

const SetValues = () => {
  // Axios Interceptor
  axios.interceptors.request.use(
    async (config) => {
      config.baseURL = "http://3.110.151.3:7000";
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
