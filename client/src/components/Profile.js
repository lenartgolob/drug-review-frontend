import React from "react";
import Box from '@material-ui/core/Box';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

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
      MySwal.fire({
        icon: 'success',
        title: 'Profile successfuly updated!',
      })

        this.setState({
        password: ""
        });
    }
    else if (response === "wrong_pass") {
        MySwal.fire({
          icon: 'error',
          title: 'Wrong password!',
        })
        this.setState({
            password: ""
            });
    }
    else if (response === false) {
      MySwal.fire({
        icon: 'error',
        title: 'That email is already taken!',
      })
        this.setState({
            password: ""
      });
    }
    else if(response === "wrong_type") {
      MySwal.fire({
        icon: 'error',
        title: 'Invalid email!',
      })
      this.setState({
        password: ""
      })
    }
    }

   handleProfile() {
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
        <div className="header headerProfile">Edit profile</div>
        <div className="content profileContent">
          <div className="form">
            <div className="form-group form-groupFrom">
              <label htmlFor="namme">First name</label>
              <input type="text" value={this.state.name} name="name" placeholder="First name" onChange={this.handleChange} />
            </div>
            <div className="form-group form-groupFrom">
              <label htmlFor="namme">Last name</label>
              <input type="text" value={this.state.lastname} name="lastname" placeholder="Last name" onChange={this.handleChange} />
            </div>
            <div className="form-group form-groupFrom">
              <label htmlFor="email">Email</label>
              <input type="email" value={this.state.email} name="email" placeholder="email" onChange={this.handleChange} />
            </div>
            <div className="form-group form-groupFrom">
              <label htmlFor="password">Password <span className="confirmPassword">(To confirm changes enter your password)</span></label>
              <input type="password" value={this.state.password} name="password" placeholder="password" onChange={this.handleChange} onKeyDown={this.keyPress} />
            </div>
          </div>
        </div>
        <div>
          <button type="button" style={{background: "#4A7EBB", marginTop: 20}} className="btn btnProfile" onClick={this.handleProfile}>
            Save changes
          </button>
        </div>
          </Box>
      </div>
    );
  }
}

export default Profile;