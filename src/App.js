import './App.css';
import './index.css';
import AppDoppel from './pages/AppDoppel';
import Table from './components/table.jsx'
import Player from './components/addPlayer.jsx'
import ResultInput from './components/resultInput.jsx'
import Historie from './components/historie.jsx'
import { useEffect, useState } from "react";
import { einzelTabelleUrl, einzelHistorieUrl } from './components/config';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Switch from '@mui/material/Switch';

function EinzelRanking() {

  const [data, setData] = useState([]);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [tableError, setTableError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setIsTableLoading(true);
    setTableError("");
    try {
      const res = await fetch(einzelTabelleUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error("Fehler beim Laden der Einzelrangliste:", error);
      setTableError("Die Rangliste konnte nicht geladen werden.");
    } finally {
      setIsTableLoading(false);
    }
  }

  const [historieData, setHistorieData] = useState([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const [historyError, setHistoryError] = useState("");

  useEffect(() => {
    loadHistorieData();
  }, []);

  async function loadHistorieData() {
    setIsHistoryLoading(true);
    setHistoryError("");
    try {
      const res = await fetch(einzelHistorieUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const result = await res.json();
      setHistorieData(result);
    } catch (error) {
      console.error("Fehler beim Laden der Einzel-Historie:", error);
      setHistoryError("Die Historie konnte nicht geladen werden.");
    } finally {
      setIsHistoryLoading(false);
    }
  }

  return (
    <div className="content">
      {isTableLoading ? (
        <Box role="status" aria-label="Rangliste wird geladen" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 180 }}>
          <CircularProgress />
        </Box>
      ) : tableError ? (
        <Alert severity="error">{tableError}</Alert>
      ) : (
        <Table data={data} />
      )}
      <ResultInput data={data} setData={setData} historieData={historieData} setHistorieData={setHistorieData} />
      <Player data={data} setData={setData} loadData={loadData} />
      {isHistoryLoading ? (
        <Box role="status" aria-label="Historie wird geladen" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 180 }}>
          <CircularProgress />
        </Box>
      ) : historyError ? (
        <Alert severity="error">{historyError}</Alert>
      ) : (
        <Historie data={historieData} />
      )}
    </div>
  );
}

function App() {
  const [isDoppel, setIsDoppel] = useState(false);

  return (
    <div className="app">
      <main className="main">
        <header className="header">
          <h2>SG Stern {isDoppel ? 'Doppel' : 'Einzel'}rangliste</h2>
          <div className="mode-switch">
            <span>Einzel</span>
            <Switch
              checked={isDoppel}
              onChange={(event) => setIsDoppel(event.target.checked)}
              inputProps={{ 'aria-label': 'Ranglistenmodus wechseln' }}
              color= "default"
            />
            <span>Doppel</span>
          </div>
        </header>
        {isDoppel ? <AppDoppel /> : <EinzelRanking />}
      </main>
    </div>
  );
}

export default App;
