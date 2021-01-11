import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import TextLoop from "react-text-loop";

export default function Home() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      router.push({ pathname: `/search/${search}`, query: { query: search } });
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Pathfinder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span className={styles.proj_t}>Pathfinder</span>.
        </h1>

        <p className={styles.description}>
          Pathfinder is an educational visualization tool. Try it out by
          searching{" "}
          <TextLoop>
            <span>machine learning</span>
            <span>linear algebra</span>
            <span>hackathons</span>
            <span>statistics</span>
            <span>mechanics</span>
          </TextLoop>
          !
        </p>

        <div className={styles.search_box}>
          <input
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={handleKeyUp}
            className={styles.search_bar}
            type="text"
            placeholder="Search..."
          />
        </div>
      </main>

      <footer className={styles.footer}>
        Developed by Sam Prokopchuk, Justin Chu, Mark Chen, Connor Ibbotson
      </footer>
    </div>
  );
}
