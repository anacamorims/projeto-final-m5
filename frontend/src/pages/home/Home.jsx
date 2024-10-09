import styles from "./home.module.css";
import { Link } from "react-router-dom";
import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Card from '../../components/card-bank/card'; // Caminho correto para o arquivo

const useStyles = makeStyles({
  root: {
    backgroundColor: 'black',
    color: 'white',
    '&:hover': {
      backgroundColor: 'secondary.main',
    },
  },
});

export default function Home() {

  const classes = useStyles(); 

  return (
    <>
    <section className={styles.homeContainer}>
      <div className={styles.homeContent}>
        <div className={styles.homeTitle}>
          <h1>meet the credit card of the future</h1>
        </div>
        <div className={styles.homeText}>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat,
            totam soluta eveniet, laudantium unde dolore doloremque ipsam
            accusamus commodi quia veritatis. Alias ratione hic cupiditate
            inventore quisquam maiores facere sint!
          </p>
          <Link to={"/sign-in"}>
            <Button variant="contained" color="primary">Saiba mais</Button>
          </Link>
        </div>
      </div>
      <div className={styles.img}>
        <Card />
      </div>
    </section>
    <section>
      dasd
    </section>
    
    </>
  );
}
