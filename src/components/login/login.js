import React from "react";
import loginImg from "../../login.svg";
import { withRouter } from 'react-router-dom';
import SweetAlert from 'sweetalert2-react';




export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      id: 0,
      email: '',
      password: '',
      show: false,
    }
  }



  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleLogin() {

    if (this.state.email === '' && this.state.password === '') {
      this.setState({show: true});

    }
    else {
    fetch('http://localhost:5000/user/session',{
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
    .then(res => res.json())
    .then(status => {

      if(status === 'wrong_pass') {
        this.setState({show: true});
      }

      if(status === 'wrong_user') {
        this.setState({show: true});
      }


      if(status > 0) {
        localStorage.setItem('id', status);
        this.props.history.push("/")
      }
      
    });
  }
  }



  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
          <div className="content">
            <div className="image">
              <img src={loginImg} alt="loginImg" />
            </div>
            <div className="form">
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
          <SweetAlert
            type="error"
            show={this.state.show}
            title="Email or password incorrect"
            onConfirm={() => this.setState({ show: false })}
            onEscapeKey={() => this.setState({ show: false })}
            onOutsideClick={() => this.setState({ show: false })}
          />
          <div className="footer">
            <button className="btn" onClick={this.handleLogin}>
              Login
            </button>
          </div>
      </div>
    );
  }
}

export default withRouter(Login);