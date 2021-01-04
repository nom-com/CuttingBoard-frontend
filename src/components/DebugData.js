import React from "react";

const DebugData = (values, errors) => {
  return (
    <React.Fragment>
      <pre style={{ textAlign: "left" }}>
        <strong>Data</strong>
        <br />
        {JSON.stringify(values, null, 2)}
      </pre>
      <pre style={{ textAlign: "left" }}>
        <strong>Errors</strong>
        <br />
        {JSON.stringify(errors, null, 2)}
      </pre>
    </React.Fragment>
  );
};

export default DebugData;
