import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import AddEntry from "./components/AddEntry";
import BirdList from "./components/BirdList";
import EntryList from "./components/EntryList";

function App() {
  const [birds, setBirds] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/birds")
      .then((response) => response.json())
      .then((json) => {
        setBirds(json);
      });
  }, []);

  const [entries, setEntries] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/entries")
      .then((response) => response.json())
      .then((json) => {
        setEntries(json);
      });
  }, []);
  return (
    <div className="grid grid-cols-4">
      <div className="col-span-1">
        <BirdList birds={birds} />
      </div>
      <div className="col-span-3">
        <AddEntry birds={birds} />
        <EntryList entries={entries} />
      </div>
    </div>
  );
}

export default App;
