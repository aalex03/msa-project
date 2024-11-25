import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import { getReports } from "../API/getReports";
import { getUsernameFromSession } from "../utils";
import Reports from "./Reports";

function Home() {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const posts = getReports();
    setPosts(posts);
  }, []);

  useEffect(() => {
    const username = getUsernameFromSession();
    setUsername(username);
  }, []);

  return (
    <div className="home">
      <h1>Hello, {username ?? "Guest"}</h1>
      <Reports reports={posts} />
    </div>
  )
}

export default Home;
