import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";

export default function SuccessPage() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          setUser(value.data.user);
        }
      });
    }

    getUserData();
  }, []);

  useEffect(() => {
    console.log("user data:", user);
  }, []);

  const onSignOut = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Error signing up:", error.message);
      } else {
        console.log("User signed out:");
        navigate("/login");
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
