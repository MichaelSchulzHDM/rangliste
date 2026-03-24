import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from "react";

function GameInput({ data, setData, loadData }) {
    useEffect(() => {
        console.log("data changed:", data);
    }, [data]);


    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");


    async function addPlayer() {
        if (!name || !lastName) {
            alert("Bitte geben Sie sowohl den Vor- als auch den Nachnamen ein.");
            return;
        }

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


    return (
        <div className="box">
            <div className="box">
                <h2>Spieler anlegen</h2>
                <TextField
                    sx={{
                        m: 1, minWidth: 225

                    }}
                    label="Vorname"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <TextField
                    sx={{
                        m: 1, minWidth: 225

                    }}
                    label="Nachname"
                    variant="outlined"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />

                <Button variant="contained" onClick={addPlayer} sx={{
                    m: 1, minWidth: 225

                }}>
                    Spieler hinzufügen
                </Button>
            </div>

            
        </div>

    );
}

export default GameInput;