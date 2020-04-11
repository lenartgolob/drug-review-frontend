import React from "react";
import loginImg from "../../login.svg";
import { withRouter } from 'react-router-dom';
import SweetAlert from 'sweetalert2-react';
import { Redirect } from 'react-router';





export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.keyPress = this.keyPress.bind(this);

    this.state = {
      id: 0,
      email: '',
      password: '',
      show: false,
      redirect: false,
    }
  }



  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  keyPress(e){
    if(e.keyCode === 13){
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
        else {
          if(status.admin > 0) {
            localStorage.setItem('admin', true);
          }
          localStorage.setItem('id', status.id);
          localStorage.setItem('initials', status.initials);
          localStorage.setItem('avatar_color', status.avatar_color);
          localStorage.setItem('avatar_font_color', status.avatar_font_color);
          this.setState({ redirect: true });
        }
        
      });
    }

    }
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
      else {
        localStorage.setItem('id', status.id);
        localStorage.setItem('initials', status.initials);
        localStorage.setItem('avatar_color', status.avatar_color);
        localStorage.setItem('avatar_font_color', status.avatar_font_color);
        this.setState({ redirect: true });
      }
      
    });
  }
  }



  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/'/>;
    }
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
                <input type="password" name="password" placeholder="password" onChange={this.handleChange} onKeyDown={this.keyPress} />
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
            <button className="btn" style={{background: "#4A7EBB"}} onClick={this.handleLogin}>
              Login
            </button>
          </div>
      </div>
    );
  }
}

export default withRouter(Login);