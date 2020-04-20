import React from 'react';
import withStore from '../hocs/withStore';
import UserCreateForm from "../components/UserCreateForm";
import {Link} from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {Fab, Grid, Typography, withStyles} from "@material-ui/core";

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(3),
    }
});

class UserCreate extends React.Component {

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.paper}>
                <Grid container justify={"space-between"}>
                    <Grid item xs={1}>
                        <Fab size={"small"} component={Link} to={"/"} color={"secondary"}><ChevronLeftIcon/></Fab>
                    </Grid>
                    <Grid item>
                        <Typography component="h1" variant="h4">
                            CREATE USER
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>

                    </Grid>
                </Grid>
                <UserCreateForm
                    onSubmit={this.props.stores.users.createUser}
                    redirectOnSubmit={() => setTimeout(() => {
                        this.props.history.push("/")
                    }, 3050)}
                />
            </div>
        )
    }
}

export default withStyles(styles)(withStore(UserCreate));