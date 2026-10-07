import Button from '@mui/material/Button';
import { useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { doppelTabelleUrl, doppelHistorieUrl } from './config';


function GameInput({ data, setData, historieData, setHistorieData }) {



    async function calculateElo() {
        if (!selectedUser1 || !selectedUser2 || !selectedUser3 || !selectedUser4 || !winner) {
            alert("Bitte wählen Sie alle Spieler und den Gewinner aus.");
            return;
        }
        let k = 32;
        let player1Rating = data.find(player => player.id === selectedUser1).points;
        let player2Rating = data.find(player => player.id === selectedUser2).points;
        let player3Rating = data.find(player => player.id === selectedUser3).points;
        let player4Rating = data.find(player => player.id === selectedUser4).points;

        let team1Rating = (player1Rating + player2Rating) / 2;
        let team2Rating = (player3Rating + player4Rating) / 2;


        const expected1 = 1 / (1 + Math.pow(10, (team2Rating - team1Rating) / 400));
        const expected2 = 1 / (1 + Math.pow(10, (team1Rating - team2Rating) / 400));

        let score1, score2;


        if (winner === "team1") {
            score1 = 1;
            score2 = 0;
        } else if (winner === "team2") {
            score1 = 0;
            score2 = 1;
        } else {
            score1 = 0.5;
            score2 = 0.5;
        }

        const newRating1 = Math.round(player1Rating + k * (score1 - expected1));
        const newRating2 = Math.round(player2Rating + k * (score1 - expected1));
        const newRating3 = Math.round(player3Rating + k * (score2 - expected2));
        const newRating4 = Math.round(player4Rating + k * (score2 - expected2));

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
        setData(prevData =>
            prevData.map(item =>
                item.id === selectedUser3 ? { ...item, points: newRating3 } : item
            )
        );
        setData(prevData =>
            prevData.map(item =>
                item.id === selectedUser4 ? { ...item, points: newRating4 } : item
            )
        );

        let player1data = data.find(player => player.id === selectedUser1);
        let player2data = data.find(player => player.id === selectedUser2);
        let player3data = data.find(player => player.id === selectedUser3);
        let player4data = data.find(player => player.id === selectedUser4);
        setSelectedUser1("");
        setSelectedUser2("");
        setSelectedUser3("");
        setSelectedUser4("");
        setWinner("");

        const newResult = {
            id: Date.now(),
            Spieler1: player1data.name + " " + player1data.lastName,
            Spieler2: player2data.name + " " + player2data.lastName,
            Spieler3: player3data.name + " " + player3data.lastName,
            Spieler4: player4data.name + " " + player4data.lastName,
            Gewinner: winner === "team1" ? "Team 1" : winner === "team2" ? "Team 2" : "",
            Datum: new Date().toISOString().split('T')[0]
        };


        setHistorieData(prevData => [...prevData, newResult]);

        await fetch(doppelTabelleUrl, { 
            method: "POST",
            body: JSON.stringify({
                action: "update",
                id: player1data.id,
                name: player1data.name,
                lastName: player1data.lastName,
                points: newRating1
            })
        }).catch(err => console.error("Fehler beim Update Spieler 1:", err));

        await fetch(doppelTabelleUrl, {
            method: "POST",
            body: JSON.stringify({
                action: "update",
                id: player2data.id,
                name: player2data.name,
                lastName: player2data.lastName,
                points: newRating2
            })
        }).catch(err => console.error("Fehler beim Update Spieler 2:", err));

        await fetch(doppelTabelleUrl, {
            method: "POST",
            body: JSON.stringify({
                action: "update",
                id: player3data.id,
                name: player3data.name,
                lastName: player3data.lastName,
                points: newRating3
            })
        }).catch(err => console.error("Fehler beim Update Spieler 3:", err));

        await fetch(doppelTabelleUrl, {
            method: "POST",
            body: JSON.stringify({
                action: "update",
                id: player4data.id,
                name: player4data.name,
                lastName: player4data.lastName,
                points: newRating4
            })
        }).catch(err => console.error("Fehler beim Update Spieler 4:", err));


        console.log("Player 1 new rating:", newRating1);
        console.log("Player 2 new rating:", newRating2);
        console.log("Player 3 new rating:", newRating3);
        console.log("Player 4 new rating:", newRating4);

        console.log("Spieler 1:", player1data.name + " " + player1data.lastName);
        console.log("Spieler 2:", player2data.name + " " + player2data.lastName);
        console.log("Spieler 3:", player3data.name + " " + player3data.lastName);
        console.log("Spieler 4:", player4data.name + " " + player4data.lastName);
        console.log("Gewinner:", winner === "team1" ? "Team 1" : winner === "team2" ? "Team 2" : "");
        console.log("Datum:", newResult.Datum);



        await fetch(doppelHistorieUrl, {
            method: "POST",
            body: JSON.stringify({
                action: "create",
                id: Date.now(),
                Spieler1: player1data.name + " " + player1data.lastName,
                Spieler2: player2data.name + " " + player2data.lastName,
                Spieler3: player3data.name + " " + player3data.lastName,
                Spieler4: player4data.name + " " + player4data.lastName,
                Gewinner: winner === "team1" ? "Team 1" : winner === "team2" ? "Team 2" : "",
                Datum: new Date().toLocaleDateString()
            })
        });
    }



    const [selectedUser1, setSelectedUser1] = useState("");
    const [selectedUser2, setSelectedUser2] = useState("");
    const [selectedUser3, setSelectedUser3] = useState("");
    const [selectedUser4, setSelectedUser4] = useState("");
    const [winner, setWinner] = useState("");


    const handleChangeWinner = (event) => {
        setWinner(event.target.value);
        console.log("Gewinner ausgewählt:", event.target.value);
    };


    const filteredPlayersForPlayer1 = data.filter(
        (person) => person.id !== selectedUser2 && person.id !== selectedUser3 && person.id !== selectedUser4
    );

    const filteredPlayersForPlayer2 = data.filter(
        (person) => person.id !== selectedUser1 && person.id !== selectedUser3 && person.id !== selectedUser4
    );
    const filteredPlayersForPlayer3 = data.filter(
        (person) => person.id !== selectedUser2 && person.id !== selectedUser1 && person.id !== selectedUser4
    );
    const filteredPlayersForPlayer4 = data.filter(
        (person) => person.id !== selectedUser3 && person.id !== selectedUser2 && person.id !== selectedUser1
    );




    return (
        <div className="box">
            <div className="box">
                <h2>Ergebnis eintragen</h2>
                <h3>Team 1</h3>

                <Autocomplete
                    sx={{ m: 1, minWidth: 225 }}
                    options={filteredPlayersForPlayer1}
                    value={filteredPlayersForPlayer1.find((p) => p.id === selectedUser1) ?? null}
                    onChange={(event, newValue) => setSelectedUser1(newValue ? newValue.id : "")}
                    getOptionLabel={(person) => `${person.name} ${person.lastName}`}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    noOptionsText="Keine Spieler gefunden"
                    renderInput={(params) => (
                        <TextField {...params} label="Spieler 1" />
                    )}
                />



                <Autocomplete
                    sx={{ m: 1, minWidth: 225 }}
                    options={filteredPlayersForPlayer2}
                    value={filteredPlayersForPlayer2.find((p) => p.id === selectedUser2) ?? null}
                    onChange={(event, newValue) => setSelectedUser2(newValue ? newValue.id : "")}
                    getOptionLabel={(person) => `${person.name} ${person.lastName}`}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    noOptionsText="Keine Spieler gefunden"
                    renderInput={(params) => (
                        <TextField {...params} label="Spieler 2" />
                    )}
                />

                    
                <h3>Team 2</h3>
                <Autocomplete
                    sx={{ m: 1, minWidth: 225 }}
                    options={filteredPlayersForPlayer3}
                    value={filteredPlayersForPlayer3.find((p) => p.id === selectedUser3) ?? null}
                    onChange={(event, newValue) => setSelectedUser3(newValue ? newValue.id : "")}
                    getOptionLabel={(person) => `${person.name} ${person.lastName}`}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    noOptionsText="Keine Spieler gefunden"
                    renderInput={(params) => (
                        <TextField {...params} label="Spieler 3" />
                    )}
                />

                <Autocomplete
                    sx={{ m: 1, minWidth: 225 }}
                    options={filteredPlayersForPlayer4}
                    value={filteredPlayersForPlayer4.find((p) => p.id === selectedUser4) ?? null}
                    onChange={(event, newValue) => setSelectedUser4(newValue ? newValue.id : "")}
                    getOptionLabel={(person) => `${person.name} ${person.lastName}`}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    noOptionsText="Keine Spieler gefunden"
                    renderInput={(params) => (
                        <TextField {...params} label="Spieler 4" />
                    )}
                />
                
                <h3>Gewinner:</h3>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={winner}
                    onChange={handleChangeWinner}
                >
                    <FormControlLabel value="team1" control={<Radio />} label="Team 1" />
                    <FormControlLabel value="team2" control={<Radio />} label="Team 2" />

                </RadioGroup>

                <Button variant="contained" onClick={calculateElo}>
                    Ergebnis eintragen
                </Button>

            </div>


        </div>

    );
}

export default GameInput;

