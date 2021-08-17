import * as React from "react";

function SvgBack(props) {
  return (
    <svg
      width={24}
      height={24}
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      {...props}
    >
      <path d="M2.117 12l7.527 6.235L9 19l-9-7.521L9 4l.645.764L2.116 11H24v1H2.117z" />
    </svg>
  );
}

export default SvgBack;
