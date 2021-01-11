import Head from "next/head";
import styles from "../../styles/Search.module.css";
import Navbar from "../../components/Navbar";
import Nodes from "../../components/Nodes";
import NewPanel from "../../components/NewPanel";
import { useState, useEffect } from "react";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { useRouter } from "next/router";
import NextLink from "next/link";
import axios from "axios";
import { search_backend } from "../../api/api.js";
import useQuery from "../../utils/useQuery";
import ShimmerPanel from "../../components/ShimmerPanel";

const Search = (props) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(0);
  const [path, setPath] = useState([]);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState(null);

  const query = useQuery();

  useEffect(async () => {
    if (!query) {
      return;
    }
    const query_backend = async () => {
      setPercent(30);
      const serverData = await search_backend(query.query);
      setData(serverData);
      setPercent(60);
      setLoading(false);
    };
    setLoading(true);
    setPercent(0);
    query_backend();
    // setPercent(100);
  }, [query]);

  const handleChange = (p) => {
    path.push(p);
  };

  return (
    <div>
      <Head>
        <title>Pathfinder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar path={path} />
      <div className={styles.body}>
        <Nodes
          onChange={handleChange}
          loading={loading}
          percent={percent}
          data={data}
        />
        {data ? (
          <NewPanel loading={loading} data={data} />
        ) : (
          <ShimmerPanel title={query ? query.query : ""} />
        )}
      </div>
      <PureModal
        className={styles.modal}
        isOpen={modal}
        replace
        onClose={() => {
          modal && router.push("/");
          setModal(false);
          return true;
        }}
      >
        <>
          <div className={styles.error}>
            <h1 className={styles.header}>
              Sorry, we couldn't find anything for {router.query.query}
            </h1>
            <p style={{ width: 500 }}>
              Try entering similar search queries or making your search query
              more specific.
            </p>
            <NextLink href="/">
              <div className={styles.button}>Search Again</div>
            </NextLink>
          </div>
        </>
      </PureModal>
    </div>
  );
};

export default Search;
