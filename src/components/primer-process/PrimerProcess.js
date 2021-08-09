import React from "react";

const PrimerProcess = (data, id) => {
  return (
    <div key={id}>
      <h2>{data.title}</h2>
    </div>
  );
};

export default PrimerProcess;
