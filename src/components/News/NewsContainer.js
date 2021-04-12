import React from "react";
import { connect } from 'react-redux'
import { addNews } from "../../redux/newsReducer"
import News from "./News";


class newsContainer extends React.Component {
  render() {
    return <News {...this.props} />
  }
}

let mapStateToProps = (state) => {
  return {
    newsData: state.newsPage.newsData,
  };
}

export default connect(mapStateToProps, { addNews })(newsContainer);
