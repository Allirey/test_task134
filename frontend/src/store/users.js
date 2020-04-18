import {observable, computed, action, decorate} from 'mobx';

class UserStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    userList = [];
    courses = [];

    createUser = (userData) => {
        fetch("http://127.0.0.1:5000/api/users", {
            method: "POST",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .then(json => console.log(json))
            .then(()=>this.getUsers());
    };

    getUser = (userId) => {
        fetch("http://127.0.0.1:5000/api/users/" + userId)
            .then(response => response.json())
            .then(json => console.log(json))
    };

    updateUser = (userId) => {
        fetch("http://localhost:5000/api/users/" + userId)
            .then(response => response.json())
            .then(json => this.userList = json)
    };

    deleteUser = (userId) => {
        fetch("http://localhost:5000/api/users/" + userId, {method: "DELETE"})
            .then(()=>this.getUsers())
    };


    getCourses = () => {
        fetch("http://localhost:5000/api/courses")
            .then(response => response.json())
            .then(json => this.courses = json)
    };

    getUsers = () => {
        fetch("http://localhost:5000/api/users")
            .then(response => response.json())
            .then(json => this.userList = json)
    };

}

decorate(UserStore, {
        userList: observable,
        courses: observable,

        getCourses: action,
        getUsers: action,

        createUser: action,
        getUser: action,
        deleteUser: action,
        updateUser: action,
    }
);

export default UserStore;