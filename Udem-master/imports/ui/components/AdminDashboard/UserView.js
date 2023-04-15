import { Alert } from "react-bootstrap";
import { Bert } from "meteor/themeteorchef:bert";
import Button from "@material-ui/core/Button";
import CasesCollection from "../../../api/Cases/Cases";
import Loading from "../../components/Loading/Loading";
import { Meteor } from "meteor/meteor";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import React from "react";
import { Roles } from "meteor/alanning:roles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import UserSearch from "./UserSearch";
import swal from "sweetalert";
import { timeago } from "../../../modules/dates";
import { withStyles } from "@material-ui/core/styles";
import { withTracker } from "meteor/react-meteor-data";

// import UserSearchField from './searchfield';

//this is the page where they see all the cases and can query through them

const styles = theme => ({
  tableRoot: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
    fontSize: 14,
  },
  table: {
    minWidth: 700,
    width: "100%",
    fontSize: 14,
  },
  root: {
    flexGrow: 1,
    flex: 1,
    alignItems: "center",
    fontSize: 14,
  },
  flex: {
    flex: 1
  },
  button: {
    margin: theme.spacing.unit,
    fontSize: 14,
    float: 'right',
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    fontSize: 14,
    transform: "scale(0.8)"

  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    fontSize: 14,
    marginBottom: 12
  },
  utilisateurs: {
    width: '33%',
  }
});

