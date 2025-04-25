import Logo from "../../assets/LBC-logo.png";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={`container g-0 ${styles.headerContainer}`}>
      <div className={styles.headerLogo}>
        <img src={Logo} alt="Logotipo LBC" />
      </div>
    </header>
  );
};
