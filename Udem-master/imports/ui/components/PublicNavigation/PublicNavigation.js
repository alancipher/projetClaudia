import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import React from 'react';

const text = {
    color: '#ffffff',
    flex: 1,
    fontSize: '2vh',
    padding: '10px',
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

const PublicNavigation = () => (

    <div  style={styles.root}>
     <Link to={"/faq"}>
     <Button   style={text} className="noWrap" >FAQ</Button>
        </Link>
        <Link to={"/login"}>
        <Button className={'noWrap'} style={text} >Connexion</Button>
        </Link>
            <Link to={"/signup"}>
            <Button className={'noWrap'} style={text} >Inscription</Button>
            </Link>

            
    </div>
);

export default PublicNavigation;
