import './App.css';
import Navbar from '../src/components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { loginRequest } from "./API/authConfig";

function App() {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const signIn = async () => {
    try {
      const loginResponse = await instance.loginPopup(loginRequest);
      sessionStorage.setItem("user", JSON.stringify(loginResponse.account));
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  return (
    <div className="App">
      <Router>
        <Navbar signIn={signIn} />
        <Routes>
          <Route
            exact
            path="/"
            element={<Home isAuthenticated={isAuthenticated} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
