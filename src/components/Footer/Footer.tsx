import Logo from "../../assets/LBC-logo.png";
import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={`container ${styles.footerContent}`}>
        <div className={styles.footerLogo}>
          <img src={Logo} alt="Logotipo LBC" />
        </div>
        <p>Exercício desenvolvido por: Mariana Gomes</p>
      </div>
    </footer>
  );
};
