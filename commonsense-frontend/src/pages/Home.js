import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import { getReports } from "../API/getReports";
import getUsernameFromSession from "../utils"; 
import Reports from "./Reports";
import AddReportButton from "../components/AddReportButton";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import Map from "../components/Map";

function Home() {
  const [reports, setReports] = useState([]);
  const [username, setUsername] = useState("");
  const {instance} = useMsal();
  const isAuthenticated = useIsAuthenticated();
  useEffect(() => {
    const fetchReports = async () => {
      const reports = await getReports();
      setReports(reports);
    };
    fetchReports();
  }, [instance]);

  useEffect(() => {
    setUsername(getUsernameFromSession());
  }, [isAuthenticated]);

  return (
    <div className="home" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>Hello, {username ?? "Guest"}</h1>
      <Reports reports={reports} />
      {isAuthenticated && <AddReportButton />} {/* Show button if user is logged in */}
    </div>
  )
}

export default Home;
