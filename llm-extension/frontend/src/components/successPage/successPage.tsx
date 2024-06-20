import React from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_PROJECT_URL as string,
  import.meta.env.VITE_SUPABASE_API_KEY as string
);

export default function SuccessPage() {
  const navigate = useNavigate();

  const onSignOut = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Error signing up:", error.message);
      } else {
        console.log("User signed out:");
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div>Success</div>
      <div>
        <button onClick={onSignOut}>sign out here</button>
      </div>
    </div>
  );
}
