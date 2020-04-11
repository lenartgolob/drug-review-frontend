import React from "react";
import loginImg from "../../login.svg";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal)

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleRegistration = this.handleRegistration.bind(this);
    this.handleEmailTaken = this.handleEmailTaken.bind(this);
    this.keyPress = this.keyPress.bind(this);

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
  
  //   keyPress(e){
  //     if(e.keyCode === 13){
  //       var emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email);
  //       if(this.state.name === "" || this.state.lastname === "" || this.state.email === "" || this.state.password === "") {
  //         MySwal.fire({
  //           icon: 'error',
  //           title: 'All fields are required!',
  //         })
  //       }
  //       else if (this.state.password.length < 6) {
  //         MySwal.fire({
  //           icon: 'error',
  //           title: 'Password has to have atleast 6 characters!',
  //         })
  //       }
  //       else if (emailValidation === false) {
  //         MySwal.fire({
  //           icon: 'error',
  //           title: 'Invalid email!',
  //         })
  //       }
  //       else {
  //       fetch('http://localhost:5000/user/new',{
  //         method: 'POST',
  //         headers: {"Content-Type": "application/json"},
  //         body: JSON.stringify({
  //           name: this.state.name,
  //           lastname: this.state.lastname,
  //           email: this.state.email,
  //           password: this.state.password
  //         })
  //       })
  //       .then(res => res.json())
  //       .then(rows => (rows === false) ? this.handleEmailTaken(rows) : window.location.reload());
  //     }
  
  //     }
  //  }

  handleRegistration() {
    var emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email);
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
    }
    else if (emailValidation === false) {
      MySwal.fire({
        icon: 'error',
        title: 'Invalid email!',
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
    .then(rows => (rows === false) ? this.handleEmailTaken(rows) : window.location.reload());
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
              <input type="text" name="name" placeholder="First name" onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="namme">Last name</label>
              <input type="text" name="lastname" placeholder="Last name" onChange={this.handleChange} />
            </div>
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
