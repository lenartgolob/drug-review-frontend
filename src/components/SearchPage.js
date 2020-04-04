import React from "react";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogginActive: true,
      id: 0

    };
  }

  render() {
    return (
    <div>
      <h1>Search page!</h1>
      <p>{this.state.id}</p>
    </div>
    );
  }
}

export default SearchPage;