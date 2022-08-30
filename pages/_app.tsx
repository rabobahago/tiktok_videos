import { useState, useEffect } from "react";
import "../styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MyApp = ({ Component, pageProps }: AppProps) => {
  //next can both run on server and client side
  //at a start this page will be serverside render, and that is why we are setting isSSR to true in this component
  const [isSSR, setisSSR] = useState(true);
  //at the start this component is serverside but we have tell where it will change to client side render
  //that is why setisSSR is set to force when ever the component run once, this achieve with useEffect that run once with
  //empty array.

  useEffect(() => {
    setisSSR(false);
  }, []);
  //if serverside render stop from running client side, that is stop running client side rendering
  if (isSSR) return null;
  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
    >
      <div className="xl:w-[1200px] m-auto overflow-hidden h-[100vh]">
        <Navbar />
        <div className="flex gap-6 md:gap-20">
          <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
            <Sidebar />
          </div>
          <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] video flex-1">
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};
export default MyApp;
//https://tiktok-clone-final-izkp5le3d-rabobahago.vercel.app/
