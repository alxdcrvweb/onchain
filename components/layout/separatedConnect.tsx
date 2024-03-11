import { useConnectModal } from "@rainbow-me/rainbowkit";
import style from "./header.module.scss";
import classNames from "classnames";

export const SeparatedConnect = ({
  cssClassProps,
}: {
  cssClassProps?: any;
}) => {
  const { openConnectModal } = useConnectModal();
  return (
    <div
      className={classNames(style.button__connect__cont)}
      onClick={() => {
        // localStorage.setItem("auth", "false")
        openConnectModal && openConnectModal();
      }}
    >
      {" "}
      <img src="./MetaMaskFox.svg" />
      <button type="button" className={classNames(style.button__connect)}>
        Connect wallet
      </button>
    </div>
  );
};
