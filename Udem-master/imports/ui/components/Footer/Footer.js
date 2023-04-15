import './Footer.scss';

import { Grid } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React from 'react';
import { year } from '../../../modules/dates';

const copyrightYear = () => {
  const currentYear = year();
  return currentYear === '2018' ? '2018' : `2018-${currentYear}`;
};

const Footer = () => (
  <div className="Footer">
    <Grid>
      <p style={{textAlign: 'center', fontSize: '12px'}}>AEEMUM &copy; Août {copyrightYear()}  <br/>
      Développé par <a href={"https://www.linkedin.com/in/joycava/"} >Mugisha Kakou</a> et <a href={"https://www.linkedin.com/in/christinathaonguyen/"} >Christina Nguyen</a></p>
      
    </Grid>
  </div>
);

Footer.propTypes = {};


/* <ul className="pull-right">
        <li><Link to="/terms">Termes<span className="hidden-xs"> et Conditions</span></Link></li>
        <li><Link to="/privacy">Politique<span className="hidden-xs"> de Confidentialité</span></Link></li>
      </ul> */

export default Footer;
