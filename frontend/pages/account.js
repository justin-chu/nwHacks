import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

export default function Home() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      router.push(`/search/${search}`);
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
          Get started by searching whatever you feel like lol
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
        Developed by Justin Chu, Mark Chen, Sam Prokopchuk, Connor Ibbotson
      </footer>
    </div>
  );
}
