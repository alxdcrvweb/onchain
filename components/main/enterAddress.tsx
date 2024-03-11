import { useState } from "react";
import style from "./main.module.scss";
import classNames from "classnames";
import ConnectButtonCustom from "../layout/connectButtonCustom";
import { useWeb3Store } from "../../stores/useWeb3";
import { toast } from "react-toastify";
import { isAddress } from "web3-validator";
import { getPointsByAddressAndWriteToDb } from "../../lib/db";
import axios from "axios";
const EnterAddress = () => {
  const [currentAddress, setCurrentAddress] = useState("");
  const [address, setAddress] = useState("");
  const [points, setPoints] = useState(0);
  const connected = useWeb3Store((state) => state.connected);
  const checkAddress = async (e: any) => {
    e.preventDefault();
    if (isAddress(currentAddress)) {
      await axios
        .get("/api/points?address=" + currentAddress)
        .then((res) => {
          console.log(res.data.points);
          setPoints(res.data.points);
        });
      setAddress(currentAddress);
    } else {
      toast.error("Invalid address");
    }
  };
  return (
    <>
      {address == "" ? (
        <form onSubmit={checkAddress}>
          <input
            placeholder="Enter your address"
            className={style.input__address}
            value={currentAddress}
            onChange={(e) => {
              setCurrentAddress(e.target.value);
            }}
          />
          <img
            className={style.input__arrow}
            src="./arrow.svg"
            onClick={checkAddress}
          />
        </form>
      ) : (
        <div>
          <input
            placeholder="Enter your address"
            className={style.input__address}
            value={currentAddress}
            onChange={(e) => {
              setCurrentAddress(e.target.value);
              setAddress("");
            }}
          />
          <div className={style.input__score}>
            your score: {points} $onchain
          </div>
          <div className={style.input__row}>
            <div
              // target="_blank"
              className={classNames(
                style.input__join,
                // !connected && 
                style.input__disconnected
              )}
            >
              claim <img src="/arrow.svg" />
            </div>
            <ConnectButtonCustom />
          </div>
        </div>
      )}
    </>
  );
};
export default EnterAddress;
