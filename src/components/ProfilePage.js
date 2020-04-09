import React from "react";
import NavMenu from "./NavMenu";
import './components.scss';


class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
    <div className="container">
      <NavMenu />
      <h1>Profile page!</h1>
    </div>
    );
  }
}

export default ProfilePage;