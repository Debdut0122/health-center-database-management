import Navbar from './components/Navbar';
import Create from './components/Create';
import Update from './components/Update';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Search from './components/Search';
function App() {
  return (
    <Router>
      <div className="App">

        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/search" element={<Search/>} />
            <Route path="/update/:id" element={<Update/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
