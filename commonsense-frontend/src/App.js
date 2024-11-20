import './App.css';
import Navbar from '../src/components/Navbar';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { loginRequest } from "./API/authConfig";

function App() {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const signIn = async () => {
    try {
      const loginResponse = await instance.loginPopup(loginRequest);
      sessionStorage.setItem("user", JSON.stringify(loginResponse.account));

      // Redirect to home after successful login
      navigate("/");
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  return (
    <div className="App">
        <Navbar signIn={signIn} />
        <Routes>
          <Route
            exact
            path="/"
            element={<Home isAuthenticated={isAuthenticated} />}
          />
        </Routes>
    </div>
  );
}

export default App;
