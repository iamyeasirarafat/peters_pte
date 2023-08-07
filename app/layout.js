"use client";
import { store } from "@/src/redux/store";
import axios from "axios";
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
      config.baseURL = "http://3.108.252.181:7000";
      // config.headers["admin-key"] =
      //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6InByb3BlcnR5X3NvdXJjZV8mY2RkYSIsInVpZCI6InBzdEBjZGRhMTIzIiwiaWF0IjoxNTE2MjM5MDIyfQ.hDA4YM_ZeWOA2wte6YGwm2fwMCePW7PqyG3zM2ydM6E";
      // config.headers["access-token"] = getCookie("access_token");
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
};
