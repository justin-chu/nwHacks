import { useRouter } from "next/router";
import styles from "../styles/Node.module.css";
import cookie from "react-cookies";

const Node = ({ node }) => {
  const router = useRouter();

  const wrap = (s) => s.replace(/(?![^\n]{1,20}$)([^\n]{1,20})\s/g, "$1<?>");

  const Title = (props) => {
    let str = wrap(props.str);
    let result = str.split("<?>");

    return (
      <>
        <tspan x="50%" dy="-1em">
          {result[0]}
        </tspan>
        <tspan x="50%" dy="1.2em">
          {result[1] ? result[1] : ""}
        </tspan>
        <tspan x="50%" dy="1.2em">
          {result[2] ? result[2] : ""}
        </tspan>
        <tspan x="50%" dy="1.2em">
          {result[3] && "..."}
        </tspan>
      </>
    );
  };

  const url = node.key;

  return (
    <svg
      onClick={() => {
        let currPath = cookie.load("path");
        if (currPath) {
          currPath.push(router.query.query);
          cookie.save("path", currPath);
        } else {
          cookie.save("path", [router.query.query]);
        }
        router.push({
          pathname: `/search/${node.id}`,
          query: { query: node.id },
        });
      }}
      className={styles.circle}
      height="300"
      width="300"
      viewBox="0 0 300 300"
      y="-150"
      x="-150"
    >
      {console.log("this:", node.imgurl)}
      <defs>
        <pattern
          id={`attachedImage-${node.key}`}
          height="100%"
          width="100%"
          patternContentUnits="objectBoundingBox"
          viewBox="0 0 100% 100%"
        >
          <image
            xlinkHref={node.imgurl}
            preserveAspectRatio="none"
            width="1"
            height="1"
          />
        </pattern>
      </defs>
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <circle
          cx="50%"
          cy="50%"
          r="35%"
          fill={`url(#attachedImage-${node.key})`}
        />
        <circle cx="50%" cy="50%" r="35%" fill="rgba(0,0,0,0.6)" />
        <text
          x="50%"
          y="50%"
          fill="white"
          stroke="white"
          strokeWidth="1"
          fontSize="20px"
          textAnchor="middle"
          dy=".3em"
        >
          <Title str={node.id} />
          {/* {name} */}
        </text>
      </g>
    </svg>
  );
};

export default Node;
