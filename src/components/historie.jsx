import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { useState } from "react";

function getTimestamp(value) {
    const dateString = String(value ?? "").trim();
    const isoDateMatch = dateString.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);

    if (isoDateMatch) {
        const [, year, month, day] = isoDateMatch;
        return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
    }

    const localDateMatch = dateString.match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})$/);
    if (localDateMatch) {
        const [, first, second, year] = localDateMatch;
        const firstNumber = Number(first);
        const secondNumber = Number(second);
        const day = dateString.includes(".") || firstNumber > 12 ? firstNumber : secondNumber;
        const month = dateString.includes(".") || firstNumber > 12 ? secondNumber : firstNumber;
        return new Date(Number(year), month - 1, day).getTime();
    }

    const timestamp = Date.parse(dateString);
    return Number.isNaN(timestamp) ? null : timestamp;
}

function Historie({ data = [] }) {
    const sortedData = [...data].sort((a, b) => {
        const timestampA = getTimestamp(a.Datum);
        const timestampB = getTimestamp(b.Datum);
        if (timestampA === null) return timestampB === null ? 0 : 1;
        if (timestampB === null) return -1;
        return timestampB - timestampA;
    });
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const visibleData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div className="box">
            <TableContainer component={Paper}>
                <Table sx={{}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }}>Datum</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Spieler1</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Spieler2</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visibleData.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{new Date(row.Datum).toLocaleDateString()}</TableCell>
                                <TableCell component="th" scope="row" sx={{
                                    backgroundColor:
                                        row.Gewinner === row.Spieler1 ? "green" : "inherit",
                                    color:
                                        row.Gewinner === row.Spieler1 ? "white" : "inherit",
                                    fontWeight:
                                        row.Gewinner === row.Spieler1 ? "bold" : "normal"
                                }}>
                                    {row.Spieler1}
                                </TableCell>
                                <TableCell sx={{
                                    backgroundColor:
                                        row.Gewinner === row.Spieler2 ? "green" : "inherit",
                                    color:
                                        row.Gewinner === row.Spieler2 ? "white" : "inherit",
                                    fontWeight:
                                        row.Gewinner === row.Spieler2 ? "bold" : "normal"
                                }}>{row.Spieler2}</TableCell>
                                

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={sortedData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>

    );
}

export default Historie;