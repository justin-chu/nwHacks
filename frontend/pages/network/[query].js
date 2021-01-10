import Head from "next/head";
import styles from "../../styles/Network.module.css";
import Navbar from "../../components/Navbar";
import Graph from "../../components/Graph";
import Panel from "../../components/Panel";

const Network = () => {
  return (
    <div>
      <Head>
        <title>Project T: Artificial Intelligence</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className={styles.body}>
        <Graph />
        <Panel />
      </div>
    </div>
  );
};

export default Network;
