import React, {useState} from 'react';
import {
    Button, TextField, Grid, Container, makeStyles, CssBaseline, MenuItem, Fab, Chip, Snackbar
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import MuiAlert from "@material-ui/lab/Alert";

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
    const [userCourses, setUserCourses] = useState(user.courses);

    const [emailErrorText, setEmailErrorText] = useState('');
    const [phoneErrorText, setPhoneErrorText] = useState('');
    const [mobileErrorText, setMobileErrorText] = useState('');

    const [coursesToShow, setCoursesToShow] = useState(props.courses.filter((course) => !userCourses.map(obj => obj.id).includes(course.id)));
    const [allCoursesCurrent, setAllCoursesCurrent] = useState(coursesToShow.length > 0 ? coursesToShow[0].id : null);

    const classes = useStyles();
    const [showMessage, setShowMessage] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setShowMessage(false);
    };

    const handleAddUserCourse = (event) => {
        let newUserCourses = [...userCourses, coursesToShow.find(obj => obj.id === allCoursesCurrent)];
        let newAllCourses = [...coursesToShow.filter(obj => obj.id !== allCoursesCurrent)];
        newAllCourses.length > 0 && setAllCoursesCurrent(newAllCourses[0].id);

        setUserCourses(newUserCourses);
        setCoursesToShow(newAllCourses);
    };

    const handleDeleteUserCourse = (courseToDelete) => {
        let newUserCourses = userCourses.filter(obj => obj.id !== courseToDelete.id);
        setUserCourses(newUserCourses);
        let newCoursesToShow = props.courses.filter((course) => !newUserCourses.map(obj => obj.id).includes(course.id));
        if (newCoursesToShow.length === 1) setAllCoursesCurrent(newCoursesToShow[0].id);
        setCoursesToShow(newCoursesToShow)

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
            courses: userCourses.map(c => c.id)
        }).then(success => {
            if (success) {
                setShowMessage(true);
                props.redirectOnSubmit();
            } else {
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
                    open={showMessage}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose}>Changes saved successfully</Alert>
                </Snackbar>
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
                        {coursesToShow.length > 0 ?
                            <Grid item container xs={12}>
                                <Grid item xs={9}>
                                    <TextField
                                        id="courses"
                                        label="Courses"
                                        value={allCoursesCurrent} select fullWidth
                                        onChange={event => setAllCoursesCurrent(event.target.value)}
                                    >
                                        {coursesToShow.map(course => (
                                            <MenuItem value={course.id}>{course.name}</MenuItem>
                                        ))}
                                    </TextField>

                                </Grid>
                                <Grid item xs={1}/>
                                <Grid item>
                                    <Fab
                                        size={"small"}
                                        className={classes.addCourse}
                                        onClick={handleAddUserCourse}><AddIcon/></Fab>
                                </Grid>
                            </Grid> : null}

                        <Grid item xs={12}>
                            {userCourses.map(course => (
                                <Chip
                                    label={course.name}
                                    onDelete={()=>handleDeleteUserCourse(course)}
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
                        disabled={showMessage}
                    >
                        SAVE
                    </Button>
                </form>
            </div>
        </Container>
    );
}
