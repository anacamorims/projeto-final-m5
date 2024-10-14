import styles from "./animation.module.css"

export default function Animation() {
  return (
    <div className={styles.backgroundAnimation}>
      <div className={styles.circleOne}></div>
      <div className={styles.circleTwo}></div>
    </div>
  );
}
