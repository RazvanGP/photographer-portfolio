import styles from "./styles/diphragmAnimation.module.css";

const DiaphragmAnimation = () => {
  return (
    <div className={styles.outerCircle}>
      <div className={styles.line}></div>
      <div className={styles.line}></div>
      <div className={styles.line}></div>
      <div className={styles.line}></div>
      <div className={styles.line}></div>
      <div className={styles.line}></div>
      <div className={styles.pipe}></div>
      <div className={styles.pipe}></div>
      <div className={styles.pipe}></div>
    </div>
  );
};

export default DiaphragmAnimation;
