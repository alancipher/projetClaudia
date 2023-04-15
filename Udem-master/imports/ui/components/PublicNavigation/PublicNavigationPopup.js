import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';

class PublicNavigationPopup extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const text = {
      flexGrow: 1,
      fontSize: '2vh',
      padding: '2vh',
    };

    return (
      <div>

        <IconButton
          aria-label="More"
          aria-owns={anchorEl ? 'long-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>
            <Link to={"/faq"}>
              <Typography style={text} className="navitems" >FAQ</Typography>
            </Link>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <Link to={"/login"} style={text} className="navitems" >Connexion</Link>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <Link to={"/signup"} style={text} className="navitems" >Inscription</Link>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

PublicNavigationPopup.propTypes = {
  name: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(PublicNavigationPopup);