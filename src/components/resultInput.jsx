import Button from '@mui/material/Button';
import { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


function GameInput({ data, setData }) {


    async function calculateElo() {
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

        await fetch("https://script.google.com/macros/s/AKfycbxVbo12TyZWwfVK3iJzqCD11XfciG6BSWAGpCCNmQ7rjuixPOsvHZdxg9Hh0mJVwGpb/exec", {
            method: "POST",
            body: JSON.stringify({
                action: "update",
                id: player1data.id,
                name: player1data.name,
                lastName: player1data.lastName,
                points: newRating1
            })
        });

        await fetch("https://script.google.com/macros/s/AKfycbxVbo12TyZWwfVK3iJzqCD11XfciG6BSWAGpCCNmQ7rjuixPOsvHZdxg9Hh0mJVwGpb/exec", {
            method: "POST",
            body: JSON.stringify({
                action: "update",
                id: player2data.id,
                name: player2data.name,
                lastName: player2data.lastName,
                points: newRating2
            })
        });
        console.log("Player 1 new rating:", newRating1);
        console.log("Player 2 new rating:", newRating2);

    }


    const [selectedUser1, setSelectedUser1] = useState("0");
    const [selectedUser2, setSelectedUser2] = useState("0");

    const handleChangeWinner = (event) => {
        setWinner(event.target.value);
    };
    const [winner, setWinner] = React.useState('Player1');




    return (
        <div className="box">

            <FormControl sx={{
                m: 0, minWidth: 225

            }}>
                <InputLabel id="demo-simple-select-label">Spieler 1</InputLabel>
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



            <FormControl sx={{
                m: 0, minWidth: 225
            }}>
                <InputLabel id="input_player2">Spieler 2</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={data.name}
                    label="player_2"
                    onChange={(e) => setSelectedUser2(e.target.value)}
                    defaultValue={""}
                >
                    {data.map((person) => (
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

    );
}

export default GameInput;