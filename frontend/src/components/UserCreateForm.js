import React, {useState} from 'react';
import {
    Button,
    TextField,
    FormControl,
    FormControlLabel,
    InputLabel,
    Grid,
    Link,
    Typography,
    Container,
    makeStyles,
    CssBaseline,
    Select, MenuItem
} from '@material-ui/core';

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
}));

export default function (props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [mobile, setMobile] = useState('');
    const [status, setStatus] = useState(false);

    const classes = useStyles();

    const handleSubmit=(event)=>{
        event.preventDefault();
        props.onSubmit({
            name:name,
            email:email,
            status:status,
            phone:phone,
            mobile:mobile
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h4">
                    CREATE USER
                </Typography>
                <form className={classes.form} autoComplete={"off"} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                value={name}
                                onChange={event => setName(event.target.value)}
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
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="phone"
                                label="Phone"
                                name="phone"
                                value={phone}
                                onChange={event => setPhone(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="mobile"
                                label="Mobile phone"
                                name="mobile"
                                value={mobile}
                                onChange={event => setMobile(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="select"
                                label="Status"
                                value={status} select fullWidth
                                onChange={event => setStatus(event.target.value)}
                            >
                                <MenuItem value={false}>Inactive</MenuItem>
                                <MenuItem value={true}>Active</MenuItem>
                            </TextField>
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