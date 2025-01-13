import './App.css';
import Navbar from '../src/components/Navbar';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { loginRequest } from "./API/authConfig";
import AddReport from './pages/AddReport';
import ReportDetail from './pages/ReportDetail';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import { postProfileSetup } from './API/postProfileSetup';
import getUsernameFromSession from './utils';

function App() {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const signIn = async () => {
    try {
      const loginResponse = await instance.loginPopup(loginRequest);
      sessionStorage.setItem("user", JSON.stringify(loginResponse.account));
      const user = {
        name: getUsernameFromSession(),
        email: getUsernameFromSession(),
        role: null,
        profilePicture: null
      }
      postProfileSetup(instance, user);
      // Redirect to home after successful login
      navigate("/");
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };
  const signOut = () => {
    instance.logoutPopup();
    sessionStorage.removeItem("user");
    navigate("/home");
  }

  return (
    <div className="App">
        <Navbar signIn={signIn} signOut={signOut} isAuthenticated={isAuthenticated} />
        <Routes>
          <Route
            path="/*"
            element={<Home isAuthenticated={isAuthenticated} />}
          />
          <Route path="/add-report" element={<AddReport />} />
          <Route path="/report/:id" element={<ReportDetail />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
    </div>
  );
}
export default App;