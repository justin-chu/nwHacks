import React from "react";
import styles from "../styles/Nodes.module.css";
import Graph from "react-graph-network";
import Node from "./Node";
import ProgressBar from "@ramonak/react-progress-bar";

const Nodes = (props) => {
  if (props.loading) {
    return (
      <div className={styles.graph}>
        <div style={{ margin: "auto", width: "50%" }}>
          <ProgressBar
            bgcolor="#0076ffe6"
            baseBgColor="darkgrey"
            labelSize="12px"
            completed={props.percent}
          />
        </div>
      </div>
    );
  }

  const info = { nodes: [], links: [] };

  props.data?.related.slice(0, 12).map((n, index) => {
    info.nodes.push({ id: n.title, key: index, imgurl: n.imgurl });
  });

  return (
    <div className={styles.graph}>
      {props.loading ? (
        <div style={{ margin: "auto", width: "50%" }}>
          <ProgressBar
            bgcolor="#0076ffe6"
            baseBgColor="darkgrey"
            labelSize="12px"
            completed={props.percent}
          />
        </div>
      ) : (
        <Graph
          nodeDistance={150}
          pullIn={true}
          data={info}
          zoomDepth={3}
          enableDrag={true}
          id="graph"
          NodeComponent={Node}
        />
      )}
    </div>
  );
};

export default Nodes;
