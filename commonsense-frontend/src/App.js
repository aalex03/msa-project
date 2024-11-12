
import './App.css';
import Navbar from '../src/components/Navbar';
import {BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom'
import Home from './pages/Home';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
          <Routes>
          <Route exact path='/' element={<Home />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
