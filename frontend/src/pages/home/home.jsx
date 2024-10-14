import styles from "./home.module.css";
import { Box } from "@mui/material";
import ButtonHome from "../../components/button-home/ButtonHome";
import CardHome from "../../components/card-home/CardHome";
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';

export default function Home() {
  return (
    <>
      <section className={styles.homeContainer}>
        <div className={styles.homeContent}>
          <Box sx={{ 
            mb: 5,
            fontSize: {
              xs: "20px",
              sm: "30px",
              md: "35px"
            }
          }}>
          <h1>meet the credit card of the future</h1>
        </Box>
          
          <div className={styles.homeText}>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat,
              totam soluta eveniet, laudantium unde dolore doloremque ipsam
              accusamus commodi quia veritatis. Alias ratione hic cupiditate
              inventore quisquam maiores facere sint!
            </p>

            <Box sx={{ display: "flex", gap: 2}}>
              <ButtonHome name={"Entrar"} to={"sign/in"} />
              <ButtonHome name={"Cadastrar"} to={"sign/up"} />
            </Box>
          </div>
        </div>
      </section>

      <section className={styles.homeContainer}>
        <Box sx={{ 
          borderLeft: "2px solid blue", 
          paddingLeft: "17px", 
          fontSize: "1.5em",
          gap: "2rem", 
          m: "20px 1em" }}>
          <h2>Nossos Serviços</h2>
        </Box>

        <div className={styles.container_cards_home}>
          <CardHome
            icon={AccountBalanceWalletOutlinedIcon}
            title={"Accounts"}
            description={"lorem ipsum seila seila ipsin"}
          />
           <CardHome
            icon={CreditCardIcon}
            title={"Accounts Cards"}
            description={"lorem ipsum seila seila ipsin"}
          />
            <CardHome
            icon={WifiProtectedSetupIcon}
            title={"Transation"}
            description={"lorem ipsum seila seila ipsin"}
          />
        </div>
      </section>
    </>
  );
};