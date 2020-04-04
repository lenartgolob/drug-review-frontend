import React from "react";
import loginImg from "../../login.svg";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleRegistration = this.handleRegistration.bind(this);
    this.state = {
      email: '',
      password: '',
      name: '',
      rows: [],
    }
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleRegistration() {
    console.log(this.state.email);
    console.log(this.state.password);

    fetch('http://localhost:5000/user/new',{
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    })
    .then(res => res.json())
    .then(rows => this.setState({rows}, () => console.log('User data fetched...', rows)));

  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="registerImg" />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="namme">Full name</label>
              <input type="text" name="name" placeholder="name and last name" onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" placeholder="email" onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" onChange={this.handleChange} />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={this.handleRegistration}>
            Register
          </button>
        </div>
      </div>
    );
  }
}

export default Register;
