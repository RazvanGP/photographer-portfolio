import styles from "./styles/diaphragmAnimation.module.css";

const DiaphragmAnimation = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.blade + " " + styles.first}></div>
        <div className={styles.blade + " " + styles.second}></div>
        <div className={styles.blade + " " + styles.third}></div>
        <div className={styles.blade + " " + styles.fourth}></div>
        <div className={styles.blade + " " + styles.fifth}></div>
        <div className={styles.blade + " " + styles.sixth}></div>
      </div>
    </>
  );
};

export default DiaphragmAnimation;
