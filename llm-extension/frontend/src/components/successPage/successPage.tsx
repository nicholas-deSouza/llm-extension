import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { supabase } from "../../utils/supabaseClient";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://jeckvlbwlnlmybhqejed.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplY2t2bGJ3bG5sbXliaHFlamVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg4MjY3MDIsImV4cCI6MjAzNDQwMjcwMn0.9c5pbhrdYm1vckAJhDl6CajtiA35FiNxdfh5qwmTdcM"
);

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
