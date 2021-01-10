import styles from "../styles/NewPanel.module.css";
import React, { useState } from "react";
import ShimmerPanel from "./ShimmerPanel";
import { Accordion } from "semantic-ui-react";
const AccordionContent = (content) => <div className="indent">{content}</div>;

const SubAccordion1Panels = [
  {
    title: "Sub Accordion 11",
    content: { content: AccordionContent("11 Content"), key: "11-content" },
    key: "sub-accordion-11",
  },
  {
    title: "Sub Accordion 12",
    content: { content: AccordionContent("12 Contents"), key: "12-content" },
    key: "sub-accordion-12",
  },
  {
    title: "Sub Accordion 13",
    content: { content: AccordionContent("13 Contents"), key: "13-content" },
    key: "sub-accordion-13",
  },
];

const SubAccordion1Content = (
  <div className="indent">
    <Accordion.Accordion
      style={{ marginLeft: "20px" }}
      className="no-padding"
      panels={SubAccordion1Panels}
    />
  </div>
);

const SubAccordionPanels = [
  {
    title: "Sub Accordion 1",
    content: { content: SubAccordion1Content, key: "sa1-content" },
    key: "sub-accordion-1",
  },
  {
    title: "Sub Accordion 2",
    content: { content: AccordionContent("SA2 Content"), key: "sa2-content" },
    key: "sub-accordion-2",
  },
  {
    title: "Sub Accordion 3",
    content: { content: AccordionContent("SA3 Content"), key: "sa3-content" },
    key: "sub-accordion-3",
  },
];

const SubAccordions = (
  <div className="indent">
    <Accordion.Accordion className="no-padding" panels={SubAccordionPanels} />
  </div>
);

const AccordionPanels = [
  {
    title: "Accordion",
    content: { content: SubAccordions, key: "sub-accordions" },
  },
];

const AccordionExampleNested = () => (
  <Accordion defaultActiveIndex={0} panels={AccordionPanels} />
);

const NewPanel = (props) => {
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

  if (props.loading) {
    return <ShimmerPanel title={props.data.title} />;
  }

  console.log(props);

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
        {props.data.title}
      </h2>

      <div className={styles.info}>
        <p className={styles.subheaderContainer}>
          <span className={styles.emoji}>ℹ️</span>
          <span className={styles.subheader}>Info</span>
        </p>
        <p className={styles.text}>{props.data.text}</p>
      </div>

      <div className={styles.info}>
        <p className={styles.subheaderContainer}>
          <span className={styles.emoji}>🎓</span>
          <span className={styles.subheader}>
            {props.data.title} prerequisites
            <AccordionExampleNested />
          </span>
        </p>
        {list_of_courses.map((c) => {
          return <div className={styles.course}>{c}</div>;
        })}
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
