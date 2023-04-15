import './FAQ.scss';

import React, { Component } from 'react';

import HowToUse from '../../components/HowToUse/HowToUse';
import Typography from '@material-ui/core/Typography';

export default class FAQ extends Component {
  render() {
    return (
      <div className="FAQ-page">
        <h1>Foire aux questions</h1>
        <HowToUse/>
        <p className="question">Quel est notre but? </p>
     <p className="answer">Notre but est de vous permettre de pratiquer les stations ECOS de façon formative, de vous familiariser avec la structure systématique et de diminuer votre anxiété de performance. 
     <br/><br/>
     Bon succès! 
     </p>
      </div>
    )
  }
}
