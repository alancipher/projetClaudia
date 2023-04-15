import React, { Component } from 'react'

import AppBar from '@material-ui/core/AppBar';
import CasesCollection from '../../../api/Cases/Cases';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Loading from '../../components/Loading/Loading';
import MenuItem from '@material-ui/core/MenuItem';
import { Meteor } from 'meteor/meteor';
import NotAuthorized from '../../components/AdminDashboard/NotAuthorized';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types'
import Revision from '../../pages/Session/Revision';
import Select from '@material-ui/core/Select';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withTracker } from 'meteor/react-meteor-data';

const styles = theme => ({
  root: {
      flexGrow: 1,
      height: 100,
  },
  tabRoot: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
  formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
  },
  selectEmpty: {
      marginTop: theme.spacing.unit * 2,
  },
  paper: {
      padding: theme.spacing.unit * 3,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      flex: 1,
  },
  formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
  },
  selectEmpty: {
      marginTop: theme.spacing.unit * 2,
  },
  button: {
      margin: theme.spacing.unit,
  },
  visible: {
      // visibility: 'visible',
  },
  hidden: {
      display: 'none',
  }
});

// FIXME READY FOR FINAL STYLING 

function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }
  
  TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
class AdminEditCase extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }
  state = {
    value: 0,
   newCase: this.props.sessionCase
    
  };
  constructor(props){
    super(props);
    
 
}


  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeForm = ( event ,cat , name) => {

    var doc = this.state.newCase;
    doc[cat][name]=event.target.value;
    console.log(doc[cat][name]);
    this.setState({newCase:doc});
  };

  handleChangeFormText = (event, cat , name) => {

    var doc = this.state.newCase;
    doc[cat][name][text]=event.target.value;
    this.setState({newCase:doc});
  };

  
