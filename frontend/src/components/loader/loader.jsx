import React from "react";
import styles from "./loader.module.css";

const Loader = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.loader}></div>
        <div className={styles.shadow}></div>
      </div>
    </>
  );
};

export default Loader;
