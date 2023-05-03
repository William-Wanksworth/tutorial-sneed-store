import React from "react";
const Error = ({ redirect }) => {
  return (
    <div className="section section-center text-center">
      <h2>an error has occured</h2>
      {redirect && <h4>you will be redirected soon</h4>}
    </div>
  );
};

export default Error;
