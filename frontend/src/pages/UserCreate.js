import React from 'react';
import withStore from '../hocs/withStore';
import UserCreateForm from "../components/UserCreateForm";

class UserCreate extends React.Component{
    render(){
        return (
            <div>
                <UserCreateForm onSubmit={this.props.stores.users.createUser}/>
            </div>
        )
    }
}

export default withStore(UserCreate);