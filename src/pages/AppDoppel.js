import '../App.js';
import '../index.css';
import Table from '../components/table.jsx'
import Player from '../components/addPlayerDouble.jsx'
import ResultInput from '../components/resultInputDoppel.jsx'
import Historie from '../components/historieDouble.jsx'
import { useEffect, useState } from "react";
import { doppelTabelleUrl, doppelHistorieUrl } from '../components/config';

function AppDoppel() {

  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {

    const res = await fetch(doppelTabelleUrl);
    const result = await res.json();

    setData(result);
  }

  const [historieData, setHistorieData] = useState([]);

  useEffect(() => {
    loadHistorieData();
  }, []);

  async function loadHistorieData() {

    const res = await fetch(doppelHistorieUrl);
    const result = await res.json();

    setHistorieData(result);
  }

  console.log("data", data);
  console.log("historieData", historieData);

  return (

    <div className="app">

      <main className="main">

        <header className="header">
          <h2>SG Stern Doppelrangliste</h2>
        </header>

        <div className="content">
          <Table data={data} />
          <ResultInput data={data} setData={setData} historieData={historieData} setHistorieData={setHistorieData} />
          <Player data={data} setData={setData} loadData={loadData} />
          <Historie data={historieData} />
        </div>

      </main>


    </div>
  );
}


export default AppDoppel;
