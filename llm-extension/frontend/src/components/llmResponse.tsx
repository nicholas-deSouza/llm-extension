import React from "react";

// defines the types of props being passed down to this component
interface LlmResponseProps {
  apiResponse: string;
}

// Memoizing the component makes it so that it only re-renders when the prop changes
const LlmResponse: React.FC<LlmResponseProps> = React.memo(({ apiResponse }) => {
  console.log("this is the response in the LlmResponse", apiResponse);
  return <div>hi</div>;
});

export default LlmResponse;
