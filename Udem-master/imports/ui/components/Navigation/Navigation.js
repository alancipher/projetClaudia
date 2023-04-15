import './Navigation.scss';

import AppBar from '@material-ui/core/AppBar';
import AuthenticatedNavigation from '../AuthenticatedNavigation/AuthenticatedNavigation';
import AuthentificatedPopup from '../AuthenticatedNavigation/AuthentificatedPopup';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PublicNavigation from '../PublicNavigation/PublicNavigation';
import PublicNavigationPopup from '../PublicNavigation/PublicNavigationPopup';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { addSessionCase } from '../../store/actions';

const styles = {
    root: {
        flexGrow: 1,
        color: '#ffffff',
    },
    flex: {
        flex: 1,
    },
    title: {
        width: 100,
        height: 'auto',
    },
    appbar: {

    },

};
//<div style={Styles.title}><img src="img/aeemum.png"  alt="AEEMUM" /></div>
const Navigation = props => (


    <AppBar color="primary" style={styles.root} className={'nav'} position={'sticky'}>
        <Toolbar>
            
            <Typography className='responsive-headline' variant="title" color="inherit" style={styles.flex}>
            <Link to="/"><img
                     src="img/aeemum2.png"
                     alt="AEEMUM"
                        /></Link>
            </Typography>
            

            <div className="mobile">
                {
                    !props.authenticated ? <PublicNavigationPopup {...props}/> :
                    <AuthentificatedPopup {...props}/>
                }
            </div>
            <div className="desktop">
                {
                    !props.authenticated ? <PublicNavigation {...props}/> :
                    <AuthenticatedNavigation {...props} /> 
                }
            </div>
                 
            
        </Toolbar>
    
    </AppBar>


    )
;

Navigation.defaultProps = {
    name: '',
};

Navigation.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    name: PropTypes.string,
};

export default Navigation;
