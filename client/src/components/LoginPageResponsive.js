import React from "react";
import LoginPageDesktop from "./LoginPage";
import MobileLogin from "./MobileLogin";
import NavMenu from "./NavMenu";


class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: null,
      width: null
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions.bind(this));
  }

  componentWillUnmount() {
      window.removeEventListener("resize", this.updateWindowDimensions.bind(this));
  }

  updateWindowDimensions() {
      this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    return (
    <div className="container">
      <NavMenu hide="true" />
      {(this.state.width > 600) ? <LoginPageDesktop /> : <MobileLogin />}
    </div>
    );
  }
}

export default Review;