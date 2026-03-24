import Button from '@mui/material/Button';
import { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


function GameInput({ data, setData, historieData, setHistorieData }) {



    async function calculateElo() {
        if (!selectedUser1 || !selectedUser2 || !winner) {
            alert("Bitte wählen Sie beide Spieler und den Gewinner aus.");
            return;
        }
        let k = 32;
        let player1Rating = data.find(player => player.id === selectedUser1).points;
        let player2Rating = data.find(player => player.id === selectedUser2).points;


        const expected1 = 1 / (1 + Math.pow(10, (player2Rating - player1Rating) / 400));
        const expected2 = 1 / (1 + Math.pow(10, (player1Rating - player2Rating) / 400));

        let score1, score2;


        if (winner === "player1") {
            score1 = 1;
            score2 = 0;
        } else if (winner === "player2") {
            score1 = 0;
            score2 = 1;
        } else {
            score1 = 0.5;
            score2 = 0.5;
        }

        const newRating1 = Math.round(player1Rating + k * (score1 - expected1));
        const newRating2 = Math.round(player2Rating + k * (score2 - expected2));

        setData(prevData =>
            prevData.map(item =>
                item.id === selectedUser1 ? { ...item, points: newRating1 } : item
            )
        );

        setData(prevData =>
            prevData.map(item =>
                item.id === selectedUser2 ? { ...item, points: newRating2 } : item
            )
        );

        let player1data = data.find(player => player.id === selectedUser1);
        let player2data = data.find(player => player.id === selectedUser2);
        setSelectedUser1("");
        setSelectedUser2("");
        setWinner("");

        const newResult = {
            id: Date.now(),
            Spieler1: player1data.name + " " + player1data.lastName,
            Spieler2: player2data.name + " " + player2data.lastName,
            Gewinner: winner === "player1" ? player1data.name + " " + player1data.lastName : player2data.name + " " + player2data.lastName,
            Datum: new Date().toISOString().split('T')[0]    
        };


        setHistorieData(prevData => [...prevData, newResult]);

        await fetch("https://script.google.com/macros/s/AKfycbxVbo12TyZWwfVK3iJzqCD11XfciG6BSWAGpCCNmQ7rjuixPOsvHZdxg9Hh0mJVwGpb/exec", {
            method: "POST",
            body: JSON.stringify({
                action: "update",
                id: player1data.id,
                name: player1data.name,
                lastName: player1data.lastName,
                points: newRating1
            })
        }).catch(err => console.error("Fehler beim Update Spieler 1:", err));

        await fetch("https://script.google.com/macros/s/AKfycbxVbo12TyZWwfVK3iJzqCD11XfciG6BSWAGpCCNmQ7rjuixPOsvHZdxg9Hh0mJVwGpb/exec", {
            method: "POST",
            body: JSON.stringify({
                action: "update",
                id: player2data.id,
                name: player2data.name,
                lastName: player2data.lastName,
                points: newRating2
            })
        }).catch(err => console.error("Fehler beim Update Spieler 2:", err));
        console.log("Player 1 new rating:", newRating1);
        console.log("Player 2 new rating:", newRating2);

        console.log("Spieler 1:", player1data.name + " " + player1data.lastName);
        console.log("Spieler 2:", player2data.name + " " + player2data.lastName);
        console.log("Gewinner:", winner === "player1" ? player1data.name + " " + player1data.lastName : player2data.name + " " + player2data.lastName);
        console.log("Datum:", newResult.Datum);



        await fetch("https://script.google.com/macros/s/AKfycbw4AnfJJVDLX82Ip63nAfaFQuz6QyIvMHzAP5-04T7TyCawS6Q2NH94bCAZohUVTpocKA/exec", {
            method: "POST",
            body: JSON.stringify({
                action: "create",
                id: Date.now(),
                Spieler1: player1data.name + " " + player1data.lastName,
                Spieler2: player2data.name + " " + player2data.lastName,
                Gewinner: winner === "player1" ? player1data.name + " " + player1data.lastName : player2data.name + " " + player2data.lastName,
                Datum: new Date().toLocaleDateString()
            })
        });
    }



    const [selectedUser1, setSelectedUser1] = useState("");
    const [selectedUser2, setSelectedUser2] = useState("");
    const [winner, setWinner] = useState("");


    const handleChangeWinner = (event) => {
        setWinner(event.target.value);
    };


    const filteredPlayersForPlayer1 = data.filter(
        (person) => person.id !== selectedUser2
    );

    const filteredPlayersForPlayer2 = data.filter(
        (person) => person.id !== selectedUser1
    );




    return (
        <div className="box">
            <div className="box">
                <h2>Ergebnis eintragen</h2>


                <FormControl sx={{
                    m: 1, minWidth: 225

                }}>
                    <InputLabel id="player1-label">Spieler 1</InputLabel>
                    <Select
                        labelId="player1-label"
                        id="player1-select"
                        value={selectedUser1}
                        label="player_1"
                        onChange={(e) => setSelectedUser1(e.target.value)}


                    >
                        {filteredPlayersForPlayer1.map((person) => (
                            <MenuItem key={person.id} value={person.id}>
                                {person.name} {person.lastName}
                            </MenuItem>
                        ))}
                    </Select>

                </FormControl>



                <FormControl sx={{
                    m: 1, minWidth: 225
                }}>
                    <InputLabel id="player2-label">Spieler 2</InputLabel>
                    <Select
                        labelId="player2-label"
                        id="player2-select"
                        value={selectedUser2}
                        label="player_2"
                        onChange={(e) => setSelectedUser2(e.target.value)}
                        defaultValue={""}
                    >
                        {filteredPlayersForPlayer2.map((person) => (
                            <MenuItem key={person.id} value={person.id}>
                                {person.name} {person.lastName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={winner}
                    onChange={handleChangeWinner}
                >
                    <FormControlLabel value="player1" control={<Radio />} label="Spieler 1" />
                    <FormControlLabel value="player2" control={<Radio />} label="Spieler 2" />
                </RadioGroup>

                <Button variant="contained" onClick={calculateElo}>
                    Ergebnis eintragen
                </Button>

            </div>


        </div>

    );
}

export default GameInput;