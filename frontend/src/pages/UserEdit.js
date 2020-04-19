import React from 'react';
import withStore from '../hocs/withStore';
import UserEditForm from "../components/UserEditForm";

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
        return this.props.stores.users.userToEdit && this.props.stores.users.courses?
            (
                <div>
                    <UserEditForm
                        user={this.props.stores.users.userToEdit}
                        courses={this.props.stores.users.courses}
                        onSubmit={this.props.stores.users.updateUser}
                        redirectOnSubmit={()=> setTimeout(()=>{this.props.history.push("/")}, 3100)}
                    />
                </div>
            ) : null
    }
}

export default withStore(UserEdit);