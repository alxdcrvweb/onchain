
import type { NextPage } from "next";
import Head from "next/head";
import FirstScreen from "../components/main/firstScreen";
import Header from "../components/layout/header";
import SecondScreen from "../components/main/secondScreen";
import { useRef } from "react";

const Home: NextPage = ((props) => {
  const scrollRef = useRef(null);
  return (
    <div>
      <Head>
        <title>Onchain</title>
         <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        ></meta>
      </Head>
      <Header scrollRef={scrollRef}/>
      <FirstScreen/>
      <SecondScreen scrollRef={scrollRef}/>
    </div>
  );
});

export default Home;
