import React from 'react';
import withStore from '../hocs/withStore';
import UserEditForm from "../components/UserEditForm";

class UserEdit extends React.Component{
    render(){
        return (
            <div>
                <UserEditForm/>
            </div>
        )
    }
}

export default withStore(UserEdit);