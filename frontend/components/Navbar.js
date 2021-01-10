import { useState } from "react";
import styles from "../styles/Navbar.module.css";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import NextLink from "next/link";

export default function Navbar(props) {
  const path = ["Machine Learning", "Artificial Intelligence", "Python"];
  const [modal, setModal] = useState(false);

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.path}>
          <p style={{ marginRight: 8 }}>
            <span className={styles.pathName}>
              <NextLink href="/">~</NextLink>
            </span>{" "}
            /
          </p>
          {path.map((p) => {
            return (
              <p>
                <span className={styles.pathName}>
                  <NextLink href="/network/[query]" as={`/network/${p}`}>
                    {p}
                  </NextLink>
                </span>
                <span className={styles.slash}>/</span>
              </p>
            );
          })}
        </div>
        <span onClick={() => setModal(true)} className={styles.search}>
          <svg
            className={styles.icon}
            height="18"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Search
        </span>
      </nav>
      <PureModal
        className={styles.modal}
        isOpen={modal}
        replace
        onClose={() => {
          setModal(false);
          return true;
        }}
      >
        <svg
          className={styles.searchbarIcon}
          height="21"
          width="21"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="grey"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          className={styles.searchbar}
          type="text"
          placeholder="Search..."
        />
      </PureModal>
    </>
  );
}
