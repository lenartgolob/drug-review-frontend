import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import './components.scss';

const styles = {
  root: {
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    // display: "none"
  }
};


class NavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.Login = this.Login.bind(this);
    this.Logout = this.Logout.bind(this);


    this.state = {
        anchorEl: null,
        auth: true,
    };
  }

  handleChange = (event) => {
    this.setState({
        auth: event.target.checked
      });
  };

  handleMenu = (event) => {
    this.setState({
        anchorEl: event.currentTarget
      });
  };

  handleClose = () => {
    this.setState({
        anchorEl: null,
      });  
  }

  handleLogout = () => {
    localStorage.clear();
    this.setState({	  
      anchorEl: null,
    });	
    window.location.replace("/");
  };

  Logout() {
    return <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <Avatar style={{backgroundColor: localStorage.getItem("avatar_color"), color: localStorage.getItem("avatar_font_color")}}><span className="navAvatar">{localStorage.getItem("initials")}</span></Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleClose}
                style={{marginTop: "42px"}}
              >
                <a href="/user/profile"><MenuItem>Profile</MenuItem></a>
              <a href="/user/reviews"><MenuItem>My reviews</MenuItem></a>
                {(localStorage.getItem("admin") === "true") ? <a href="/all/reviews"><MenuItem>All reviews</MenuItem></a> : null}
                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
              </Menu>
          </div>;
  }

  Login() {
    if(this.props.hide) {
      return null;
    }
    else {
    return <Button onClick={this.handleLogin} variant="contained" size="small" href="/login">Login</Button>;
    }
  }

  isLoggedIn() {
    if (localStorage.getItem("id") == null) {
      return <this.Login />;
    }
    else {
      return <this.Logout />;
    }
  }

  render() {
    const { classes } = this.props;

    return (
        <div className="root">
        <AppBar classes={{ root: classes.root }} position="static">
          <Toolbar>
            <IconButton href="/" edge="start" color="inherit" aria-label="menu" className="menuButton">
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" className="navTitle">
              Drug Review
            </Typography>
            <this.isLoggedIn />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(NavMenu)