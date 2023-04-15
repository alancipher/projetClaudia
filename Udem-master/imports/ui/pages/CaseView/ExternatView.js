import { monthDayYearAtTime, timeago } from "../../../modules/dates";

import { Alert } from "react-bootstrap";
import { Bert } from "meteor/themeteorchef:bert";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import ExternatDocuments from "../../../api/ExternatDocuments/ExternatDocuments";
import ExternatsGeriatry from "../../../api/Externats/ExternatsGeriatry";
import ExternatsPsycho from "../../../api/Externats/ExternatsPsycho";
import ExternatsSurgery from "../../../api/Externats/ExternatsSurgery";
import Grid from "@material-ui/core/Grid";
import Loading from "../../components/Loading/Loading";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import React from "react";
import Search from "../../components/Search/Search";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { withTracker } from "meteor/react-meteor-data";

// import SearchField from './searchfield';

//this is the page where they see all the psychCases and can query through them

const styles = {
  root: {
    flexGrow: 1,
    flex: 1,
    alignItems: "center"
  },
  flex: {
    flex: 1
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

const setCaseId = id => {
  //   this function calls the dispatcher for the case atribute of the caseId state variable
};

const CaseView = ({
  loading,
  psychCases,
  geriatryCases,
  surgeryCases,
  sessions,
  systemeArray,
  searchArray,
  match,
  history,
  ...props
}) =>
  !loading ? (
    <div className="Externats">
      <div style={styles.header} className={"page-header"}>
        <h3 className="pull-left">Externats</h3>
      </div>
      <br />  
      <div align="left"  className={"page-header"} style={styles.flex}>
        <h4 >Psychiatrie</h4>
      </div>
      <div align="left"> 
      {psychCases.map(({ _id, gabarit ,...caseDoc}, index) => (
        <div key={_id} className="case-card">
          <Card>
            <CardContent>
              <Typography style={styles.title} color="primary">
                {gabarit.nom} , {gabarit.age} ans
              </Typography>
              <Typography style={styles.title} color="secondary">
                {gabarit.reason}
              </Typography>
            </CardContent>

            <div>
              {sessions.filter(function(sessionCase) {
                return sessionCase.caseId == _id;
              }).length > 0 ? (
                <div className="case-card-action">
                  <Button
                    size="small"
                    color={"primary"}
                    onClick={() => {
                      history.push(
                        `/externat-revue/psychiatrie/${
                          sessions.filter(function(sessionCase) {
                            return sessionCase.caseId == _id;
                          })[0]._id
                        }`
                      );
                    }}
                  >
                    Resultat
                  </Button>
                  <Button
                    size="small"
                    color={"secondary"}
                    onClick={() => {
                      props.onSessionCaseAdded(caseDoc);
                      props.onSetSessionPage(1);
                      console.log("session page is :" + props.sessionPage);
                      history.push(`/externat/psychiatrie/${_id}`);
                    }}
                  >
                    Refaire le cas
                  </Button>
                </div>
              ) : (
                <Button
                  size="small"
                  color={"secondary"}
                  onClick={() => {
                    props.onSessionCaseAdded(caseDoc);
                    props.onSetSessionPage(1);
                    console.log("session page is :" + props.sessionPage);
                    history.push(`/externat/psychiatrie/${_id}`);
                  }}
                >
                  Faire le cas
                </Button>
              )}
            </div>
          </Card>
        </div>
      ))}
      </div>
      <br />  
      <div align="left" className={"page-header"} style={styles.flex}>
        <h4  >Gériatrie</h4>
      </div>
      <div align="left"> 
      {geriatryCases.map(({ _id, gabarit ,...caseDoc}, index) => (
        <div key={_id} className="case-card">
          <Card>
            <CardContent>
              <Typography style={styles.title} color="primary">
                {gabarit.nom} , {gabarit.age} ans
              </Typography>
              <Typography style={styles.title} color="secondary">
                {gabarit.reason}
              </Typography>
            </CardContent>

            <div>
              {sessions.filter(function(sessionCase) {
                return sessionCase.caseId == _id;
              }).length > 0 ? (
                <div className="case-card-action">
                  <Button
                    size="small"
                    color={"primary"}
                    onClick={() => {
                      history.push(
                        `/externat-revue/gériatrie/${
                          sessions.filter(function(sessionCase) {
                            return sessionCase.caseId == _id;
                          })[0]._id
                        }`
                      );
                    }}
                  >
                    Resultat
                  </Button>
                  <Button
                    size="small"
                    color={"secondary"}
                    onClick={() => {
                      props.onSessionCaseAdded(caseDoc);
                      props.onSetSessionPage(1);
                      console.log("session page is :" + props.sessionPage);
                      history.push(`/externat/gériatrie/${_id}`);
                    }}
                  >
                    Refaire le cas
                  </Button>
                </div>
              ) : (
                <Button
                  size="small"
                  color={"secondary"}
                  onClick={() => {
                    props.onSessionCaseAdded(caseDoc);
                    props.onSetSessionPage(1);
                    console.log("session page is :" + props.sessionPage);
                    history.push(`/externat/gériatrie/${_id}`);
                  }}
                >
                  Faire le cas
                </Button>
              )}
            </div>
          </Card>
        </div>
      ))}
      </div>
      <br />  
      <div align="left" className={"page-header"} style={styles.flex}>
        <h4 >Chirurgie</h4>
      </div>
      <div  align="left"> 
      {surgeryCases.map(({ _id, gabarit,...caseDoc }, index) => (
        <div key={_id} className="case-card">
          <Card>
            <CardContent>
              <Typography style={styles.title} color="primary">
                {gabarit.nom} , {gabarit.age} ans
              </Typography>
              <Typography style={styles.title} color="secondary">
                {gabarit.reason}
              </Typography>
            </CardContent>

            <div>
              {sessions.filter(function(sessionCase) {
                return sessionCase.caseId == _id;
              }).length > 0 ? (
                <div className="case-card-action">
                  <Button
                    size="small"
                    color={"primary"}
                    onClick={() => {
                      history.push(
                        `/externat-revue/chirurgie/${
                          sessions.filter(function(sessionCase) {
                            return sessionCase.caseId == _id;
                          })[0]._id
                        }`
                      );
                    }}
                  >
                    Resultat
                  </Button>
                  <Button
                    size="small"
                    color={"secondary"}
                    onClick={() => {
                      props.onSessionCaseAdded(caseDoc);
                      props.onSetSessionPage(1);
                      console.log("session page is :" + props.sessionPage);
                      history.push(`/externat/chirurgie/${_id}`);
                    }}
                  >
                    Refaire le cas
                  </Button>
                </div>
              ) : (
                <Button
                  size="small"
                  color={"secondary"}
                  onClick={() => {
                    props.onSessionCaseAdded(caseDoc);
                    props.onSetSessionPage(1);
                    console.log("session page is :" + props.sessionPage);
                    history.push(`/externat/chirurgie/${_id}`);
                  }}
                >
                  Faire le cas
                </Button>
              )}
            </div>
          </Card>
        </div>
      ))}
      </div>
    </div>
  ) : (
    <Loading />
  );

CaseView.propTypes = {
  loading: PropTypes.bool.isRequired,
  psychCases: PropTypes.arrayOf(PropTypes.object).isRequired,
  geriatryCases: PropTypes.arrayOf(PropTypes.object).isRequired,
  surgeryCases: PropTypes.arrayOf(PropTypes.object).isRequired,
  sessions: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withTracker(() => {
  const subscription1 = Meteor.subscribe("externatsGeriatry.posted");
  const subscription2 = Meteor.subscribe("externatsSurgery.posted");
  const subscription3 = Meteor.subscribe("externatsPsycho.posted");
  const subscription4 = Meteor.subscribe("externats-documents");

  return {
    loading:
      !subscription1.ready() &&
      !subscription2.ready() &&
      !subscription3.ready() &&
      !subscription4.ready(),
    psychCases: ExternatsPsycho.find().fetch(),
    geriatryCases: ExternatsGeriatry.find().fetch(),
    surgeryCases: ExternatsSurgery.find().fetch(),
    sessions: ExternatDocuments.find().fetch()
  };
})(CaseView);
