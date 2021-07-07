import * as React from "react";

function SvgHome(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
      <path stroke='current' fill='current' d="M21 13v10h-6v-6H9v6H3V13H0L12 1l12 12h-3zm-1-5.907V2h-3v2.093l3 3z" />
    </svg>
  );
}

export default SvgHome;
