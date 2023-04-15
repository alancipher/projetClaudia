import React, { Component } from "react";
import { monthDayYearAtTime, timeago } from "../../../../modules/dates";

import Button from "@material-ui/core/Button";
import { ControlLabel } from "react-bootstrap";
import Externats from "../../../../api/Externats/ExternatsGeriatry";
import FileUpload from "@material-ui/icons/FileUpload";
import FlatButton from "material-ui/FlatButton";
import Grid from "@material-ui/core/Grid";
import Loading from "../../Loading/Loading";
import { Meteor } from "meteor/meteor";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import Revision from "./Revision";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
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


// GERIATRY


class CaseViewEditor extends Component {


  constructor(props) {
    super(props);

    // this.state = { admin: this.props.roles.includes("admin")};
  }
  render() {
    const props = this.props;
    const sessionCase = this.props.sessionCase;
    if (this.props.editor ) {
      //maing sure the user is an admin
      return !props.loading ? (
        <div>
          <Paper style={styles.paper} align={"center"}>
            <br />
            <h3>Externat - {this.props.sessionCase.type}</h3>
            <div className={"padding4"}>
              <Typography variant="title" align="left">
                Créer le :{" "}
                {monthDayYearAtTime(this.props.sessionCase.createdAt)}
              </Typography>
              <br />
              <Typography variant="title" align="left">
                Dernières modifications : il y a{" "}
                {timeago(this.props.sessionCase.updatedAt)}
              </Typography>
              <br />
              <Typography variant="title" align="left">
                Durée de la station:{" "}
                {this.props.sessionCase.gabarit.stationTime}
              </Typography>
              <br />
              <Typography variant="title" align="left">
                Nom:&nbsp;&nbsp;
                <span className="prop-info">
                  {this.props.sessionCase.gabarit.nom ? this.props.sessionCase.gabarit.nom : ''} ,{" "}
                  {this.props.sessionCase.gabarit.age ? this.props.sessionCase.gabarit.age : ''} ans{" "}
                </span>
              </Typography>
              <br />
              <Typography variant="title" align="left">
                Raison de consultation:&nbsp;&nbsp;
                <span className="prop-info">
                  {this.props.sessionCase.intro.q1 ? this.props.sessionCase.intro.q1.text : ''}{" "}
                </span>
              </Typography>
              <br />
              <Typography variant="title" align="left">
                Niveau de difficulté:&nbsp;&nbsp;
                <span className="prop-info">
                  {this.props.sessionCase.gabarit.niveau}
                </span>
              </Typography>

              <br />

              <Typography variant="title" align="left">
                Contexte pour l'étudiant:&nbsp;&nbsp;
                <span className="prop-info">
                  {this.props.sessionCase.intro.q3 ? this.props.sessionCase.intro.q3 : ''}
                </span>
              </Typography>
              <br />
              <Typography variant="title" align="left">
                Contexte pour le patient:&nbsp;&nbsp;
                <span className="prop-info">
                  {" "}
                  {this.props.sessionCase.intro.q4 ? this.props.sessionCase.intro.q4 : ''}
                </span>
              </Typography>

              <br />
            </div>
          </Paper>
          <br />
          <Paper>
            <h3>Questions Principales</h3>
            <Revision {...props} />
          </Paper>
          <br />

          <Paper style={styles.paper} align={"center"}>
            <br />
            <h3>Questions Suplémentaires</h3>
            <div className={"padding4"}>
              <Typography variant="title" align="left">
                Diagnostic principal:&nbsp;&nbsp;
                <span className="prop-info">
                  {sessionCase && sessionCase.additional && sessionCase.additional.q1 ? this.props.sessionCase.additional.q1.text : ''}{" "}
                </span>
              </Typography>
              <Typography variant="title" align="left">
                Diagnostic différentiel:&nbsp;&nbsp;
                <span className="prop-info">
                  {sessionCase && sessionCase.additional && sessionCase.additional.q2 ? this.props.sessionCase.additional.q2.text : ''}{" "}
                </span>
              </Typography>
              <br />
              {sessionCase && sessionCase.additional && sessionCase.additional.q3 ? <div> <Typography variant="title" align="left">
                Question Supplémentaire 1:&nbsp;&nbsp;
                <span className="prop-info">
                  {this.props.sessionCase.additional.q3 ? this.props.sessionCase.additional.q3.question : ''}
                </span>
              </Typography>
                <br />
                <Typography variant="title" align="left">
                  Réponse 1:&nbsp;&nbsp;
                <span className="prop-info">
                    {this.props.sessionCase.additional.q3.reponse ? this.props.sessionCase.additional.q3.reponse : ''}
                  </span>
                </Typography> </div> : ''}

              <br />

              {sessionCase && sessionCase.additional && sessionCase.additional.q4 ?
                <div><Typography variant="title" align="left">
                  Question Supplémentaire 2:&nbsp;&nbsp;
                <span className="prop-info">
                    {this.props.sessionCase.additional.q4.question ? this.props.sessionCase.additional.q4.question : ''}
                  </span>
                </Typography>
                  <br />
                  <Typography variant="title" align="left">
                    Réponse 2:&nbsp;&nbsp;
                <span className="prop-info">
                      {this.props.sessionCase.additional.q4.reponse ? this.props.sessionCase.additional.q4.reponse : ''}
                    </span>
                  </Typography> </div> : ''}

              <br />
            </div>
          </Paper>
          <br />
          <div className={"admin-view-case-button-container"}>
            <Button
              variant="contained"
              color="secondary"
              onClick={e => {
                e.preventDefault();
                this.props.onSessionCaseAdded(this.props.sessionCase);
                this.props.history.push(
                  "/editCase-gériatrie/" + this.props.sessionCase._id
                );
              }}
            >
              Modifier le cas
            </Button>
            {this.props.admin && this.props.sessionCase.posted && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  swal(
                    "Publication",
                    "Êtes-vous sûr(e) de vouloir masquer le cas ?",
                    {
                      buttons: {
                        cancel: { text: "Non", closeModal: true },

                        oui: {
                          text: "Oui",
                          value: "oui"
                        }
                      },
                      icon: "info"
                    }
                  ).then(value => {
                    if (value == "oui") {
                      //then edit the case to posted:false
                      const caseDoc = this.props.sessionCase;
                      caseDoc.posted = !caseDoc.posted;

                      Meteor.call("externatsGeriatry.unpost", caseDoc, error => {
                        if (error) {
                          swal(error.reason, { icon: "error" });
                        } else {
                          swal("Le cas à été masqué", { icon: "success" });
                        }
                      });
                    }
                  });
                }}
              >
                Masquer le cas
              </Button>
            )}
            {this.props.admin && !this.props.sessionCase.posted && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  swal(
                    "Publication",
                    "Êtes-vous sûr(e) de vouloir Publier le cas ?",
                    {
                      buttons: {
                        cancel: { text: "Non", closeModal: true },

                        oui: {
                          text: "Oui",
                          value: "oui"
                        }
                      },
                      icon: "info"
                    }
                  ).then(value => {
                    if (value == "oui") {
                      //then edit the case to posted:false
                      const caseDoc = this.props.sessionCase;
                      caseDoc.posted = !caseDoc.posted;

                      Meteor.call("externatsGeriatry.post", caseDoc, (error, result) => {
                        if (error) {
                          swal(error.reason, { icon: "error" });
                        } else {
                          swal("Le cas à été publié", { icon: "success" });
                        }
                      });
                    }
                  });
                }}
              >
                {" "}
                Publier le cas
              </Button>
            )}
          </div>
         
        </div>
      ) : (
          <Loading />
        );
    } else {
      return <NotAuthorized {...props} />;
    }
  }
}
//Props
CaseViewEditor.propTypes = {
  sessionCase: PropTypes.object,
  history: PropTypes.object.isRequired
};

const CaseViewEditor2 = withStyles(styles)(CaseViewEditor);

export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe("externatsGeriatry.view", documentId);

  console.log(match.params._id);
  console.log(Externats.findOne({ _id: documentId }));

  return {
    loading: !subscription.ready(),
    sessionCase: Externats.findOne({ _id: documentId })
  };
})(CaseViewEditor2);
