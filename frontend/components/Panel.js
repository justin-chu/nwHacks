import styles from "../styles/Panel.module.css";
import React, { useState } from "react";

const Panel = (props) => {
  let list_of_courses = [];

  // const Courses = (course_dict) => {
  //   let n = Object.keys(course_dict);
  //   let j = n.length;
  //   console.log("yoooo " + j);
  //   if (j == 0) {
  //     return "";
  //   }
  //   if (j >= 1) {
  //     console.log("hey");
  //     for (var k in course_dict) {
  //       console.log("Looking at: " + k);
  //       return list_of_courses.append(Courses(k));
  //     }
  //   }

  //   return "";
  // };

  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>
        <span onClick={() => setBookmarked(!bookmarked)}>
          <svg
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill={bookmarked ? "black" : "white"}
            stroke={bookmarked ? "" : "black"}
            strokeWidth="1.5"
            style={{ margin: "2 4 0 0", cursor: "pointer" }}
          >
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
        </span>
        {props.data.title}
      </h2>

      <div className={styles.info}>
        <p>💁 {props.data.text}</p>
      </div>

      <div className={styles.info}>
        <p className={styles.head}>📍The Path to Machine Learning:</p>
        {/* <Courses course_dict={props.data.steps} /> */}

        {list_of_courses.map((c) => {
          return <div className={styles.course}>{c}</div>;
        })}
      </div>

      <div className={styles.info}>
        <p className={styles.head}>🎥 Videos to get Started:</p>
        {props.data.ytb_links.map((y) => {
          let code = y.substring(32, y.length);
          let url = "https://www.youtube.com/embed/" + code;
          // console.log(url);
          return (
            <div className={styles.video}>
              <iframe
                width="100%"
                allowfullscreen="allowfullscreen"
                src={url}
              ></iframe>
            </div>
          );
        })}
      </div>

      <div className={styles.info}>
        <p className={styles.head}>📚 Books on the Topic:</p>
        {props.data.books.map((b) => {
          return <div className={styles.book}>{b.title}</div>;
        })}
      </div>
    </div>
  );
};

export default Panel;
