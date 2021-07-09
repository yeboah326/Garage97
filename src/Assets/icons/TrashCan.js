import * as React from "react";

function SvgTrashCan(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
      <path stroke='current' fill='current' d="M9 19a1 1 0 01-2 0V9a1 1 0 012 0v10zm4 0a1 1 0 01-2 0V9a1 1 0 012 0v10zm4 0a1 1 0 01-2 0V9a1 1 0 012 0v10zm5-17v2H2V2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2H22zm-3 4v16H5V6H3v18h18V6h-2z" />
    </svg>
  );
}

export default SvgTrashCan;
