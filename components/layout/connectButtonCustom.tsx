import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useEffect, useState } from "react";
import { SeparatedConnect } from "./separatedConnect";
// import { useConnect, useWalletClient } from "wagmi";
import classNames from "classnames";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import style from "./header.module.scss";
import { useAccount } from "wagmi";
import { useStore } from "zustand";
import { useWeb3Store } from "../../stores/useWeb3";
const ConnectButtonCustom = ({
  isHeader,
  isAuth,
}: {
  isHeader?: boolean;
  isAuth?: boolean;
}) => {
  const setProvider = useWeb3Store((state) => state.setProvider);
  const provider = useWeb3Store((state) => state.provider);
  const connectedFromState = useWeb3Store((state) => state.connected);
  const setConnected = useWeb3Store((state) => state.setConnected);
  const router = useRouter();
  return (
    <ConnectButton.Custom>
      {({ account, chain, openChainModal, authenticationStatus, mounted }) => {
        // const connect = useConnect()
        // console.log(connect, window.ethereum);
        const { connector } = useAccount();

        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        // useEffect(()=>{
        //   if(claim!==0) {
        //     setReward(Number(Number(fromWei(claim.toString())).toFixed(2)))
        //   }
        // },[claim])
        useEffect(() => {
          if (connector) {
            console.log("connector", connector, account);
            getProvider();
          }
        }, [connector]);
        const getProvider = async () => {
          const res = await connector?.getProvider();
          setProvider(account?.address, res);
        };
        useEffect(() => {
          setConnected(connected);
        }, [connected]);
        // useEffect(() => {
        //   if (account?.address ) {
        //     setAddress(walletClient?.transport, account?.address);
        //   }
        // }, [account?.address]);
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (chain?.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className={classNames(style.modal__mint__button)}
                  >
                    Change Network
                  </button>
                );
              }
              if (!connectedFromState) return <SeparatedConnect />;
              return <></>;
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
export default ConnectButtonCustom;
