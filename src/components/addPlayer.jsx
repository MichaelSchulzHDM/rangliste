import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from "react";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function GameInput({ data, setData, loadData }) {
    useEffect(() => {
        console.log("data changed:", data);
    }, [data]);


    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");


    async function addPlayer() {

        const newPlayer = {
            id: Date.now(), // Simple ID generation - replace with a proper ID generator if needed
            name: name,
            lastName: lastName,
            points: 1000 // Default points, you can modify this as needed
        };

        //setData([...data, newPlayer]);

        // optional: Felder leeren
        setName("");
        setLastName("");
        setData(prevData => [...prevData, newPlayer]);

        await fetch("https://script.google.com/macros/s/AKfycbxVbo12TyZWwfVK3iJzqCD11XfciG6BSWAGpCCNmQ7rjuixPOsvHZdxg9Hh0mJVwGpb/exec", {
            method: "POST",
            body: JSON.stringify({
                action: "create",
                id: newPlayer.id,
                name: newPlayer.name,
                lastName: newPlayer.lastName,
                points: newPlayer.points
            })
        });

    }

    async function deletePlayer(playerId) {
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

    const [selectedUser1, setSelectedUser1] = useState("0");
    return (
        <div className="box">
            <div className="box">
                <h2>Spieler anlegen</h2>
                <TextField
                    label="Vorname"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <TextField
                    label="Nachname"
                    variant="outlined"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />

                <Button variant="outlined" onClick={addPlayer}>
                    Spieler hinzufügen
                </Button>
            </div>

            <div className="box">
                <h2>Spieler löschen</h2>

                <FormControl sx={{
                    m: 0, minWidth: 225

                }}>
                    <InputLabel id="demo-simple-select-label">Spieler</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={data.name}
                        label="player_1"
                        onChange={(e) => setSelectedUser1(e.target.value)}
                        defaultValue={""}
                    >
                        {data.map((person) => (
                            <MenuItem key={person.id} value={person.id}>
                                {person.name} {person.lastName}
                            </MenuItem>
                        ))}
                    </Select>

                </FormControl>
                <Button variant="outlined" onClick={() => deletePlayer(selectedUser1)}>
                    Spieler löschen
                </Button>
            </div>
        </div>

    );
}

export default GameInput;