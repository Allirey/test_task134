import React, {useState} from 'react';
import {
    Button, TextField, Grid, Typography, Container, makeStyles, CssBaseline, MenuItem, Fab, Chip, Snackbar
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import MuiAlert from "@material-ui/lab/Alert";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {Link} from 'react-router-dom';

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

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function UserEditForm(props) {
    const user = props.user;

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [mobile, setMobile] = useState(user.mobile);
    const [status, setStatus] = useState(user.status);
    const [courses, setCourses] = useState(user.courses);

    const [emailErrorText, setEmailErrorText] = useState('');
    const [phoneErrorText, setPhoneErrorText] = useState('');
    const [mobileErrorText, setMobileErrorText] = useState('');

    const [allCourses, setAllCourses] = useState(props.courses);
    const [allCoursesCurrent, setAllCoursesCurrent] = useState(allCourses[allCourses.length - 1].id);

    console.log(courses);

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClick = () => setOpen(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    const handleAddCourse = (event) => {
        setCourses([...courses, allCourses.find(obj => obj.id === allCoursesCurrent)]);
        setAllCourses([...allCourses.filter(obj => obj.id !== allCoursesCurrent)]);
        allCourses.length > 0 && setAllCoursesCurrent(allCourses[allCourses.length - 1].id)
    };

    const isEmailValid = () => {
        let isValid = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);
        setEmailErrorText(isValid ? '' : email.length ? 'Please enter a valid email address.' : 'This field is required');
        return isValid;
    };

    const isPhoneValid = () => {
        let isValid = phone.length === 0 || /^\++[0-9]{10,15}$/.test(phone);
        setPhoneErrorText(isValid ? '' : 'Please enter a valid phone number (e.g. +380123456789), or leave empty');
        return isValid;
    };

    const isMobileValid = () => {
        let isValid = mobile.length === 0 || /^\++[0-9]{10,15}$/.test(mobile);
        setMobileErrorText(isValid ? '' : 'Please enter a valid mobile number (e.g. +380123456789), or leave empty');
        return isValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isEmailValid() | !isPhoneValid() | !isMobileValid()) return;

        props.onSubmit({
            id: props.user.id,
            name: name,
            email: email,
            status: status,
            phone: phone,
            mobile: mobile,
            courses: courses.map(c => c.id)
        }).then(success => {
            if (success) {
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
            <Fab size={"small"} component={Link} to={"/"} color={"secondary"}><ChevronLeftIcon/></Fab>
            <CssBaseline/>
            <div className={classes.paper}>
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: "center"}}
                    autoHideDuration={3000}
                    open={open}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose}>Changes saved successfully</Alert>
                </Snackbar>
                <Typography component="h1" variant="h4">
                    CHANGE USER
                </Typography>
                <form className={classes.form} autoComplete={"off"} onSubmit={handleSubmit}>
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
                                value={name}
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
                                value={!!status}
                                select
                                fullWidth
                                onChange={event => setStatus(event.target.value)}
                            >
                                <MenuItem value={false}>Inactive</MenuItem>
                                <MenuItem value={true}>Active</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item container xs={12}>
                            <Grid item xs={9}>
                                <TextField
                                    id="courses"
                                    label="Courses"
                                    value={allCoursesCurrent} select fullWidth
                                    onChange={event => setAllCoursesCurrent(event.target.value)}
                                >
                                    {allCourses.filter((item) => !courses.includes(item)).map((c, i) => (
                                        <MenuItem value={c.id}>{c.name}</MenuItem>
                                    ))}
                                </TextField>

                            </Grid>
                            <Grid item xs={1}/>
                            <Grid item>
                                <Fab
                                    size={"small"}
                                    className={classes.addCourse}
                                    onClick={handleAddCourse}><AddIcon/></Fab>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            {courses.map(c => (
                                <Chip
                                    label={c.name}
                                    onDelete={() => {
                                    }}
                                    color={"primary"}
                                />
                            ))}
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
                        SAVE
                    </Button>
                </form>
            </div>
        </Container>
    );
}