const UserView = ({
  loading,
  classes,
  searchArray,
  match,
  history,
  ...props
}) =>
  !loading ? (
    <div className="Cases">
      <div style={styles.header} className="admin-caseview-header clearfix">
        <div className="search">
          <UserSearch {...props} />
        </div>
      </div>

      {searchArray ? (
        <div style={styles.root}>
          <div className={"page-header"} style={styles.flex}>
            <h4 className="pull-left">Comptes</h4>
            <p>
              <br /><br />
              {searchArray.length} compte(s) d'utilisateurs correspondent à
              votre recherche
            </p>
          </div>
          <div>
            <div className={"page-header"} style={styles.flex}>
              <h5 className="pull-left">Administrateur</h5>
            </div>

            <Paper className={classes.tableRoot}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Nom </TableCell>
                    <TableCell> Couriel</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchArray
                    .filter(user => {
                      if (
                        Roles.userIsInRole(user._id, ["princess"]) ||
                        Roles.userIsInRole(user._id, ["dev"]) ||
                        Roles.userIsInRole(user._id, ["supreme"]) ||
                        Roles.userIsInRole(user._id, ["ghost"])
                      ) {
                        return false;
                      }
                      return Roles.userIsInRole(user._id, ["admin"]);
                    })
                    .map((userDoc, index) => {
                      return userDoc ? (
                        <TableRow key={userDoc._id}>
                          <TableCell component="th" scope="row">
                            {userDoc &&
                              userDoc.profile &&
                              userDoc.profile.name &&
                              userDoc.profile.name.first}{" "}
                            {userDoc &&
                              userDoc.profile &&
                              userDoc.profile.name &&
                              userDoc.profile.name.last}
                          </TableCell>
                          <TableCell> {userDoc.emails[0].address} </TableCell>
                          <TableCell>
                            <Button
                              variant="extendedFab"
                              size="small"
                              color="primary"
                              className={classes.button}
                              onClick={e => {
                                swal({
                                  title: "Rétrograder",
                                  text:
                                    "Êtes-vous sûr de vouloir retirer les privilèges de ce compte ?",
                                  icon: "warning",
                                  buttons: true,
                                  dangerMode: true
                                }).then(willDelete => {
                                  if (willDelete) {
                                    // remove privileges
                                    Meteor.call(
                                      "user.updateRole",
                                      userDoc._id,
                                      "",
                                      "demote",
                                      (error, result) => {
                                        if (error) {
                                          swal({
                                            title: "Oops!",
                                            text: error.message,
                                            icon: "error"
                                          });
                                        } else {
                                          //refresh the user search array
                                          props.onSetUserSearchArray(
                                            Meteor.users.find().fetch()
                                          );
                                          swal({
                                            title: "C'est fait",
                                            text:
                                              "Les privilèges de ce compte ont été retiré.",
                                            icon: "success"
                                          });
                                        }
                                      }
                                    );
                                  } else {
                                    // swal("Your imaginary file is safe!");
                                  }
                                });
                              }}
                            >
                              Rétrograder
                            </Button>
                          </TableCell>
                        </TableRow>
                      ) : (
                        ""
                      );
                    })}
                </TableBody>
              </Table>
            </Paper>
          </div>

          <div>
            <div className={"page-header"} style={styles.flex}>
              <h5 className="pull-left">Éditeur(s)</h5>
            </div>

            <Paper className={classes.tableRoot}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Nom </TableCell>
                    <TableCell> Couriel</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchArray
                    .filter(user => {
                      if (
                        Roles.userIsInRole(user._id, ["princess"]) ||
                        Roles.userIsInRole(user._id, ["dev"]) ||
                        Roles.userIsInRole(user._id, ["supreme"]) ||
                        Roles.userIsInRole(user._id, ["admin"]) ||
                        Roles.userIsInRole(user._id, ["ghost"])
                      ) {
                        return false;
                      }
                      return Roles.userIsInRole(user._id, ["editor"]);
                    })
                    .map((userDoc, index) => {
                      return (
                        <TableRow key={userDoc._id}>
                          <TableCell component="th" scope="row">
                            {userDoc &&
                              userDoc.profile &&
                              userDoc.profile.name &&
                              userDoc.profile.name.first}{" "}
                            {userDoc &&
                              userDoc.profile &&
                              userDoc.profile.name &&
                              userDoc.profile.name.last}
                          </TableCell>
                          <TableCell> {userDoc.emails[0].address} </TableCell>

                          <TableCell>
                            <Button
                              variant="extendedFab"
                              size="small"
                              color="primary"
                              className={classes.button}
                              onClick={e => {
                                swal({
                                  title: "Rétrograder",
                                  text:
                                    "Êtes-vous sûr de vouloir retirer les privilèges de ce compte ?",
                                  icon: "warning",
                                  buttons: true,
                                  dangerMode: true
                                }).then(willDelete => {
                                  if (willDelete) {
                                    // remove privileges
                                    Meteor.call(
                                      "user.updateRole",
                                      userDoc._id,
                                      "",
                                      "demote",
                                      (error, result) => {
                                        if (error) {
                                          swal({
                                            title: "Oops!",
                                            text: error.message,
                                            icon: "error"
                                          });
                                        } else {
                                          //refresh the user search array
                                          props.onSetUserSearchArray(
                                            Meteor.users.find().fetch()
                                          );
                                          swal({
                                            title: "C'est fait",
                                            text:
                                              "Les privilèges de ce compte ont été retiré.",
                                            icon: "success"
                                          });
                                        }
                                      }
                                    );
                                  } else {
                                    // swal("Your imaginary file is safe!");
                                  }
                                });
                              }}
                            >
                              Rétrograder
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </Paper>
          </div>
          <div>
            <div className={"page-header"} style={styles.flex}>
              <h5 className="pull-left">Utilisateur(s)</h5>
            </div>

            <Paper className={classes.tableRoot}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Nom </TableCell>
                    <TableCell> Couriel</TableCell>
                    <TableCell> Membre depuis</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchArray
                    .filter(user => {
                      if (
                        Roles.userIsInRole(user._id, ["princess"]) ||
                        Roles.userIsInRole(user._id, ["editor"]) ||
                        Roles.userIsInRole(user._id, ["dev"]) ||
                        Roles.userIsInRole(user._id, ["supreme"]) ||
                        Roles.userIsInRole(user._id, ["admin"]) ||
                        Roles.userIsInRole(user._id, ["ghost"])
                      ) {
                        return false;
                      }
                      return true;
                    })
                    .map((userDoc, index) => {
                      return (
                        <TableRow key={userDoc._id}>
                          <TableCell component="th" scope="row">
                            {userDoc &&
                              userDoc.profile &&
                              userDoc.profile.name &&
                              userDoc &&
                              userDoc.profile &&
                              userDoc.profile.name &&
                              userDoc.profile.name.first}{" "}
                            {userDoc &&
                              userDoc.profile &&
                              userDoc.profile.name &&
                              userDoc.profile.name.last}
                          </TableCell>
                          <TableCell> {userDoc.emails[0].address} </TableCell>
                          <TableCell>{timeago(userDoc.createdAt)}</TableCell>
                          <TableCell>
                            <Button
                              variant="extendedFab"
                              size="small"
                              color="primary"
                              className={classes.button}
                              onClick={e => {
                                swal({
                                  title: "Administrateur",
                                  text:
                                    "Êtes-vous sûr de vouloir donner ces privilèges ?",
                                  icon: "warning",
                                  buttons: true,
                                  dangerMode: true
                                }).then(willDelete => {
                                  if (willDelete) {
                                    // remove privileges
                                    Meteor.call(
                                      "user.updateRole",
                                      userDoc._id,
                                      "admin",
                                      "promote",
                                      (error, result) => {
                                        if (error) {
                                          swal({
                                            title: "Oops!",
                                            text: error.message,
                                            icon: "error"
                                          });
                                        } else {
                                          //refresh the user search array
                                          props.onSetUserSearchArray(
                                            Meteor.users.find().fetch()
                                          );
                                          swal({
                                            title: "C'est fait",
                                            text:
                                              "Cet utilisateur est maintenant administrateur.",
                                            icon: "success"
                                          });
                                        }
                                      }
                                    );
                                  } else {
                                    // swal("Your imaginary file is safe!");
                                  }
                                });
                              }}
                            >
                              Rendre Administrateur
                            </Button>

                            <Button
                              variant="extendedFab"
                              size="small"
                              color="secondary"
                              className={classes.button}
                              onClick={e => {
                                swal({
                                  title: "Éditeur",
                                  text:
                                    "Êtes-vous sûr de vouloir donner ces privilèges ?",
                                  icon: "warning",
                                  buttons: true,
                                  dangerMode: true
                                }).then(willDelete => {
                                  if (willDelete) {
                                    // remove privileges
                                    Meteor.call(
                                      "user.updateRole",
                                      userDoc._id,
                                      "editor",
                                      "promote",
                                      (error, result) => {
                                        if (error) {
                                          swal({
                                            title: "Oops!",
                                            text: error.message,
                                            icon: "error"
                                          });
                                        } else {
                                          //refresh the user search array
                                          props.onSetUserSearchArray(
                                            Meteor.users.find().fetch()
                                          );
                                          swal({
                                            title: "C'est fait",
                                            text:
                                              "Cet utilisateur est maintenant éditeur.",
                                            icon: "success"
                                          });
                                        }
                                      }
                                    );
                                  } else {
                                    // swal("Your imaginary file is safe!");
                                  }
                                });
                              }}
                            >
                              Rendre Éditeur
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </Paper>
          </div>

          <div>
            <div className={"page-header"} style={styles.flex}>
              <h5 className="pull-left">Interessé à créer des cas cliniques</h5>
            </div>

            <Paper className={classes.tableRoot}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Nom </TableCell>
                    <TableCell> Couriel</TableCell>
                    <TableCell> Membre depuis</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchArray
                    .filter(user => {
                      if (
                        Roles.userIsInRole(user._id, ["princess"]) ||
                        Roles.userIsInRole(user._id, ["editor"]) ||
                        Roles.userIsInRole(user._id, ["dev"]) ||
                        Roles.userIsInRole(user._id, ["supreme"]) ||
                        Roles.userIsInRole(user._id, ["admin"]) ||
                        Roles.userIsInRole(user._id, ["ghost"])
                      ) {
                        return false;
                      }
                      return user.profile.creationInterest
                        ? user.profile.creationInterest
                        : false;
                    })
                    .map((userDoc, index) => {
                      return (
                        <TableRow key={userDoc._id}>
                          <TableCell component="th" scope="row">
                            {userDoc &&
                              userDoc.profile &&
                              userDoc.profile.name &&
                              userDoc.profile.name.first}{" "}
                            {userDoc &&
                              userDoc.profile &&
                              userDoc.profile.name &&
                              userDoc.profile.name.last}
                          </TableCell>
                          <TableCell> {userDoc.emails[0].address} </TableCell>
                          <TableCell>{timeago(userDoc.createdAt)}</TableCell>
                          <TableCell>
                            {" "}
                            <Button
                              variant="extendedFab"
                              size="small"
                              color="primary"
                              className={classes.button}
                              onClick={e => {
                                swal({
                                  title: "Éditeur",
                                  text:
                                    "Êtes-vous sûr de vouloir donner ces privilèges ?",
                                  icon: "warning",
                                  buttons: true,
                                  dangerMode: true
                                }).then(willDelete => {
                                  if (willDelete) {
                                    // remove privileges
                                    Meteor.call(
                                      "user.updateRole",
                                      userDoc._id,
                                      "editor",
                                      "promote",
                                      (error, result) => {
                                        if (error) {
                                          swal({
                                            title: "Oops!",
                                            text: error.message,
                                            icon: "error"
                                          });
                                        } else {
                                          //refresh the user search array
                                          props.onSetUserSearchArray(
                                            Meteor.users.find().fetch()
                                          );
                                          swal({
                                            title: "C'est fait",
                                            text:
                                              "Cet utilisateur est maintenant éditeur.",
                                            icon: "success"
                                          });
                                        }
                                      }
                                    );
                                  } else {
                                    // swal("Your imaginary file is safe!");
                                  }
                                });
                              }}
                            >
                              Rendre Éditeur
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </Paper>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  ) : (
    <Loading />
  );

UserView.propTypes = {
  loading: PropTypes.bool.isRequired,
  cases: PropTypes.arrayOf(PropTypes.object).isRequired,
  usersArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const UserView2 = withStyles(styles)(UserView);

export default withTracker(() => {
  // const subscription = Meteor.subscribe("cases.posted");
  const subscription2 = Meteor.subscribe("users.admin");

  return {
    loading:  !subscription2.ready(),
    usersArray: !subscription2.ready() && Meteor.users.find().fetch(),
    // cases: !subscription.ready() && CasesCollection.find().fetch()
  };
})(UserView2);
