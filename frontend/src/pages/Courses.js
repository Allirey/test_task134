import React from 'react';
import withStore from '../hocs/withStore';
import CoursesTable from "../components/CoursesTable";

class Courses extends React.Component {
    componentDidMount() {
        this.props.stores.users.getCourses();
    }

    render() {
        const courses = this.props.stores.users.courses;

        return (
                <CoursesTable courses={courses}/>
        )
    }
}

export default withStore(Courses);