import * as React from "react";

function SvgBoxThin(props) {
  return (
    <svg
      width={24}
      height={24}
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      {...props}
    >
      <path d="M24 7h-1v16H1V7H0V1h24v6zm-2 0H2v15h20V7zm-6 8H8v-4h8v4zm-1-3H9v2h6v-2zm8-10H1v4h22V2z" />
    </svg>
  );
}

export default SvgBoxThin;
