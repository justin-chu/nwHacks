import { useState, useLayoutEffect, useEffect, useCallback } from "react";
import styles from "../styles/Navbar.module.css";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import NextLink from "next/link";
import { useRouter } from "next/router";
import cookie from "react-cookies";

export default function Navbar() {
  const [modal, setModal] = useState(0);
  const [search, setSearch] = useState("");
  const [pathname, setPathname] = useState("");
  const [savedIndex, setSavedIndex] = useState(-1);
  const [temp, setTemp] = useState(0);

  const router = useRouter();

  const savePath = () => {
    const path = cookie.load("path");
    cookie.save("saved:" + pathname, path ? path : []);
    setModal(false);
  };

  const paths = cookie.loadAll();
  const savedPaths = [];
  for (let i = 0; i < Object.keys(paths).length; i++) {
    if (Object.keys(paths)[i].substr(0, 6) === "saved:") {
      savedPaths.push(Object.keys(paths)[i]);
    }
  }

  const loadSaved = () => {
    if (savedIndex !== -1) {
      cookie.save("path", paths[`${savedPaths[savedIndex]}`]);
    }
    setModal(false);
  };

  const deleteSaved = () => {
    if (savedIndex !== -1) {
      cookie.remove(savedPaths[savedIndex], { path: "/" });
    }
    setModal(false);
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      router.push({ pathname: `/search/${search}`, query: { query: search } });
      setModal(false);
    }
  };

  let currPath = cookie.load("path");
  if (!currPath) {
    currPath = [];
  }

  const history = (key) => {
    for (let i = 0; i < currPath.length; i++) {
      if (currPath[i] === key) {
        currPath = currPath.slice(0, i);
        cookie.save("path", currPath);
        return;
      }
    }
  };

  const [state, setState] = useState({ count: 0, count2: 100 });

  const setCount = useCallback(() => {
    setState(({ count }) => ({ count: count + 1 }));
    setState(({ count2 }) => ({ count2: count + 1 }));
    setState(({ count }) => ({ count2: count + 1 }));
  }, []);

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
          {currPath.map((p) => {
            return (
              <p key={p}>
                <span className={styles.pathName}>
                  <NextLink
                    onClick={() => setCount()}
                    href="/search/[query]"
                    as={`/search/${p}`}
                    onClick={() => history(p)}
                  >
                    {p}
                  </NextLink>
                </span>
                <span className={styles.slash}>/</span>
              </p>
            );
          })}
          {currPath.length !== 0 && (
            <p>
              <span className={styles.pathName}>
                <NextLink href="#">{router.query.query + " /"}</NextLink>
              </span>
            </p>
          )}
        </div>
        <span className={styles.right}>
          <span onClick={() => setModal(1)} className={styles.search}>
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
          <span onClick={() => setModal(2)} className={styles.search}>
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
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
              />
            </svg>
            Save
          </span>
          <span onClick={() => setModal(3)} className={styles.search}>
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
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              />
            </svg>
            Saved
          </span>
        </span>
      </nav>
      <PureModal
        isOpen={modal === 1 || modal === 2 || modal === 3}
        replace
        onClose={() => {
          setModal(0);
          setSavedIndex(-1);
          return true;
        }}
      >
        {modal === 1 && (
          <div className={styles.modal}>
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
          </div>
        )}
        {modal === 2 && (
          <div className={styles.modal2}>
            <h1 className={styles.header}>Save current path?</h1>
            <input
              onChange={(e) => setPathname(e.target.value)}
              className={styles.saveInput}
              type="text"
              placeholder="Give the path a name!"
            />
            <div onClick={() => savePath()} className={styles.button}>
              Save
            </div>
          </div>
        )}
        {modal === 3 && (
          <div className={styles.modal3}>
            <h1 className={styles.header}>Saved paths:</h1>
            <div className={styles.list}>
              {/* {savedPaths.map((p, index) => {
                console.log(p, index);
              })} */}
              {savedPaths.map((p, index) => {
                return (
                  <div
                    key={index}
                    className={styles.item}
                    style={
                      index === savedIndex
                        ? {
                            border: "1px solid rgba(0, 118, 255, 0.9)",
                            backgroundColor: "rgba(0, 118, 255, 0.9)",
                            color: "white",
                          }
                        : {}
                    }
                    onClick={() => {
                      setSavedIndex(index);
                    }}
                  >
                    {p.slice(6)}
                  </div>
                );
              })}
            </div>
            <div className={styles.buttons}>
              <div onClick={() => deleteSaved()} className={styles.remove}>
                Delete
              </div>
              <div onClick={() => loadSaved()} className={styles.button}>
                Open
              </div>
            </div>
          </div>
        )}
      </PureModal>
    </>
  );
}
