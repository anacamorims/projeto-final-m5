import styles from "./home.module.css";
import Card from "../../../components/card-bank/card";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";

import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

export default function HomeApp() {
  return (
    <section className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.avatarUser}>
          <AccountCircleRoundedIcon />
        </div>
        <div className={styles.welcomeText}>
          <span>Bem vindo(a),</span>
          <h4>Nome de Usuário</h4>
        </div>
      </nav>

      <div className={styles.dashContent}>
        <div className={styles.containerResponse}>
          <div className={styles.cardContainer}>
            <Card />
          </div>
          <ul className={styles.icons}>
            <li className={styles.icon}>
              <AccountBalanceWalletRoundedIcon />
            </li>
            <li className={styles.icon}>
              <AccountBalanceWalletRoundedIcon />
            </li>
            <li className={styles.icon}>
              <AccountBalanceWalletRoundedIcon />
            </li>
            <li className={styles.icon}>
              <AccountBalanceWalletRoundedIcon />
            </li>
          </ul>
        </div>

        <div className={styles.transactions}>
          <div className={styles.transactionsNav}>
            <h3>Transações</h3>
            <span>ver tudo</span>
          </div>
        </div>

      </div>
    </section>
  );
}
