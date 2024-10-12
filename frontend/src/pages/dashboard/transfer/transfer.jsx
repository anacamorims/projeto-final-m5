import styles from "./transfer.module.css";

import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

import AccountCircle from "@mui/icons-material/AccountCircle";
import TagRoundedIcon from "@mui/icons-material/TagRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";

export default function Transfer() {
  return (
    <section className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.avatarUser}>
          <AccountCircleRoundedIcon />
        </div>
        <div className={styles.welcomeText}>
          <h4>Nome de Usuário</h4>
        </div>
      </nav>

      <div className={styles.transferContent}>
        <div className={styles.titleTransfer}>
          <h2>Transferir</h2>
        </div>

        <form action="">
          <div className={styles.input_field}>
            <input required name="numberAccont" type="number" />
            <label>Numero da conta</label>
            <span className={styles.icon}>
              <TagRoundedIcon />
            </span>
          </div>
          <div className={styles.input_field}>
            <input required name="numberAccont" type="number" />
            <label>Valor enviado</label>
            <span className={styles.icon}>
              <AttachMoneyRoundedIcon />
            </span>
          </div>
          <div className={styles.textarea_field}>
            <textarea required name="description"></textarea>
            <label>Description</label>
          </div>

          <div className={styles.amount}>
            <h4>Valor disponivel</h4>
            <h2>
              <span>R$</span> 1000.00
            </h2>
          </div>

          <div className={styles.transferButton}>
            <button type="submit">Transferir</button>
          </div>
        </form>
      </div>
    </section>
  );
}
