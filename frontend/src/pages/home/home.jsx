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
              Um banco digital focado em pequenas empresas, oferecendo funcionalidades que auxiliam no gerenciamento financeiro com simplicidade e eficiência. O banco digital busca resolver os desafios de gestão financeira enfrentados por pequenos negócios, fornecendo uma solução acessível, intuitiva e adaptada às suas necessidades.
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
            title={"Contas"}
            description={" As pequenas empresas podem criar contas com facilidade, utilizando um processo de verificação digital simples e seguro."}
          />
           <CardHome
            icon={CreditCardIcon}
            title={"Cartões"}
            description={"O banco permite o gerenciamento de cartões de débito/crédito, incluindo emissão, bloqueio e atualização de informações."}
          />
            <CardHome
            icon={WifiProtectedSetupIcon}
            title={"Transação"}
            description={"As transações (depósitos, saques, transferências) serão simuladas para proporcionar uma experiência completa de operação bancária."}
          />
        </div>
      </section>
    </>
  );
};