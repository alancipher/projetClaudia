import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';
import {withRouter} from 'react-router-dom';

const text = {
    color: '#ffffff',
    flexGrow: 1,
    fontSize: '2vh',
    padding: '2vh',
};

const styles = {
    root: {
        flexGrow: 1,
        display: 'flex',
    },
    flex: {
        flex: 1,
    },
};
// const state = {
//     anchorEl: null,
// };
//
// handleClick = event => {
//     this.setState({ anchorEl: event.currentTarget });
// };
//
// handleClose = () => {
//     this.setState({ anchorEl: null });
// };


const AuthenticatedNavigation = ({name, history,admin,editor,...prop}) => (

    <div style={styles.root}>
        <Button  onClick={() => history.push('/')} style={text} className="navitems" >Accueil</Button>
        <Button  onClick={() => history.push('/profile')} style={text} className="navitems" >Profil </Button>
        <Button  onClick={() => history.push('/viewcases')} style={text} className="navitems" >Cas cliniques</Button>
        <Button  onClick={() => history.push('/externats')} style={text} className="navitems" >Externats</Button>
        {editor ? <Button  onClick={() => history.push('/cases')} style={text} className="navitems" >Mes cas cliniques</Button>: ''}
        {admin ? <Button  onClick={() => history.push('/admin')} style={text} className="navitems" >Admin</Button>:''}
        <Button  onClick={() => history.push('/faq')} style={text} className="navitems" >FAQ</Button>
        <Button onClick={() => history.push('/logout')} style={text} className="navitems" >Déconnexion</Button>
    </div>

);

AuthenticatedNavigation.propTypes = {
    name: PropTypes.string,
    history: PropTypes.object.isRequired,
};

export default withRouter(AuthenticatedNavigation);
