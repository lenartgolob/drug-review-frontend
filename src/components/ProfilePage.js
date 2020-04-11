import React from "react";
import NavMenu from "./NavMenu";
import Profile from "./Profile";

import './components.scss';


class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    if (localStorage.getItem("id") == null) {
      window.location.replace("/login");
    }
  }

  render() {
    return (
    <div className="container">
      <NavMenu />
      <Profile />
    </div>
    );
  }
}

export default ProfilePage;