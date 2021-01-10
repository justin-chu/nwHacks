import React from "react";
import styles from "../styles/Nodes.module.css";
import Graph from "react-graph-network";
import Node from "./Node";

const Nodes = (props) => {
  const info = { nodes: [], links: [] };
  props.data.related.slice(0, 12).map((n) => {
    info.nodes.push({ id: n.title, imgurl: n.imgurl });
  });

  return (
    <div className={styles.graph}>
      <Graph
        nodeDistance={150}
        pullIn={true}
        data={info}
        zoomDepth={3}
        enableDrag={true}
        id="graph"
        NodeComponent={Node}
        // NodeComponent={info.nodes.map((node) => {
        //   <Node node={node} onClick={() => props.onClick()} />;
        // })}
      />
    </div>
  );
};

export default Nodes;
