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
  const [boost, setBoost] = useState(0);
  const [loading, setLoading] = useState(false);
  const [updatable, setUpdatable] = useState(false);
  const check = (score: number | undefined) => {
    if (score) {
      return score;
    } else {
      return 0;
    }
  };
  const checkAddress = async (e: any) => {
    e.preventDefault();
    if (isAddress(currentAddress)) {
      try {
        const res = await axios.get(
          "https://score.onchaincoin.io/api/site/get?address=" + currentAddress
        );
        console.log(res.data.docs[0]);
        const getTimestamp = (timestamp: string) => {
          const date = Date.parse(timestamp) + 24 * 60 * 60 * 1000;
          return date;
        };
        const update = getTimestamp(res.data.docs[0].lastUpdate);
        const now = Date.now();
        setUpdatable(update - now < 0);
        setPoints(
          check(res.data.docs[0].farcasterNativeScore) +
            check(res.data.docs[0].rawScore)
        );
        setBoost(check(res.data.docs[0].totalBoost));
        setAddress(currentAddress);
        setLoading(res.data.docs[0].shouldBeUpdated);
      } catch (e) {
        console.log(e);
        toast.error("Error while getting points from db");
      }

      // setAddress(currentAddress);
    } else {
      toast.error("Invalid address");
    }
  };
  const updateScore = async (e: any) => {
    e.preventDefault();
    if (isAddress(currentAddress)) {
      try {
        const res = await axios.get(
          "https://score.onchaincoin.io/api/site/update?address=" + currentAddress
        );
        setLoading(true);
      } catch (e) {
        console.log(e);
        toast.error("Updating error");
      }

      // setAddress(currentAddress);
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

          {!loading ? (
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <div>
                <div className={style.input__score}>
                  base score: {points} $onchain
                </div>
                <div className={style.input__score}>
                  boost: {boost} %
                </div>
                <div className={style.input__score}>
                  total score: {points + (points / 100) * boost} $onchain
                </div>
              </div>
              {updatable && (
                <button className={style.update__score} onClick={updateScore}>
                  Update Score
                </button>
              )}
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", marginTop:'20px' }}>
              <div>your score is updating...</div>
              <button className={style.update__score} onClick={checkAddress}>
                Refresh
              </button>
            </div>
          )}

          <div className={style.input__row}>
            {/* <div
              // target="_blank"
              className={classNames(
                style.input__join,
                // !connected &&
                style.input__disconnected
              )}
            >
              claim <img src="/arrow.svg" />
            </div>
            <ConnectButtonCustom /> */}
          </div>
        </div>
      )}
    </>
  );
};
export default EnterAddress;
