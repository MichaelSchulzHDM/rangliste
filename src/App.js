import './App.css';
import './index.css';
import Table from './components/table.jsx'
import Player from './components/addPlayer.jsx'
import ResultInput from './components/resultInput.jsx'
import Historie from './components/historie.jsx'

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

    const [historieData, setHistorieData] = useState([]);

  useEffect(() => {
    loadHistorieData();
  }, []);

  async function loadHistorieData() {

    const res = await fetch("https://script.google.com/macros/s/AKfycbw4AnfJJVDLX82Ip63nAfaFQuz6QyIvMHzAP5-04T7TyCawS6Q2NH94bCAZohUVTpocKA/exec");
    const result = await res.json();

    setHistorieData(result);
  }

  console.log("data", data);
  console.log("historieData", historieData);

  return (

    <div className="app">

      <main className="main">

        <header className="header">
          <h2>SG Stern Einzelrangliste</h2>
        </header>

        <div className="content">
          <Table data={data} />          
          <ResultInput data={data} setData={setData} historieData={historieData} setHistorieData={setHistorieData}/>
          <Player data={data} setData={setData} loadData={loadData}  />
          <Historie data = {historieData}/>
        </div>

      </main>
      

    </div>
  );
}


export default App;
