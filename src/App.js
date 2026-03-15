import './App.css';
import './index.css';
import Table from './components/table.jsx'
import Player from './components/addPlayer.jsx'
import ResultInput from './components/resultInput.jsx'

import { useEffect, useState } from "react";

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {

    const res = await fetch("https://script.google.com/macros/s/AKfycbxVbo12TyZWwfVK3iJzqCD11XfciG6BSWAGpCCNmQ7rjuixPOsvHZdxg9Hh0mJVwGpb/exec");
    const result = await res.json();

    setData(result);
  }





  return (

    <div className="app">

      <aside className="sidebar">
        <h2 className="logo">ScoreBoard</h2>

        <nav>
          <a href="#">Rangliste</a>
          <a href="#">Spieler anlegen</a>
          <a href="#">Historie</a>
          <a href="#">Einstellungen</a>
        </nav>
      </aside>

      <main className="main">

        <header className="header">
          <h2>SG Stern Einzelrangliste</h2>
        </header>

        <div className="content">
          <Table data={data} />
          <Player data={data} setData={setData} loadData={loadData} />
          <ResultInput data={data} setData={setData} />
        </div>

      </main>

    </div>
  );
}


export default App;
