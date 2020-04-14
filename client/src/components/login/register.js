import React from "react";
import loginImg from "../../login.svg";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal)

class Register extends React.Component {
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
        password: "",
      })
    }
    else {
    fetch('https://drug-review-backend.herokuapp.com/user/new',{
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
              <label htmlFor="namme">First name</label>
              <input type="text" value={this.state.name} name="name" placeholder="First name" onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="namme">Last name</label>
              <input type="text" value={this.state.lastname} name="lastname" placeholder="Last name" onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" value={this.state.email} placeholder="email" onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" value={this.state.password} placeholder="password" onChange={this.handleChange} onKeyDown={this.keyPress} />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" style={{background: "#4A7EBB"}} className="btn" onClick={this.handleRegistration}>
            Register
          </button>
        </div>
      </div>
    );
  }
}

export default Register;
