import React from "react";
import styles from "./header.module.scss";
const Header: React.FC = () => {
  const [menu, setMenu] = React.useState(false);
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
            <a href="#">Warpcast</a>
            <a href="#">Airdrop</a>
            <a href="#">Buy $onchain</a>
          </div>
        </div>
      )}
      <img className={styles.header__logo} src="../logo.svg" />
      <img className={styles.header__mob} src="../logo__mob.svg" />
      <div className={styles.header__links}>
        <a href="#">Warpcast</a>
        <a href="#">Airdrop</a>
        <a href="#">Buy $onchain</a>
      </div>
      <img
        className={styles.header__mob}
        src="../burger.svg"
        onClick={() => {
          setMenu(!menu);
        }}
      />
    </header>
  );
};

export default Header;
