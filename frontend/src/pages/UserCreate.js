import React from 'react';
import withStore from '../hocs/withStore';
import UserCreateForm from "../components/UserCreateForm";

class UserCreate extends React.Component{
    render(){
        return (
            <div>
                <UserCreateForm
                    onSubmit={this.props.stores.users.createUser}
                    redirectOnSubmit={()=> setTimeout(()=>{this.props.history.push("/")}, 3100)}
                />
            </div>
        )
    }
}

export default withStore(UserCreate);