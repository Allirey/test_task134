import React, {useState} from 'react';
import {
    Button, TextField, Grid, Typography, Container, makeStyles, CssBaseline, MenuItem, Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => ({
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

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function (props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [mobile, setMobile] = useState('');
    const [status, setStatus] = useState(false);
    const [open, setOpen] = useState(false);
    const [nameErrorText, setNameErrorText] = useState('');
    const [emailErrorText, setEmailErrorText] = useState('');
    const [phoneErrorText, setPhoneErrorText] = useState('');
    const [mobileErrorText, setMobileErrorText] = useState('');

    const classes = useStyles();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    const isNameValid = () => {
        let isValid = /^[a-zA-Z]{4,20}$/.test(name);
        setNameErrorText(isValid ? '' : name.length ? 'Please enter a valid name. 4-20 latin letters' : 'This field is required');
        return isValid;
    };

    const isEmailValid = () => {
        let isValid = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);
        setEmailErrorText(isValid ? '' : email.length ? 'Please enter a valid email address.' : 'This field is required');
        return isValid;
    };

    const isPhoneValid =()=>{
        let isValid = phone.length === 0 || /^\++[0-9]{10,15}$/.test(phone);
        setPhoneErrorText(isValid? '': 'Please enter a valid phone number (e.g. +380123456789), or leave empty');
        return isValid;
    };

    const isMobileValid = () => {
        let isValid = mobile.length === 0 || /^\++[0-9]{10,15}$/.test(mobile);
        setMobileErrorText(isValid? '': 'Please enter a valid mobile number (e.g. +380123456789), or leave empty');
        return isValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isNameValid() | !isEmailValid() | !isPhoneValid() | !isMobileValid()) return;

        props.onSubmit({
            name: name,
            email: email,
            status: status,
            phone: phone,
            mobile: mobile
        }).then(success=>{
            if(success){
                setOpen(true);
                props.redirectOnSubmit();
            }
            else{
                //todo server failure message.
            }
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div>
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: "center"}}
                    autoHideDuration={3000}
                    open={open}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose}>User created successfully</Alert>
                </Snackbar>
                <form className={classes.form} autoComplete={"off"} onSubmit={handleSubmit} noValidate>
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
                                error={!!nameErrorText}
                                helperText={nameErrorText}
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
                                error={!!emailErrorText}
                                helperText={emailErrorText}
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
                                error={!!phoneErrorText}
                                helperText={phoneErrorText}
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
                                error={!!mobileErrorText}
                                helperText={mobileErrorText}
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
                        disabled={open}
                    >
                        Create
                    </Button>
                </form>
            </div>
        </Container>
    );
}