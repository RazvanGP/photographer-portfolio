import styles from "./styles/diaphragmAnimation.module.css";

import { useState } from "react";

const DiaphragmAnimation = () => {
  const [shutterEffect, setShutterEffect] = useState(false);

  return (
    <>
      <div className={styles.container + (shutterEffect ? "closed" : "")}>
        <div className={styles.blade}></div>
        <div className={styles.blade}></div>
        <div className={styles.blade}></div>
        <div className={styles.blade}></div>
        <div className={styles.blade}></div>
        <div className={styles.blade}></div>
      </div>

      <button
        className={styles.btn}
        onClick={() => setShutterEffect(!shutterEffect)}
      >
        TAKE PICTURE
      </button>
    </>
  );
};

export default DiaphragmAnimation;
