import React from 'react';
import withStore from '../hocs/withStore';
import UsersTable from "../components/UsersTable";
import {Button, Fab, Typography, withStyles} from '@material-ui/core'
import {Link} from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
});


class Users extends React.Component {
    componentDidMount() {
        this.props.stores.users.getUsers();
    }

    render() {
        const users = this.props.stores.users;
        const { classes } = this.props;

        return (
            <div className={classes.paper}>
                <Fab size={"small"} color={"secondary"} component={Link} to={"/users/create"}><AddIcon/></Fab>

                <Typography component="h1" variant="h4">
                    USERS
                </Typography>
                <UsersTable
                    users={users.userList}
                    onDeleteClick={users.deleteUser}
                />
            </div>
        )
    }
}

export default withStyles(styles)(withStore(Users));