import Button from '@mui/material/Button';
import { useState, useEffect } from "react";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../App.css';


function Admin() {

  const [data, setData] = useState([]);

  useEffect(() => {
    loadData(); 
  }, []);

  async function loadData() {

    const res = await fetch("https://script.google.com/macros/s/AKfycbxVbo12TyZWwfVK3iJzqCD11XfciG6BSWAGpCCNmQ7rjuixPOsvHZdxg9Hh0mJVwGpb/exec");
    const result = await res.json();

    setData(result);
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