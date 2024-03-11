import React from "react";
import styles from "./main.module.scss";
import EnterAddress from "./enterAddress";
const FirstScreen: React.FC = () => {
  return (
    <div className={styles.first__screen}>
      <div>
        <div className={styles.first__title}>$ONCHAIN IS THE NEXT ONLIN</div>
        <EnterAddress />
      </div>
      <div className={styles.first__text}>
        $onchain is an ERC-20 token on Base, launched in March 2024. $onchain
        aims to support base builders and onchain contributors.
        <div style={{ marginTop: "20px" }}>
          If you’re doing things onchain — no matter how small they are — you’re
          eligible for $onchain airdrop. Even owning a ens or a freemint base
          NFT matters. Claiming is open until April 1.
        </div>
      </div>
      <div className={styles.first__keep}>🔵 keep us together</div>
    </div>
  );
};

export default FirstScreen;
