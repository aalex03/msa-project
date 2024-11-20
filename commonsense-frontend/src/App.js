
import './App.css';
import Navbar from '../src/components/Navbar';
import {BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom'
import Home from './pages/Home';
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { loginRequest } from "./API/authConfig";
import { PublicClientApplication } from '@azure/msal-browser';

function App() {

  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const signIn = async () => {
    try {
      // Login logic using MSAL
      const loginResponse = await instance.loginPopup(loginRequest);
      sessionStorage.setItem(
        "user",
        JSON.stringify(loginResponse.account)
      );
    } catch (error) {
      console.error("Login failed: ", error);
    }
  }; 

  return (
    <div className="App">
      <Router>
        <Navbar signIn={signIn}/>
          <Routes>
          <Route exact path='/' element={<Home />} />
          </Routes>
      </Router>
    </div>
  );
}



export default App;
