import "../styles/main.scss";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import React, { Suspense } from "react";
import "../components/polyfills";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { base } from "wagmi/chains";
import { ToastContainer } from "react-toastify";
import "../components/polyfills";
import Head from "next/head";

import { WagmiProvider, createConfig, http } from "wagmi";
import { QueryClient } from "@tanstack/query-core";
//@ts-ignore
import { QueryClientProvider } from "@tanstack/react-query"
// import { SessionProvider, getCsrfToken } from "next-auth/react";
const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
});
// export async function getServerSideProps(context: any) {
//   const csrfToken = await getCsrfToken(context);
//   return { props: { csrfToken } };
// }
const queryClient = new QueryClient();
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const AnyComponent = Component as any;
  console.log(pageProps);
  const [loading, setLoading] = useState(false);
  // try reconnect to web3
  useEffect(() => {
    setLoading(true);
  }, []);
  return (
    <>
      {loading ? (
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <Suspense fallback={<h1>Loading posts...</h1>}>
                {/* <Rotate /> */}
                <Head>
                  <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                  ></meta>
                </Head>

                <AnyComponent {...pageProps} />

                <ToastContainer style={{ zIndex: 10000000000 }} />
                {/* <ModalsContainer /> */}
              </Suspense>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      ) : (
        <></>
      )}
    </>
  );
}

export default MyApp;
