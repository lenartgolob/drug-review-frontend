import React from "react";
import NavMenu from "./NavMenu";


class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
    <div className="container">
      <NavMenu />
      <h1>Review page!</h1>
    </div>
    );
  }
}

export default Review;