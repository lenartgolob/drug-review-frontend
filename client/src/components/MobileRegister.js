import React from "react";
import Swal from 'sweetalert2';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import withReactContent from 'sweetalert2-react-content';
import NavMenu from "./NavMenu";

const MySwal = withReactContent(Swal)

class MobileRegister extends React.Component {
  constructor(props) {
    super(props);
    this.handleRegistration = this.handleRegistration.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.state = {
      email: '',
      password: '',
      name: '',
      lastname: '',
      rows: [],
    }
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleEmailTaken(rows) {
    MySwal.fire({
      icon: 'error',
      title: 'Email is already taken!',
    })
    }

    handleRegistration() {
      if(this.state.name === "" || this.state.lastname === "" || this.state.email === "" || this.state.password === "") {
        MySwal.fire({
          icon: 'error',
          title: 'All fields are required!',
        })
      }
      else if (this.state.password.length < 6) {
        MySwal.fire({
          icon: 'error',
          title: 'Password has to have atleast 6 characters!',
        })
        this.setState({
          password: ""
        })
      }
      else {
      fetch('http://localhost:5000/user/new',{
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          name: this.state.name,
          lastname: this.state.lastname,
          email: this.state.email,
          password: this.state.password
        })
      })
      .then(res => res.json())
      .then(response => this.handleResponse(response));
    }
    }

    handleResponse(response) {
      if(response === false) {
        MySwal.fire({
          icon: 'error',
          title: 'Email is already taken!',
        })
        this.setState({
          email: "",
          password: ""
        })
      }
      else if(response === "wrong_type") {
        MySwal.fire({
          icon: 'error',
          title: 'Invalid email!',
        })
        this.setState({
          email: "",
          password: ""
        })
      }
      else {
        window.location.reload()
      }
    }

  render() {
    return (
      <div className="container">
        <NavMenu />
        <div className="base-container" ref={this.props.containerRef}>
          <Box className="loginBox" boxShadow={4}>
            <div className="header">Register</div>
            <div className="content">
              <div className="form">
                <div className="form-group">
                  <label htmlFor="namme">First name</label>
                  <input type="text" name="name" value={this.state.name} placeholder="First name" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="namme">Last name</label>
                  <input type="text" name="lastname" value={this.state.lastname} placeholder="Last name" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} onKeyDown={this.keyPress} />
                </div>
              </div>
            </div>
            <div className="footer">
              <button type="button" style={{background: "#4A7EBB"}} className="btn" onClick={this.handleRegistration}>
                Register
              </button><br /><br />
              <Link href="/login">Login here</Link>
            </div>
          </Box>
        </div>
      </div>
    );
  }
}

export default MobileRegister;
