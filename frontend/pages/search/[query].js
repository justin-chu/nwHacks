import Head from "next/head";
import styles from "../../styles/Search.module.css";
import Navbar from "../../components/Navbar";
import Nodes from "../../components/Nodes";
// import Panel from "../../components/Panel";
import NewPanel from "../../components/NewPanel";
import { useState } from "react";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";

const Search = () => {
  const sample = {
    books: [
      {
        authors: ["Ian Goodfellow", "Yoshua Bengio", "Aaron Courville"],
        thumbnail_uri:
          "http://books.google.com/books/content?id=omivDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        title: "Deep Learning",
      },
      {
        authors: ["Andriy Burkov"],
        thumbnail_uri:
          "http://books.google.com/books/content?id=0jbxwQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
        title: "The Hundred-page Machine Learning Book",
      },
      {
        authors: [
          "Ryszard S. Michalski",
          "Jaime G. Carbonell",
          "Tom M. Mitchell",
        ],
        thumbnail_uri:
          "http://books.google.com/books/content?id=Aw2jBQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        title: "Machine Learning",
      },
      {
        authors: ["Christoph Molnar"],
        thumbnail_uri:
          "http://books.google.com/books/content?id=jBm3DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        title: "Interpretable Machine Learning",
      },
      {
        authors: ["Mehryar Mohri", "Afshin Rostamizadeh", "Ameet Talwalkar"],
        thumbnail_uri:
          "http://books.google.com/books/content?id=-ijiAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        title: "Foundations of Machine Learning",
      },
      {
        authors: ["Stephen Marsland"],
        thumbnail_uri:
          "http://books.google.com/books/content?id=n66O8a4SWGEC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        title: "Machine Learning",
      },
      {
        authors: ["Ethem Alpaydin"],
        thumbnail_uri:
          "http://books.google.com/books/content?id=1k0_-WroiqEC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        title: "Introduction to Machine Learning",
      },
      {
        authors: ["Tony Jebara"],
        thumbnail_uri:
          "http://books.google.com/books/content?id=JnArkd6PSO0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        title: "Machine Learning",
      },
      {
        authors: [
          "Ryszard S. Michalski",
          "Jaime G. Carbonell",
          "Tom M. Mitchell",
        ],
        thumbnail_uri:
          "http://books.google.com/books/content?id=Aw2jBQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        title: "Machine Learning",
      },
      {
        authors: [
          "Christine Preisach",
          "Hans Burkhardt",
          "Lars Schmidt-Thieme",
          "Reinhold Decker",
        ],
        thumbnail_uri:
          "http://books.google.com/books/content?id=QEmMvrOkQ-YC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        title: "Data Analysis, Machine Learning and Applications",
      },
    ],
    imgurl:
      "https://media.geeksforgeeks.org/wp-content/cdn-uploads/machineLearning3.png",
    link: "https://en.wikipedia.org/wiki/Machine_learning",
    related: [
      {
        imgurl:
          "https://www.socap.org/images/default-source/default-album/glossary-of-ai-terms.png?sfvrsn=0",
        title: "Glossary of artificial intelligence",
      },
      {
        imgurl:
          "https://www.kdnuggets.com/images/reinforcement-learning-fig1-700.jpg",
        title: "Reinforcement learning",
      },
      {
        imgurl: "https://miro.medium.com/max/2500/1*ZB6H4HuF58VcMOWbdpcRxQ.png",
        title: "Artificial neural network",
      },
      {
        imgurl:
          "https://developer.mindsphere.io/apis/analytics-anomalydetection/images/DBSCAN.png",
        title: "Anomaly detection",
      },
      {
        imgurl: "https://jyhjinghwang.github.io/projects/asm/arch.png",
        title: "Structured prediction",
      },
      {
        imgurl:
          "https://media.geeksforgeeks.org/wp-content/uploads/Dimensionality_Reduction_1.jpg",
        title: "Dimensionality reduction",
      },
      {
        imgurl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Cluster-2.svg/1200px-Cluster-2.svg.png",
        title: "Clustering",
      },
      {
        imgurl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Linear_regression.svg/1200px-Linear_regression.svg.png",
        title: "regression",
      },
      {
        imgurl:
          "https://cdn.britannica.com/78/103778-050-D797CF4F/Animals-groups-organisms-succession-general-particular.jpg",
        title: "classification",
      },
      {
        imgurl:
          "https://techvidvan.com/tutorials/wp-content/uploads/sites/2/2020/07/Supervised-Learning-in-ML-tv.jpg",
        title: "Supervised learning",
      },
      {
        imgurl:
          "https://i.pcmag.com/imagery/articles/061CyMCZV6G2sXUmreKHvXS-1.1581020108.fit_lim.fit_lim.size_956x.jpg",
        title: "computer vision",
      },
      {
        imgurl:
          "https://www.iozoom.com/wp-content/themes/iozoom/img/img-spam-filtering.png",
        title: "email filtering",
      },
      {
        imgurl:
          "https://dawn.cs.stanford.edu/assets/img/2018-06-21-debugging/train_error.png",
        title: "training data",
      },
      {
        imgurl:
          "https://www.channelfutures.com/files/2020/10/artificial-intelligence.jpg",
        title: "artificial intelligence",
      },
    ],
    steps: {
      "Introduction to Machine Learning and Data Mining": [
        {
          "Linear Algebra II": [
            {
              "Linear Algebra I": [],
            },
          ],
        },
        {
          "Techniques of the Calculus of Several Variables I": [
            {
              "Calculus II": [
                {
                  "Calculus I": [],
                },
              ],
            },
          ],
        },
        {
          "An Introduction to Probability": [
            {
              Calculus: [],
            },
          ],
        },
      ],
    },
    text:
      'Machine learning (ML) is the study of computer algorithms that improve automatically through experience.[1] It is seen as a subset of artificial intelligence. Machine learning algorithms build a model based on sample data, known as "training data", in order to make predictions or decisions without being explicitly programmed to do so.[2] Machine learning algorithms are used in a wide variety of applications, such as email filtering and computer vision, where it is difficult or unfeasible to develop conventional algorithms to perform the needed tasks.\n',
    title: "Machine learning",
    ytb_links: [
      "https://www.youtube.com/watch?v=ukzFI9rgwfU",
      "https://www.youtube.com/watch?v=7eh4d6sabA0",
      "https://www.youtube.com/watch?v=z-EtmaFJieY",
      "https://www.youtube.com/watch?v=VwVg9jCtqaU",
      "https://www.youtube.com/watch?v=GwIo3gDZCVQ",
    ],
  };

  const [loading, setLoading] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [path, setPath] = useState([]);
  const [modal, setModal] = useState(false);

  const handleChange = (p) => {
    path.push(p);
  };

  return (
    <div>
      <Head>
        <title>Project T</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar path={path} />
      <div className={styles.body}>
        <Nodes onChange={handleChange} loading={loading} data={sample} />
        {/* <Panel data={sample} /> */}
        <NewPanel loading={loading} data={sample} />
      </div>
      {/* <PureModal
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
      </PureModal> */}
    </div>
  );
};

export default Search;
