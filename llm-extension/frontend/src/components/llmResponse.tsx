import React from "react";

// defines the types of props being passed down to this component
interface LlmResponseProps {
  apiResponse: ApiResponse | null;
}
// specifies that apiResponse is an object with a response property, which itself is an object containing a content string.
interface ApiResponse {
  response: {
    content: string;
  };
}

// Memoizing the component makes it so that it only re-renders when the prop changes
const LlmResponse: React.FC<LlmResponseProps> = React.memo(({ apiResponse }) => {
  if (!apiResponse) return null;

  console.log("this is the response in the LlmResponse", apiResponse.response.content);
  return <div>{apiResponse.response.content}</div>;
});

export default LlmResponse;
