import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import {withRouter} from 'react-router-dom';

class AuthentificatedPopup extends React.Component {
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
            <Link to='/' style={text} className="navitems" >Accueil</Link>
          </MenuItem>
          <MenuItem  onClick={this.handleClose}>
            <Link to='/profile' style={text} className="navitems" >Profil </Link>
          </MenuItem>
          <MenuItem  onClick={this.handleClose}>
            <Link  to='/viewcases'style={text} className="navitems" >Cas cliniques</Link>
          </MenuItem>
          <MenuItem  onClick={this.handleClose}>
            <Link  to='/externats'style={text} className="navitems" >Externats</Link>
          </MenuItem>
          {this.props.editor ? <MenuItem  onClick={this.handleClose}>
            <Link  to='/cases' style={text} className="navitems" >Mes cas cliniques</Link>
          </MenuItem> : ''}
          {console.log('editor: ' + this.props.editor)}
          {this.props.admin ? <MenuItem  onClick={this.handleClose}>
            <Link  to='/admin' style={text} className="navitems" >Admin</Link>
          </MenuItem> : ''}
          <MenuItem  onClick={this.handleClose}>
            <Link  to='/faq' style={text} className="navitems" >FAQ</Link>
          </MenuItem>
          <MenuItem  onClick={this.handleClose}>
            <Link to='/logout' style={text} className="navitems" >Déconnexion</Link>
          </MenuItem>
     
        
        </Menu>
      </div>
    );
  }
}

AuthentificatedPopup.propTypes = {
  name: PropTypes.string,
  history: PropTypes.object.isRequired,
};

export default withRouter(AuthentificatedPopup);