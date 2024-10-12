import React from 'react';
import { Button } from '@mui/material';
import styles from './home.module.css';

const Home = () => {
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
