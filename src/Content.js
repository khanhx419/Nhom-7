import React from "react";

function Content({ onIncrease }) {
  console.log("Content re-rendered");

  return (
    <div>
      <h3>Content Component</h3>
      <button onClick={onIncrease}>Increase</button>
    </div>
  );
}

export default React.memo(Content);
