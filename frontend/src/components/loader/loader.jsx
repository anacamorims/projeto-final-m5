import React from "react";
import styles from "./loader.module.css";
import Animation from "../backgroundAnim/animation";

const Loader = () => {
  return (
    <>
      <Animation />

      <div className={styles.container}>
        <div className={styles.loader}></div>
        <div className={styles.shadow}></div>
      </div>
    </>
  );
};

export default Loader;
