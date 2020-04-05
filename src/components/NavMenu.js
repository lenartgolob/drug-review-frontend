import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import './components.css';

class NavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
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
        anchorEl: null
      });  
  };

  handleLogout = () => {
    this.setState({
        anchorEl: null
      });
    localStorage.clear();

  
  };

  render() {
    return (
        <div className="root">
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" className="menuButton">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className="navTitle">
              Photos
            </Typography>
            { localStorage.getItem("id") != null ? 
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
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
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My reviews</MenuItem>
                  <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
               : null}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default NavMenu;