import React from "react";
import { connect } from 'react-redux'
import { addCourse } from "../../redux/coursesReducer"
import Courses from "./Courses";


class coursesContainer extends React.Component {
  render() {
    return <Courses {...this.props} />
  }
}

let mapStateToProps = (state) => {
  return {
    coursesData: state.coursesPage.coursesData,
  };
}

export default connect(mapStateToProps, { addCourse })(coursesContainer);
