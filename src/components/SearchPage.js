import React from "react";
import "../App.scss";
import NavMenu from "./NavMenu";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
    <div className="container">
      <NavMenu />
      <h1>Search page!</h1>
      <p>{localStorage.getItem('id')}</p>
    </div>
    );
  }
}

export default SearchPage;