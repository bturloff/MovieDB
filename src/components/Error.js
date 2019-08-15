import React from "react";

const Error = ({ title, body }) => {
  return (
    <div className="error card">
      <div>
        <i className="material-icons small flow-text">error</i>
        <h3 className="flow-text">{title}</h3>
      </div>
      <p>{body}</p>
    </div>
  );
};

export default Error;
