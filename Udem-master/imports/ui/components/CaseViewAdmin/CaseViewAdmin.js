import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import { List, ListItem } from "material-ui/List";

import Cases from "../../../api/Cases/Cases";
import { ControlLabel } from "react-bootstrap";
import DoctorContext from "../../pages/Session/doctorContext";
import FileUpload from "@material-ui/icons/FileUpload";
import FlatButton from "material-ui/FlatButton";
import Grid from "@material-ui/core/Grid";
import { Meteor } from "meteor/meteor";
import Paper from "@material-ui/core/Paper";
import PatientContext from "../../pages/Session/patientContext";
import PropTypes from "prop-types";
import React from "react";
import Revision from "../../pages/Session/Revision";
import Typography from "@material-ui/core/Typography";
import { withTracker } from "meteor/react-meteor-data";

const styles = {
  paper: {
    width: "100%",
    margin: "5vh 0vh 5vh 0vh"
  },
  paper1: {
    width: "100%",
    margin: "0vh 0vh 5vh 0vh"
  },
  list: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%"
  },
  listHeader: {
    width: "100%"
  },
  listItem: {
    width: "100%"
  },
  nestedStyle: {
    display: "inline"
  }
};

// FIXME ready for styling

const CaseViewAdmin = ({ sessionCase, history, loading, ...props }) => (
  <div>
    {!loading ? (
      <div>
        <Paper className={styles.paper} align={"center"}>
          <div className={"padding4"}>
            <Typography variant="title" align="left">
              Nom:&nbsp;&nbsp;
              <span className="prop-info">
                {this.props.sessionCase.gabarit.nom} ,{" "}
                {this.props.sessionCase.gabarit.age} ans{" "}
              </span>
            </Typography>
            <Typography variant="title" align="left">
              Raison de consultation:&nbsp;&nbsp;
              <span className="prop-info">
                {this.props.sessionCase.gabarit.reason}{" "}
              </span>
            </Typography>
            <Typography variant="title" align="left">
              Niveau de difficulté:&nbsp;&nbsp;
              <span className="prop-info">
                {this.props.sessionCase.gabarit.niveau}
              </span>
            </Typography>

            <br />

            <Typography align="left">
              {this.props.sessionCase.gabarit.studentContext}
            </Typography>

            <br />
            <Typography variant="title" align="left">
              Durée de la station: &nbsp;&nbsp;&nbsp;&nbsp;
              {this.props.sessionTime}
            </Typography>
          </div>
        </Paper>
        <Revision sessionCase={props.sessionCase} {...props} />
      </div>
    ) : (
      ""
    )}
  </div>
);

//Props
CaseViewAdmin.propTypes = {
  sessionCase: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe("cases.view.admin", documentId);

  console.log(match.params._id);
  console.log(Cases.findOne(documentId));
  return {
    loading: !subscription.ready(),
    sessionCase: Cases.findOne(documentId)
  };
})(CaseViewAdmin);
