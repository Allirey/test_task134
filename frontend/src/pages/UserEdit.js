import React from 'react';
import withStore from '../hocs/withStore';
import UserEditForm from "../components/UserEditForm";
import {Link} from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {Fab, Typography, Grid, withStyles} from "@material-ui/core";

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(3),
    }
});

class UserEdit extends React.Component {
    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.stores.users.getUser(id);
        this.props.stores.users.getCourses();
    }

    componentWillUnmount() {
        this.props.stores.users.userToEdit = null;
    }

    render() {
        const {classes} = this.props;

        return this.props.stores.users.userToEdit && this.props.stores.users.courses ?
            (
                <div className={classes.paper}>
                    <Grid container justify={"space-between"}>
                        <Grid item xs={1}>
                            <Fab size={"small"} component={Link} to={"/"} color={"secondary"}><ChevronLeftIcon/></Fab>
                        </Grid>
                        <Grid item>
                            <Typography component="h1" variant="h4">
                                CHANGE USER
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>

                        </Grid>
                    </Grid>
                    <UserEditForm
                        user={this.props.stores.users.userToEdit}
                        courses={this.props.stores.users.courses}
                        onSubmit={this.props.stores.users.updateUser}
                        redirectOnSubmit={() => setTimeout(() => {
                            this.props.history.push("/")
                        }, 3050)}
                    />
                </div>
            ) : null
    }
}

export default withStyles(styles)(withStore(UserEdit));