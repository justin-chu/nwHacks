import { useState, useLayoutEffect, useEffect } from "react";
import styles from "../styles/Navbar.module.css";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import NextLink from "next/link";
import { useRouter } from "next/router";
import cookie from "react-cookies";

export default function Navbar(props) {
  const path = ["Machine Learning", "Artificial Intelligence", "Python"];
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      console.log(search);
      setModal(false);
      router.push(`/search/${search}`);
    }
  };

  // var currPath;
  // useEffect(() => {
  //   currPath = cookie.load("path");
  //   console.log("path: ", currPath);
  //   if (currPath) {
  //     currPath.push(router.query.query);
  //     cookie.save("path", currPath);
  //   } else {
  //     cookie.save("path", [router.query.query]);
  //   }
  //   console.log("path: ", currPath);
  // });

  // useEffect(() => {
  //   const deleteCookie = () => cookie.remove("path");
  //   return () => deleteCookie();
  // }, []);

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.path}>
          <p style={{ marginRight: 8 }}>
            <span
              className={styles.pathName}
              style={{ color: "rgba(0, 118, 255, 0.9)", fontWeight: "bold" }}
            >
              <NextLink href="/">Pathfinder</NextLink>
            </span>{" "}
            /
          </p>
          {props.path.map((p) => {
            return (
              <p key={p}>
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
        <span className={styles.right}>
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
          <span
            onClick={() => router.push("/account")}
            className={styles.search}
          >
            <svg
              className={styles.icon}
              height="18"
              width="18"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            Account
          </span>
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
          onChange={(e) => setSearch(e.target.value)}
          onKeyUp={handleKeyUp}
          className={styles.searchbar}
          type="text"
          placeholder="Search..."
        />
      </PureModal>
    </>
  );
}
