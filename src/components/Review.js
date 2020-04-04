import React from "react";

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.location.state.id

    };
  }

  render() {
    return (
    <div>
      <h1>Search pag!</h1>
      <p>{this.state.id}</p>
    </div>
    );
  }
}

export default Review;