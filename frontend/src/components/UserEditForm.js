import React from 'react';
import {
    Button,
    TextField,
    FormControl,
    FormControlLabel,
    Grid,
    Link,
    Typography,
    Container,
    makeStyles,
    CssBaseline,
    Select, MenuItem, Fab
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        backgroundColor: "green",
        margin: theme.spacing(3, 0, 2),
        "&:hover": {backgroundColor: "#15ad31",}
    },
    addCourse: {
        backgroundColor: "green",
        color: "white",
        "&:hover": {backgroundColor: "#15ad31",}
    }
}));

export default function() {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h4">
                    CHANGE USER
                </Typography>
                <form className={classes.form} autoComplete={"off"}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                disabled={true}
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="E-mail"
                                name="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="phone"
                                label="Phone"
                                name="phone"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="mphone"
                                label="Mobile phone"
                                name="mphone"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Select
                                label="Status"
                                id="status"
                                value={false}
                                fullWidth
                                // onChange={handleChange}
                            >
                                <MenuItem value={false}>Inactive</MenuItem>
                                <MenuItem value={true}>Active</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item container xs={12}>
                            <Grid item xs={9}>
                                <Select
                                    label="Courses"
                                    id="courses"
                                    value={"Python-Base"}
                                    fullWidth
                                    // onChange={handleChange}
                                >
                                    <MenuItem value={false}>Inactive</MenuItem>
                                    <MenuItem value={true}>Active</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={1}/>
                            <Grid item>
                                <Fab size={"small"} className={classes.addCourse}><AddIcon/></Fab>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Create
                    </Button>
                </form>
            </div>
        </Container>
    );
}