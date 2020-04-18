import React from "react";
import {
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableContainer,
    TableCell,
    Fab,
    Paper,
    makeStyles
} from "@material-ui/core";
import {Link} from "react-router-dom";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& h1":{
            color: "#2f303f"
        }
    },
    table: {
        marginTop: theme.spacing(3),
        "& th":{
            backgroundColor : "#575761",
            color: "white"
        },
        "& span.active":{
            color: "green",
        },
        "& span.inactive":{
            color: "red",
        },
        "& tr":{
            whiteSpace: "nowrap"
        }
    }

}));

export default function (props) {
    const classes = useStyles();

    return (
        <TableContainer component={Paper} className={classes.table}>
            <Table size={"small"}>
                <TableHead>
                    <TableRow>
                        <TableCell>NAME</TableCell>
                        <TableCell>E-MAIL</TableCell>
                        <TableCell>STATUS</TableCell>
                        <TableCell>ACTION</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.users.map((row, i) => (
                        <TableRow key={i}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>
                                <span
                                    className={row.status ? "active" : "inactive"}>{row.status ? "Active" : "Inactive"}
                                </span>
                            </TableCell>
                            <TableCell>
                                <Fab style={{backgroundColor: "green", color: "white"}} component={Link}
                                     to={"/users/edit/1"} size={"small"}><EditIcon/></Fab>
                                <Fab size={"small"} color={"secondary"}
                                     onClick={() => props.onDeleteClick(row.id)}><DeleteForeverIcon/></Fab>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}