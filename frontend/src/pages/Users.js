import React from 'react';
import withStore from '../hocs/withStore';
import UsersTable from "../components/UsersTable";
import {Fab, Typography, withStyles, Grid} from '@material-ui/core'
import {Link} from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import TextField from "@material-ui/core/TextField";
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(3),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    searchButton: {
        backgroundColor: '#5db273',
        color: "white",
    }
});


class Users extends React.Component {
    state = {
        searchFilter: '',
        searchInput: '',
    };

    componentDidMount() {
        this.props.stores.users.getUsers();
    }

    onSubmitSearch = () => this.setState({searchFilter: this.state.searchInput});


    render() {
        const {classes} = this.props;
        const users = this.props.stores.users;

        return (
            <div className={classes.paper}>
                <Grid container justify={"space-between"} alignItems={"center"}>
                    <Grid item xs={2} md={1}>
                        <Fab size={"small"} color={"secondary"} component={Link} to={"/users/create"}><AddIcon/></Fab>
                    </Grid>
                    <Grid item xs md={3}>
                        <TextField
                            label={"search"}
                            onChange={event => this.setState({searchInput: event.target.value})}
                            onKeyDown={(e) => e.keyCode === 13 ? this.onSubmitSearch() : []}
                        />
                        <Fab size={"small"} onClick={this.onSubmitSearch} className={classes.searchButton}><SearchIcon/></Fab>
                    </Grid>
                    <Grid container item md={4} justify={"center"}>
                        <Typography component="h1" variant="h4">
                            USERS
                        </Typography>
                    </Grid>
                    <Grid item md={4}>

                    </Grid>
                    <UsersTable
                        users={this.props.stores.users.userList}
                        onDeleteClick={users.deleteUser}
                        searchFilter={this.state.searchFilter}
                    />
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(withStore(Users));