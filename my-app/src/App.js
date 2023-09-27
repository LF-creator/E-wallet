import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Ewallet from "./components/pages/Ewallet";
import AddCard from "./components/pages/AddCard";
import { fetchRandomUser } from "./redux/cardSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./style/styles.css"

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRandomUser());
  }, [dispatch]);

  return (
    <Router>
      <div className="App" id="this">
        <h1 id="fh1"> E-WALLET </h1>

        <Link to="/ewallet" id="nolinks">
          <button id="button1"> E-wallet </button>
        </Link>
        

        <Routes>
          <Route path="/ewallet" element={<Ewallet />} />
          <Route path="/addcard" element={<AddCard />} />
        </Routes>

        <Link to="/addcard" id="nolinks2">
          <button id="button2"> AddCard</button>
        </Link>
      </div>
    </Router>
  );
}
