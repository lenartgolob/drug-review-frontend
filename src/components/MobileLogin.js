import React from "react";
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Redirect } from 'react-router';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import './components.scss';

const MySwal = withReactContent(Swal)

export class MobileLogin extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.keyPress = this.keyPress.bind(this);

    this.state = {
      id: 0,
      email: '',
      password: '',
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
          MySwal.fire({
            icon: 'error',
            title: 'Password is incorrect!',
          })
          this.setState({
            password: ""
          })
        }
        else if(status === 'wrong_user') {
          MySwal.fire({
            icon: 'error',
            title: 'Account doesn\'t exist!',
          })
          this.setState({
            email: "",
            password: ""
          })
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

  handleLogin() {

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
        MySwal.fire({
          icon: 'error',
          title: 'Password is incorrect!',
        })
        this.setState({
          password: ""
        })
      }
      else if(status === 'wrong_user') {
        MySwal.fire({
          icon: 'error',
          title: 'Account doesn\'t exist!',
        })
        this.setState({
          email: "",
          password: ""
        })
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



  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/'/>;
    }
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <Box className="loginBox" boxShadow={4}>
            <div className="header">Login</div>
            <div className="content">
                <div className="form">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className="inputMobile" type="email" value={this.state.email} name="email" placeholder="email" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input className="inputMobile" type="password" name="password" value={this.state.password} placeholder="password" onChange={this.handleChange} onKeyDown={this.keyPress} />
                </div>
                </div>
            </div>
            <div className="footer">
                <button className="btn" style={{background: "#4A7EBB", marginBottom: 15}} onClick={this.handleLogin}>
                Login
                </button><br />
                <Link href="/register/mobile">Register here</Link>
            </div>
        </Box>
      </div>
    );
  }
}

export default withRouter(MobileLogin);