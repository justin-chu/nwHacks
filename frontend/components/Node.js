import { useRouter } from "next/router";
import styles from "../styles/Node.module.css";

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

  // const Title = (props) => {
  //   let copy = props.str;
  //   var result = [];
  //   while (copy.length > 0) {
  //     result.push(copy.substring(0, 20));
  //     console.log(result);
  //     copy = copy.substring(20);
  //   }
  //   return (
  //     <>
  //       <tspan x="50%" dy="-1em">
  //         {result[0]}
  //       </tspan>
  //       <tspan x="50%" dy="1.2em">
  //         {result[1] ? result[1] : ""}
  //       </tspan>
  //       <tspan x="50%" dy="1.2em">
  //         {result[2] ? result[2] : ""}
  //       </tspan>
  //       <tspan x="50%" dy="1.2em">
  //         {result[3] ? result[3] : ""}
  //       </tspan>
  //     </>
  //   );
  // };

  // console.log(node.imgurl);
  return (
    <svg
      onClick={() => router.push(`/search/${node.id}`)}
      className={styles.circle}
      height="300"
      width="300"
      viewBox="0 0 300 300"
      y="-150"
      x="-150"
    >
      <img src={node.imgurl} height="100" width="100" />
      <defs>
        <pattern
          id="attachedImage"
          height="100%"
          width="100%"
          patternContentUnits="objectBoundingBox"
          //viewBox="0 0 100% 100%"
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
        <circle cx="50%" cy="50%" r="35%" fill="url(#attachedImage)" />
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
