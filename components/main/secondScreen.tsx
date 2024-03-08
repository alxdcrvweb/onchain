import style from "./main.module.scss";
const rows = [
  "Base official NFT ownership",
  "FC-native collections ownership",
  "Popular base collections ownership",
  "Selected Base tokens ownership",
  "Owning ens ",
  "Having 100+ transactions ",
  "Active badge on Farcaster",
];
const SecondScreen = () => {
  return (
    <div className={style.second}>
      <div className={style.second__row}>
        <div className={style.second__text}>
          $onchain is an ERC-20 token on Base, launched in March 2024. $onchain
          aims to support base builders and onchain contributors with airdrop.
          If you’re doing things onchain — no matter how small they are — you’re
          eligible for $onchain airdrop. Even owning a ens or a freemint base
          NFT matters. Claiming is open until April 1.{" "}
        </div>
        <div className={style.second__join}>
          Join <img src="/arrow.svg" />
        </div>
      </div>
      <div className={style.second__info}>
        <div>
          <div className={style.second__title}>airdrop SIZE VARIABLES</div>
          {rows.map((row,i) => <div className={style.second__part} key={i}><span>🔵</span>{'  '}{row}</div>)}
        </div>
        <img src="/chains.png" />
      </div>
      <div className={style.second__info__bottom}>bringing the world $onhcain</div>
      <div className={style.second__bottom}>
        <a href="#">Warpcast</a>
        <a href="#">X</a>
        <a href="#">Telegram</a>
      </div>
    </div>
  );
};
export default SecondScreen;
