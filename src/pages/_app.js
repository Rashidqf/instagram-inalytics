import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";
import Link from "next/link";
import Mainheader from "@/customComponent/Mainheader";

export default function App({ Component, pageProps }) {
  return (
    <>
      <NextTopLoader color="#FF0000" showSpinner={false} />
      <SessionProvider session={pageProps.session}>
        <Mainheader />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
