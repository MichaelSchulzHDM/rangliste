import Button from '@mui/material/Button';
import { useState, useEffect } from "react";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../App.css';


function Admin() {

  const [data, setData] = useState([]);
  const [dataDouble, setDataDouble] = useState([]);
  const [selectDisziplin, setSelectDisziplin] = useState("");
  const disziplinOptionen = [
    { id: 1, name: 'Einzel' },
    { id: 2, name: 'Doppel' },
    { id: 3, name: 'Other' },
  ];


  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {

    const res = await fetch("https://script.google.com/macros/s/AKfycbxVbo12TyZWwfVK3iJzqCD11XfciG6BSWAGpCCNmQ7rjuixPOsvHZdxg9Hh0mJVwGpb/exec");
    const result = await res.json();

    setData(result);
  }

  useEffect(() => {
    loadDataDouble();
  }, []);

  async function loadDataDouble() {

    const res = await fetch("https://script.google.com/macros/s/AKfycbx6erV3nGKDbO13Eyp2SllHgeIB7yNV7V0b_6fBgr44_XKzHd6eFQriCw1vMlz-_rF_/exec");
    const result = await res.json();

    setDataDouble(result);
  }

  const [selectedUser1, setSelectedUser1] = useState("");

  useEffect(() => {
    console.log("dadadata", data);
  }, [data]);


  async function deletePlayer(playerId) {

    if (!playerId) {
      alert("Bitte wählen Sie einen Spieler zum Löschen aus.");
      return;
    }

    setData(prevData => prevData.filter(player => player.id !== playerId));

    await fetch("https://script.google.com/macros/s/AKfycbxVbo12TyZWwfVK3iJzqCD11XfciG6BSWAGpCCNmQ7rjuixPOsvHZdxg9Hh0mJVwGpb/exec", {
      method: "POST",
      body: JSON.stringify({
        action: "delete",
        id: playerId
      })
    });
    await loadData();
  }

  async function deletePlayerDouble(playerId) {

    if (!playerId) {
      alert("Bitte wählen Sie einen Spieler zum Löschen aus.");
      return;
    }

    setDataDouble(prevData => prevData.filter(player => player.id !== playerId));

    await fetch("https://script.google.com/macros/s/AKfycbxqxoWa2hieS-vlioArGUUkDi4_59JlAe2tCQ3aC44iZ9BNmQ1pgg9nx6oVfFuY-2g/exec", {
      method: "POST",
      body: JSON.stringify({
        action: "delete",
        id: playerId
      })
    });
    await loadDataDouble();
  }



  return (
    <div className="app">
      <main className="main">
        <header className="header">
          <h2>Admin Seite</h2>
        </header>
        <div className="box">
          <div className="box">

            <h2>Spieler löschen</h2>
            <FormControl sx={{
              m: 1, minWidth: 225

            }}>
              <InputLabel id="selectDisziplin">Disziplin</InputLabel>
              <Select
                labelId="selectDisziplin"
                id="selectDisziplin"
                value={disziplinOptionen.find(option => option.name === selectDisziplin)?.id || ""}
                label="Disziplin"
                onChange={(e) => setSelectDisziplin(e.target.value)}
              >
              </Select>

            </FormControl>
            <FormControl sx={{
              m: 1, minWidth: 225

            }}>

              <InputLabel id="demo-simple-select-label">Spieler</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedUser1}
                label="player_1"
                onChange={(e) => setSelectedUser1(e.target.value)}

              >
                {(Array.isArray(data) ? data : []).map((person) => (
                  <MenuItem key={person.id} value={person.id}>
                    {person.name} {person.lastName}
                  </MenuItem>
                ))}
              </Select>

            </FormControl>
            <Button variant="contained" onClick={() => deletePlayer(selectedUser1)} sx={{
              m: 1, minWidth: 225

            }}>
              Spieler löschen
            </Button>
          </div>
        </div>
      </main>
    </div>

  )
}

export default Admin;