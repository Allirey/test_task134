import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import withStore from '../hocs/withStore'

import Header from '../components/Header'
import Error404 from "../pages/Error404"
import Users from "../pages/Users";
import Courses from "../pages/Courses";
import UserCreate from "../pages/UserCreate";
import UserEdit from "../pages/UserEdit";
import Container from "@material-ui/core/Container";


class App extends React.Component {
    render() {
        return (
            <Router>
                <Header/>
                <Container>
                    <Switch>
                        <Route path="/" exact={true} component={Users}/>
                        <Route path="/courses" exact={true} component={Courses}/>
                        <Route path="/users/create" component={UserCreate}/>
                        <Route path="/users/edit/:id" exact={true} component={UserEdit}/>
                        <Route path="**" exact={true} component={Error404}/>
                    </Switch>
                </Container>
            </Router>
        )
    }
}

export default withStore(App);