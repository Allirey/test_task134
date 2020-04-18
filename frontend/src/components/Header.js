import React from 'react';
import {AppBar, Toolbar, Button, makeStyles, Container} from "@material-ui/core";
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        backgroundColor: "#2f303f",
        "& a": {
            color: "white",
        },
        "& .MuiToolbar-root": {
            display: "flex",
            justifyContent: "flex-end",
        }
    },
});

export default function () {
    const classes = useStyles();

    return (

        <AppBar position={"static"} className={classes.root}>
            <Container>
                <Toolbar>
                    <Button disableRipple={true} component={Link} to={"/"}>Users</Button>
                    <Button disableRipple={true} component={Link} to={"/courses"}>Courses</Button>
                </Toolbar>
            </Container>
        </AppBar>

    )

}
