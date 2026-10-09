import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";


function Historie(data) {

    console.log("data", data);

    let sortedData = data.data;
    
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

    console.log("sortedData", sortedData);

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