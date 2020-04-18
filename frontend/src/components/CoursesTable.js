import React from "react";
import {
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableContainer,
    TableCell,
    Paper,
    Typography,
    Container,
    makeStyles
} from "@material-ui/core";

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
        }
    }

}));

export default function (props) {
    const classes = useStyles();

    return (
        <Container className={classes.root} maxWidth={"md"}>
            <Typography component="h1" variant="h4">
                COURSES
            </Typography>
            <TableContainer component={Paper} className={classes.table}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Code</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.courses.map((row, i) => (
                            <TableRow>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.code}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}