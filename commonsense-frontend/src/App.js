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
import { getProfile } from './API/getProfile';
import MapEvents from './pages/MapEvents';

function App() {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const signIn = async () => {
    try {
      const loginResponse = await instance.loginPopup(loginRequest);
      sessionStorage.setItem("user", JSON.stringify(loginResponse.account));
      const user = {
        Name: loginResponse.account.name,
        Email: loginResponse.account.username,
      }
      console.log(user);
      await postProfileSetup(instance, user);
      const profileInfo = await getProfile(instance);
      sessionStorage.setItem("profileInfo", JSON.stringify(profileInfo));
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
          <Route path="/events" element={<MapEvents />} />
        </Routes>
    </div>
  );
}
export default App;