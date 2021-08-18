import * as React from "react";

function SvgClose(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props} id={props.id} onClick={props.onClick}>
      <path id={props.id} d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm0-2C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5 15.538l-3.592-3.548 3.546-3.587L15.538 7l-3.545 3.589-3.588-3.543L7 8.451l3.593 3.552-3.547 3.592L8.451 17l3.555-3.596 3.591 3.55L17 15.538z" />
    </svg>
  );
}

export default SvgClose;
