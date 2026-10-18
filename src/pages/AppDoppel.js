import Table from '../components/table.jsx'
import Player from '../components/addPlayerDouble.jsx'
import ResultInput from '../components/resultInputDoppel.jsx'
import Historie from '../components/historieDouble.jsx'
import { useEffect, useState } from "react";
import { doppelTabelleUrl, doppelHistorieUrl } from '../components/config';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function AppDoppel() {

  const [data, setData] = useState([]);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [tableError, setTableError] = useState("");
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const [historyError, setHistoryError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setIsTableLoading(true);
    setTableError("");
    try {
      const res = await fetch(doppelTabelleUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error("Fehler beim Laden der Doppelrangliste:", error);
      setTableError("Die Rangliste konnte nicht geladen werden.");
    } finally {
      setIsTableLoading(false);
    }
  }

  const [historieData, setHistorieData] = useState([]);

  useEffect(() => {
    loadHistorieData();
  }, []);

  async function loadHistorieData() {
    setIsHistoryLoading(true);
    setHistoryError("");
    try {
      const res = await fetch(doppelHistorieUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const result = await res.json();
      setHistorieData(result);
    } catch (error) {
      console.error("Fehler beim Laden der Doppel-Historie:", error);
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


export default AppDoppel;
