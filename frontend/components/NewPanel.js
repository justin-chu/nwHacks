import styles from "../styles/NewPanel.module.css";
import React, { useState } from "react";
import ShimmerPanel from "./ShimmerPanel";

const recurse = (e, d) => {
  if (Object.keys(e)[0].length == 0) return null;
  let spacer = 0;
  for (let j = 0; j <= d; j++) {
    spacer = spacer + 6;
  }
  console.log(d, spacer);
  return (
    <div style={{ marginLeft: spacer }}>
      <div className={styles.book}>{Object.keys(e)[0]}</div>
      {e[Object.keys(e)[0]].map((x) => {
        return recurse(x, d + 1);
      })}
    </div>
  );
};

const NewPanel = (props) => {
  if (props.loading) {
    return <ShimmerPanel title={props.data.title} />;
  }

  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>{props.data.title}</h2>

      <div className={styles.info}>
        <p className={styles.subheaderContainer}>
          <span className={styles.emoji}>ℹ️</span>
          <span className={styles.subheader}>Info</span>
        </p>
        <p className={styles.text}>{props.data.text}</p>
      </div>

      <div
        className={styles.info}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <p className={styles.subheaderContainer}>
          <span className={styles.emoji}>🎓</span>
          <span className={styles.subheader}>
            {props.data.title} prerequisites
          </span>
        </p>
        <span>
          {props.data.steps[Object?.keys(props.data.steps)[0]]?.map((x) => {
            return recurse(x, 0);
          })}
        </span>
      </div>

      <div className={styles.info} style={{ paddingBottom: 25 }}>
        <p className={styles.subheaderContainer}>
          <span className={styles.emoji}>📖</span>
          <span className={styles.subheader}>Helpful books</span>
        </p>

        {props.data.books.map((b) => {
          return <div className={styles.book}>{b.title}</div>;
        })}
      </div>

      <div className={styles.info} style={{ border: "none" }}>
        <p className={styles.subheaderContainer}>
          <span className={styles.emoji}>🎥</span>
          <span className={styles.subheader}>Educational videos</span>
        </p>
        {props.data.ytb_links.map((y) => {
          let code = y.substring(32, y.length);
          let url = "https://www.youtube.com/embed/" + code;
          // console.log(url);
          return (
            <div className={styles.video}>
              <iframe
                frameBorder="0"
                width="100%"
                allowfullscreen="allowfullscreen"
                src={url}
              ></iframe>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewPanel;
