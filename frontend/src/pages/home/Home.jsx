import { Button } from '@mui/material';
import styles from './home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome to My Bank</h1>
      <Button variant="contained" color="primary">Get Started</Button>
    </div>
  );
};

export default Home;
