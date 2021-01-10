import styles from "../styles/ShimmerPanel.module.css";
import React, { useState } from "react";
import Shimmer from "react-shimmer-effect";

const ShimmerPanel = (props) => {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>
        {/* <span onClick={() => setBookmarked(!bookmarked)}>
          <svg
            height="25"
            width="25"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill={bookmarked ? "black" : "white"}
            stroke={bookmarked ? "" : "black"}
            strokeWidth="1.5"
            style={{ margin: "2.1 4 0 0", cursor: "pointer" }}
          >
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
        </span> */}
        {props.title}
      </h2>

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
