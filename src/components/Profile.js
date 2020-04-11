import React from "react";
import SweetAlert from 'sweetalert2-react';
import Box from '@material-ui/core/Box';


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.handleUser = this.handleUser.bind(this);
    this.handleProfile = this.handleProfile.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.state = {
        name: "",
        lastname: "",
        email: "",
        password: "",
        show: false,
        alertMsg: "",
        alertType: "",
    };
  }

  componentDidMount() {
    fetch('http://localhost:5000/user/profile',{
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          id: localStorage.getItem("id")
        })
      })
      .then(res => res.json())
      .then(user => this.handleUser(user));
  }

  handleUser(user) {
    this.setState({
      name: user[0].name,
      lastname: user[0].lastname,
      email: user[0].email,
    })
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleResponse(response) {
    if(response === true) {
        this.setState({
        show: true, 
        alertMsg: "Profile successfuly updated!",
        alertType: "success",
        password: ""
        });
    }
    else if (response === "wrong_pass") {
        this.setState({
            show: true, 
            alertMsg: "Wrong password!",
            alertType: "error",
            password: ""
            });
    }
    else if (response === false) {
        this.setState({
            show: true, 
            alertMsg: "That email is already taken!",
            alertType: "error",
            password: ""
            });
    }
    }
  
    keyPress(e){
      if(e.keyCode === 13){
        var emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email);
        if(this.state.name === "" && this.state.lastname === "" && this.state.email === "" && this.state.password === "") {
          this.setState({
            show: true,
            alertMsg: "All fields are required!",
            alertType: "error",
          });
        }
        else if (this.state.password.length < 6) {
          this.setState({
            show: true,
            alertMsg: "Password has to have atleast 6 characters!",
            alertType: "error",
          });
        }
        else if (emailValidation === false) {
          this.setState({
            show: true,
            alertMsg: "Invalid email!",
            alertType: "error",
          });
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
   }

   handleProfile() {
    var emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email);
    if(this.state.name === "" && this.state.lastname === "" && this.state.email === "" && this.state.password === "") {
      this.setState({
        show: true,
        alertMsg: "All fields are required!"
      });
    }
    else if (this.state.password.length < 6) {
      this.setState({
        show: true,
        alertMsg: "Password has to have atleast 6 characters!",
        alertType: "error",
      });
    }
    else if (emailValidation === false) {
      this.setState({
        show: true,
        alertMsg: "Invalid email!",
        alertType: "error",
      });
    }
    else {
    fetch('http://localhost:5000/user/profile/edit',{
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        id: localStorage.getItem("id"),
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
    <div className="base-container">
        <Box className="profileBox" boxShadow={4}>
        <div className="header">Edit profile</div>
        <div className="content">
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
              <input type="email" value={this.state.email} name="email" placeholder="email" onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password <span style={{fontSize: "50%"}}>(To confirm changes enter your password)</span></label>
              <input type="password" value={this.state.password} name="password" placeholder="password" onChange={this.handleChange} onKeyDown={this.keyPress} />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" style={{background: "#4A7EBB"}} className="btn" onClick={this.handleProfile}>
            Save changes
          </button>
        </div>
        <SweetAlert
            type={this.state.alertType}
            show={this.state.show}
            title={this.state.alertMsg}
            onConfirm={() => this.setState({ show: false })}
            onEscapeKey={() => this.setState({ show: false })}
            onOutsideClick={() => this.setState({ show: false })}
          />
          </Box>
      </div>
    );
  }
}

export default Profile;