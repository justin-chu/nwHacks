import styles from "../styles/ShimmerPanel.module.css";
import React, { useState } from "react";
import Shimmer from "react-shimmer-effect";

const ShimmerPanel = (props) => {
  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>{props.title}</h2>

      <div className={styles.info}>
        <p className={styles.subheaderContainer}>
          <span className={styles.emoji}>ℹ️</span>
          <span className={styles.subheader}>Info</span>
        </p>
        {Array.apply(null, { length: 10 }).map((e, i) => (
          <Shimmer style={{ marginBottom: 20 }}>
            <div style={{ height: 16, width: "100%", borderRadius: 5 }} />
          </Shimmer>
        ))}
      </div>

      <div className={styles.info}>
        <p className={styles.subheaderContainer}>
          <span className={styles.emoji}>🎓</span>
          <span className={styles.subheader}>{props.title} prerequisites</span>
        </p>
        {Array.apply(null, { length: 10 }).map((e, i) => (
          <Shimmer style={{ marginBottom: 20 }}>
            <div style={{ height: 28, width: "100%", borderRadius: 5 }} />
          </Shimmer>
        ))}
      </div>

      <div className={styles.info} style={{ paddingBottom: 25 }}>
        <p className={styles.subheaderContainer}>
          <span className={styles.emoji}>📖</span>
          <span className={styles.subheader}>Helpful books</span>
        </p>
        {Array.apply(null, { length: 10 }).map((e, i) => (
          <Shimmer style={{ marginBottom: 20 }}>
            <div style={{ height: 28, width: "100%", borderRadius: 5 }} />
          </Shimmer>
        ))}
      </div>

      <div className={styles.info} style={{ border: "none" }}>
        <p className={styles.subheaderContainer}>
          <span className={styles.emoji}>🎥</span>
          <span className={styles.subheader}>Educational videos</span>
        </p>
        {Array.apply(null, { length: 5 }).map((e, i) => (
          <Shimmer style={{ marginBottom: 20 }}>
            <div style={{ height: 100, width: "100%", borderRadius: 5 }} />
          </Shimmer>
        ))}
      </div>
    </div>
  );
};

export default ShimmerPanel;
