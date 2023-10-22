import { store } from "@/redux/store";
import "@/styles/customize-progress-bar.css";
import "@/styles/globals.css";
import { ColorModeProvider, ColorModeScript } from "@chakra-ui/color-mode";
import axios from "axios";
import { getCookie } from "cookies-next";
import { Roboto_Flex } from "next/font/google";
import "react-circular-progressbar/dist/styles.css";
import { Provider } from "react-redux";

const roboto = Roboto_Flex({
  weight: ["400", "500", "700", "800"],
  subsets: ["latin"],
  display: "block",
  variable: "--font-roboto",
});

export default function App({ Component, pageProps }) {
  return (
    <main className={`${roboto.variable} font-sans`}>
      <SetValues />
      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>
      <Provider store={store}>
        <ColorModeProvider>
          <ColorModeScript
            initialColorMode="system"
            key="chakra-ui-no-flash"
            storageKey="chakra-ui-color-mode"
          />
          <Component {...pageProps} />
        </ColorModeProvider>
      </Provider>
    </main>
  );
}

const SetValues = () => {
  // Axios Interceptor
  axios.interceptors.request.use(
    async (config) => {
      config.baseURL = process.env.NEXT_PUBLIC_API_URL;
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
