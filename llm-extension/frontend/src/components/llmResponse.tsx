import React from "react";

const LlmResponse = ({ apiResponse }) => {
  console.log("this is the response in the LlmResponse", apiResponse);
  return <div>hi</div>;
};

// const LlmResponse = React.memo(({ apiResponse }) => {
//   return (
//     <div>
//       <p>{apiResponse}</p>
//     </div>
//   );
// });

export default LlmResponse;