componentDidMount = () => {
  
    console.log(this.props.sessionCase);

}
  
  render() {
    //   const props = this.props;
      const { classes ,sessionCase ,loading} = this.props;
      const { value, newCase } = this.state;
      if(this.props.admin){
    return ( !loading ?
      <div className={classes.root}>
          <h3>Modifier le cas cliniques</h3>
          <div className={classes.tabRoot}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="auto"
          >
            <Tab label="Gabarit" />
            <Tab label="Introduction" />
            <Tab label="Antécédants" />
            <Tab label="Habitus" />
            <Tab label="HMA" />
            <Tab label="Symptômes" />
            <Tab label="PICA et medication" />
            <Tab label="Questions additionelles" />
          </Tabs>
        </AppBar>
        <form className={classes.container} noValidate autoComplete="off">
        {value === 0 && 
        <TabContainer>
            <h5>Information sur le cas clinique</h5>

            <TextField
          id="name"
          label="Nom"
          className={classes.textField}
          value={newCase.gabarit.nom}
          onChange={(e)=>{this.handleChangeForm(e,'gabarit','nom')}}
          margin="normal"
        />
           <TextField
          id="age"
          label="Âge"
          className={classes.textField}
          value={newCase.gabarit.nom}
          onChange={(e)=>{this.handleChangeForm(e,'gabarit','age')}}
          margin="normal"
        />
          <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-simple">Sexe</InputLabel>
          <Select
            value={newCase.gabarit.sexe}
            onChange={(e)=>{this.handleChangeForm(e,'gabarit','sexe')}}
            inputProps={{
              name: 'sexe',
              id: 'sexe',
            }}
          >
           
            <MenuItem value={"Masculin"}>Masculin</MenuItem>
            <MenuItem value={"Féminin"}>Féminin</MenuItem>
           
          </Select>
        </FormControl>

        <TextField
          id="occupation"
          label="Occupation"
          className={classes.textField}
          value={newCase.gabarit.ageAndOcc}
          onChange={(e)=>{this.handleChangeForm(e,'intro','ageAndOcc')}}
          margin="normal"
        />

         <Select
            value={newCase.gabarit.niveau}
            onChange={(e)=>{this.handleChangeForm(e,'gabarit','niveau')}}
            inputProps={{
              name: 'niveau',
              id: 'niveau',
            }}
          >
           
            <MenuItem value={"Facile"}>Facile</MenuItem>
            <MenuItem value={"Moyen"}>Moyen</MenuItem>
            <MenuItem value={"Difficile"}>Difficile</MenuItem>
           
          </Select>
          <Select
          value={newCase.gabarit.stationTime}
            onChange={(e)=>{this.handleChangeForm(e,'gabarit','stationTime')}}
            inputProps={{
              name: 'stationTime',
              id: 'stationTime',
            }}
          >
           
            <MenuItem value={"6 minutes"}>6 minutes</MenuItem>
            <MenuItem value={"8 minutes"}>8 minutes</MenuItem>
            <MenuItem value={"10 minutes"}>10 minutes</MenuItem>
            <MenuItem value={"12 minutes"}>12 minutes</MenuItem>
           
          </Select>
          <TextField
          id="reason"
          label="reason"
          className={classes.textField}
          value={newCase.gabarit.reason}
          onChange={(e)=>{this.handleChangeForm(e,'gabarit','reason')}}
          margin="normal"
        />
         <TextField
          id="consultationReason2"
          label="Raison de consultation secondaire"
          className={classes.textField}
          value={newCase.gabarit.consultationReason2}
          onChange={(e)=>{this.handleChangeForm(e,'intro','consultationReason2')}}
          margin="normal"
        />
         <TextField
          id="studentContext"
          label="Mise en contexte de l'étudiant"
          className={classes.textField}
          value={newCase.gabarit.studentContext}
          onChange={(e)=>{this.handleChangeForm(e,'gabarit','studentContext')}}
          margin="normal"
          fullwidth
        />

        <TextField
          id="doctorContext"
          label="Mise en contexte du docteur"
          className={classes.textField}
          value={newCase.gabarit.doctorContext}
          onChange={(e)=>{this.handleChangeForm(e,'gabarit','doctorContext')}}
          margin="normal"
          fullwidth
        />
        
        
        </TabContainer>}
        {value === 1 && 
        <TabContainer>
               <h5>Antécédents médicaux</h5>
               <TextField
          id="personal"
          label="Personnels"
          className={classes.textField}
          value={newCase.antecedents.personal}
          onChange={(e)=>{this.handleChangeForm(e,'antecedents','personal')}}
          margin="normal"
          fullWidth
        />
               <TextField
          id="surgeries"
          label="Chirurgies"
          className={classes.textField}
          value={newCase.antecedents.surgeries}
          onChange={(e)=>{this.handleChangeForm(e,'antecedents','surgeries')}}
          margin="normal"
          fullWidth
        />
          <TextField
          id="psy"
          label="Psychiatrique"
          className={classes.textField}
          value={newCase.antecedents.psy}
          onChange={(e)=>{this.handleChangeForm(e,'antecedents','psy')}}
          margin="normal"
          fullWidth
        />

          <TextField
          id="gyn"
          label="Gynecologique/"
          className={classes.textField}
          value={newCase.antecedents.gyn}
          onChange={(e)=>{this.handleChangeForm(e,'antecedents','gyn')}}
          margin="normal"
          fullWidth
        />
        <TextField
          id="famHist"
          label="Familiaux"
          className={classes.textField}
          value={newCase.antecedents.famHist}
          onChange={(e)=>{this.handleChangeForm(e,'antecedents','famHist')}}
          margin="normal"
          fullWidth
        />
      
        <TextField
          id="allergies"
          label="Allergies"
          className={classes.textField}
          value={newCase.antecedents.allegies}
          onChange={(e)=>{this.handleChangeForm(e,'antecedents','allergies')}}
          margin="normal"
          fullWidth
        />



        </TabContainer>}
        {value === 2 && 
        <TabContainer>
            
        </TabContainer>}
        {value === 3 && 
        <TabContainer>Tab</TabContainer>}
        {value === 4 && 
       <TabContainer>Tab</TabContainer>}
        {value === 5 && 
       <TabContainer>Tab</TabContainer>}
        {value === 6 && 
        <TabContainer>Tab</TabContainer>}
        {value === 7 && 
      <TabContainer>Tab</TabContainer>}
        </form>
      </div>
      </div> : <Loading />
    )
}else {
    return (
        <NotAuthorized {...props}/>
    )
}
  }
}




const AdminEditCase2 = withStyles(styles)(AdminEditCase);

export default withTracker(({ match }) => {
    const documentId = match.params._id;
    const subscription = Meteor.subscribe('cases.view.admin', documentId);


    return {
        loading: !subscription.ready(),
        sessionCase: CasesCollection.findOne({ _id: documentId }),
        // sessions: Documents.find().fetch(),

    };
})(AdminEditCase2);

 