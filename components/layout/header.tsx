import React from "react";
import styles from "./header.module.scss";
const Header: React.FC = ({ scrollRef }: any) => {
  const [menu, setMenu] = React.useState(false);
  const scrollTo = () => {
    setMenu(false);
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <header className={styles.header}>
      {menu && (
        <div className={styles.menu__open}>
          <img
            onClick={() => setMenu(false)}
            style={{
              width: "50px",
              height: "50px",
              alignSelf: "flex-end",
              marginRight: "20px",
              marginTop: "20px",
            }}
            src="/cross.svg"
          />
          <div className={styles.header__links__mob}>
            <a
              href="https://warpcast.com/~/channel/onchaincoin"
              target="_blank"
            >
              Warpcast
            </a>
            <a onClick={scrollTo}>Airdrop</a>
            <a href="#" target="_blank">
              Buy $onchain
            </a>
          </div>
        </div>
      )}
      <img className={styles.header__logo} src="../logo.svg" />
      <img className={styles.header__mob} src="../logo__mob.svg" />
      <div className={styles.header__links}>
        <a href="https://warpcast.com/~/channel/onchaincoin" target="_blank">
          Warpcast
        </a>
        <a onClick={scrollTo}>Airdrop</a>
        <a href="#" target="_blank">
          Buy $onchain
        </a>
      </div>
      <img
        className={styles.header__mob}
        src="../Burger.svg"
        onClick={() => {
          setMenu(!menu);
        }}
      />
    </header>
  );
};

export default Header;
