/* eslint-disable jsx-a11y/no-href */

import "./App.scss";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
//redux
import {
  addCaseDoc,
  addSessionCase,
  deleteCaseDoc,
  deselectCaseDoc,
  endSession,
  pauseSession,
  resumeSession,
  selectCaseDoc,
  setAdminCases,
  setClockState,
  setNameArray,
  setReasonArray,
  setSearchArray,
  setSessionPage,
  setSessionTime,
  setSystemeArray,
  setTimeItTook,
  setUserCases,
  setUserSearchArray,
  setUsers,
  startSession
} from "../../store/actions/index";

import AdminCaseView from "../../components/AdminDashboard/CaseView";
import AdminDashboard from "../../pages/AdminDashboard/AdminDashboard";
import AdminEditCase from "../../pages/AdminDashboard/AdminEditCase";
import AdminExternatView from "../../components/AdminDashboard/ExternatView";
import AdminIndividualCaseView from "../../pages/AdminDashboard/AdminViewCase";
import Administrator from "../../components/Authenticated/Administrator";
import Authenticated from "../../components/Authenticated/Authenticated";
import CaseEditor from "../../components/CaseEditor/CaseEditor";
import CaseView from "../../pages/CaseView/CaseView";
import CaseViewEditor from "../../components/CaseViewAdmin/CaseViewEditor";
import CaseViewEditorChirurgie from "../../components/Externat/Surgery/CaseViewEditor";
import CaseViewEditorGeriatry from "../../components/Externat/Geriatrie/CaseViewEditor";
import CaseViewEditorPsychiatry from "../../components/Externat/Psycho/CaseViewEditor";
import Cases from "../../pages/Cases/Cases";
import CreateCase from "../../pages/CreateCase/CreateCase";
import CreateCaseGeriatry from "../../pages/CreateCase/CreateCase-geriatry";
import CreateCaseGynecos from "../../pages/CreateCase/CreateCase-gynecos";
import CreateCaseOphtalmo from "../../pages/CreateCase/CreateCase-ohptalmo";
import CreateCasePediatry from "../../pages/CreateCase/CreateCase-pediatry";
import CreateCasePsychos from "../../pages/CreateCase/CreateCase-psychos";
import CreateCaseSurgery from "../../pages/CreateCase/CreateCase-surgery";
import DocumentsComponent from "../../pages/Documents/Documents";
import EditCase from "../../pages/EditCase/EditCase";
import EditCaseGeriatry from "../../pages/EditCase/EditCase-geriatry";
import EditCaseGynecos from "../../pages/EditCase/EditCase-gynecos";
import EditCaseOphtalmo from "../../pages/EditCase/EditCase-ohptalmo";
import EditCasePediatry from "../../pages/EditCase/EditCase-pediatry";
import EditCasePsychos from "../../pages/EditCase/EditCase-psychos";
import EditCaseSurgery from "../../pages/EditCase/EditCase-surgery";
import EditDocument from "../../pages/EditDocument/EditDocument";
import EditorViewCase from "../../pages/Cases/EditorViewCase";
import ExamplePage from "../../pages/ExamplePage/ExamplePage";
import ExternatView from "../../pages/CaseView/ExternatView";
import FAQ from "../../pages/FAQ/FAQ";
import Footer from "../../components/Footer/Footer";
import GeriatryResultPage from "../../components/Externat/Geriatrie/Result";
import GeriatrySessionPage from "../../components/Externat/Geriatrie/SessionPage";
import { Grid } from "react-bootstrap";
import Index from "../../pages/Index/Index";
import Login from "../../pages/Login/Login";
import Logout from "../../pages/Logout/Logout";
import { Meteor } from "meteor/meteor";
import Navigation from "../../components/Navigation/Navigation";
import NewDocument from "../../pages/NewDocument/NewDocument";
import NotFound from "../../pages/NotFound/NotFound";
import Privacy from "../../pages/Privacy/Privacy";
import Profile from "../../pages/Profile/Profile";
import PropTypes from "prop-types";
import PsychoResultPage from "../../components/Externat/Psycho/Result";
import PsychoSessionPage from "../../components/Externat/Psycho/SessionPage";
import Public from "../../components/Public/Public";
import React from "react";
import Recap from "../../pages/Recap/Recap";
import RecoverPassword from "../../pages/RecoverPassword/RecoverPassword";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import { Roles } from "meteor/alanning:roles";
import SessionPage from "../../pages/Session/SessionPage";
import Signup from "../../pages/Signup/Signup";
import SurgeryResultPage from "../../components/Externat/Surgery/Result";
import SurgerySessionPage from "../../components/Externat/Surgery/SessionPage";
import Terms from "../../pages/Terms/Terms";
import Test from "../../pages/Test";
import UserView from "../../components/AdminDashboard/UserView";
import VerifyEmail from "../../pages/VerifyEmail/VerifyEmail";
import VerifyEmailAlert from "../../components/VerifyEmailAlert/VerifyEmailAlert";
import autoBind from "react-autobind";
import { connect } from "react-redux";
import createMenu from "../../pages/CreateCase/menu";
import getUserName from "../../../modules/get-user-name";
import moduleName from "redux";
import { withTracker } from "meteor/react-meteor-data";

//redux

class App extends React.Component {
  constructor(props) {
    super(props);
    // injectTapEventPlugin();
    this.state = { afterLoginPath: null };
  }

  componentDidMount() {
    // const {}
    // console.log(this.props.sessionTime + " and the props " + this.props);
  }

  caseDocAddedHandler = caseDocName => {
    this.props.onAddCaseDoc(caseDocName);
  };

  caseDocSelectedHandler = key => {
    this.props.onSelectCaseDoc(key);
  };

  setSearchArrayHandler = searchArray => {
    this.props.onSetSearchArray(searchArray);
  };

  setUserSearchArrayHandler = searchArray => {
    this.props.onSetUserSearchArray(searchArray);
  };

  setNameArrayHandler = nameArray => {
    this.props.onSetNameArray(nameArray);
  };

  setSystemeArrayHandler = systemeArray => {
    this.props.onSetSystemeArray(systemeArray);
  };
  setReasonArrayHandler = reasonArray => {
    this.props.onSetReasonArray(reasonArray);
  };
  setAdminCasesHandler = adminCases => {
    this.props.onSetAdminCases(adminCases);
  };

  setUserCasesHandler = userCases => {
    this.props.onSetUserCases(userCases);
  };

  caseDocDeletedHandler = () => {
    this.props.onDeleteCaseDoc();
  };
  sessionCaseAddedHandler = sessionCase => {
    console.log("in session case added handler");
    this.props.onAddSessionCase(sessionCase);
  };
  setSessionPageHandler = sessionPage => {
    this.props.onSetSessionPage(sessionPage);
  };

  setSessionTimeHandler = time => {
    console.log("in session time handler time passed is " + time);
    this.props.onSetSessionTime(time);
  };

  setUsersHandler = users => {
    console.log("users handler called");
    this.props.onSetUsers(users);
  };

  setTimeItTookHandler = timeItTook => {
    this.props.onTimeItTook(timeItTook);
  };

  setClockStateHandler = clockState => {
    this.props.onSetClockState(clocState);
  };

  startSessionHandler = () => {
    this.props.onStartSession();
  };

  resumeSessionHandler = () => {
    this.props.onResumeSession();
  };
  endSessionHandler = () => {
    this.props.onEndSession();
  };
  pauseSessionHandler = () => {
    this.props.onPauseSession();
  };

  modalClosedHandler = () => {
    this.props.onDeselectCaseDoc();
  };

  setAfterLoginPath(afterLoginPath) {
    // this.setState({afterLoginPath});
  }

  render() {
    const { props, state, setAfterLoginPath } = this;
    return (
      <Router>
        {!props.loading ? (
          <div className="App">
            <Navigation {...props} {...state} />
            <Grid className={"centerPart"}>
              <Switch>
                <Route exact name="index" path="/" component={Index} />
                <Administrator
                  exact
                  path="/admin"
                  component={AdminDashboard}
                  setAfterLoginPath={setAfterLoginPath}
                  onSetUserSearhArray={this.setUserSearchArrayHandler}
                  onSetSearhArray={this.setSearchArrayHandler}
                  onSetUserCases={this.setUserCasesHandler}
                  onSetUsers={this.setUsersHandler}
                  {...props}
                  {...state}
                />
                <Administrator
                  exact
                  path="/admin/view-all-cases"
                  component={AdminCaseView}
                  setAfterLoginPath={setAfterLoginPath}
                  onSetUserSearhArray={this.setUserSearchArrayHandler}
                  onSetSearhArray={this.setSearchArrayHandler}
                  onSetUserCases={this.setUserCasesHandler}
                  onSetUsers={this.setUsersHandler}
                  {...props}
                  {...state}
                />
                 <Administrator
                  exact
                  path="/admin/view-externat-cases"
                  component={AdminExternatView}
                  setAfterLoginPath={setAfterLoginPath}
                  onSetUserSearhArray={this.setUserSearchArrayHandler}
                  onSetSearhArray={this.setSearchArrayHandler}
                  onSetUserCases={this.setUserCasesHandler}
                  onSetUsers={this.setUsersHandler}
                  {...props}
                  {...state}
                />
                <Administrator
                  exact
                  path="/admin/view-users"
                  component={UserView}
                  setAfterLoginPath={setAfterLoginPath}
                  onSetUserSearhArray={this.setUserSearchArrayHandler}
                  onSetSearhArray={this.setSearchArrayHandler}
                  onSetUserCases={this.setUserCasesHandler}
                  onSetUsers={this.setUsersHandler}
                  {...props}
                  {...state}
                />
                <Administrator
                  exact
                  path="/admin/view-case/:_id"
                  component={AdminIndividualCaseView}
                  setAfterLoginPath={setAfterLoginPath}
                  onSetSystemeArray={this.setSystemeArrayHandler}
                  onSessionCaseAdded={this.sessionCaseAddedHandler}
                  onSetUserSearhArray={this.setUserSearchArrayHandler}
                  onSetSearhArray={this.setSearchArrayHandler}
                  onSetUserCases={this.setUserCasesHandler}
                  onSetUsers={this.setUsersHandler}
                  {...props}
                  {...state}
                />
                <Authenticated
                  exact
                  path="/admin/edit-case/:_id"
                  component={EditCase}
                  setAfterLoginPath={setAfterLoginPath}
                  onSessionCaseAdded={this.sessionCaseAddedHandler}
                  onSetUserSearhArray={this.setUserSearchArrayHandler}
                  onSetSearhArray={this.setSearchArrayHandler}
                  onSetUserCases={this.setUserCasesHandler}
                  onSetUsers={this.setUsersHandler}
                  {...props}
                  {...state}
                />
                <Authenticated
                  exact
                  path="/cases"
                  component={Cases}
                  setAfterLoginPath={setAfterLoginPath}
                  {...props}
                  {...state}
                />
                <Authenticated
                  exact
                  path="/cases/:_id"
                  component={CaseViewEditor}
                  setAfterLoginPath={setAfterLoginPath}
                  onSessionCaseAdded={this.sessionCaseAddedHandler}
                  {...props}
                  {...state}
                />
                <Authenticated
                  exact
                  path="/edit-case/:_id"
                  component={EditCase}
                  setAfterLoginPath={setAfterLoginPath}
                  {...props}
                  {...state}
                />

                <Authenticated
                  exact
                  path="/createCase-menu"
                  component={createMenu}
                  setAfterLoginPath={setAfterLoginPath}
                  {...props}
                  {...state}
                />
                <Authenticated
                  exact
                  path="/createCase-general"
                  component={CreateCase}
                  setAfterLoginPath={setAfterLoginPath}
                  {...props}
                  {...state}
                />
                <Authenticated
                  exact
                  path="/createCase-chirurgie"
                  component={CreateCaseSurgery}
                  setAfterLoginPath={setAfterLoginPath}
                  {...props}
                  {...state}
                />
                <Authenticated
                  exact
                  path="/editCase-chirurgie/:_id"
                  component={EditCaseSurgery}
                  setAfterLoginPath={setAfterLoginPath}
                  {...props}
                  {...state}
                />

                <Authenticated
                  exact
                  path="/externat-chirurgie/:_id"
                  component={CaseViewEditorChirurgie}
                  setAfterLoginPath={setAfterLoginPath}
                  onSessionCaseAdded={this.sessionCaseAddedHandler}
                  {...props}
                  {...state}
                />
                <Authenticated
                  exact
                  path="/externat/chirurgie/:_id"
                  component={SurgerySessionPage}
                  setAfterLoginPath={setAfterLoginPath}
                  onSessionCaseAdded={this.sessionCaseAddedHandler}
                  {...props}
                  {...state}
                />
                <Authenticated
                  exact
                  path="/externat-revue/chirurgie/:_id"
                  component={SurgeryResultPage}
                  setAfterLoginPath={setAfterLoginPath}
                  onSessionCaseAdded={this.sessionCaseAddedHandler}
                  {...props}
                  {...state}
                />
                <Authenticated
                  exact
                  path="/createCase-psychiatrie"
                  component={CreateCasePsychos}
                  setAfterLoginPath={setAfterLoginPath}
                  {...props}
                  {...state}
                />
                <Authenticated
                  exact
                  path="/editCase-psychiatrie/:_id"
                  component={EditCasePsychos}
                  setAfterLoginPath={setAfterLoginPath}
                  {...props}
                  {...state}
                />
                <Authenticated
                  exact
                  path="/externat-psychiatrie/:_id"
                  component={CaseViewEditorPsychiatry}
                  setAfterLoginPath={setAfterLoginPath}
                  onSessionCaseAdded={this.sessionCaseAddedHandler}
                  {...props}
                  {...state}
                />
                <Authenticated
                  exact
                  path="/externat/psychiatrie/:_id"
                  component={PsychoSessionPage}
                  setAfterLoginPath={setAfterLoginPath}
                  onSessionCaseAdded={this.sessionCaseAddedHandler}
                  {...props}
                  {...state}
                />
                <Authenticated
                  exact
                  path="/externat-revue/psychiatrie/:_id"
                  component={PsychoResultPage}
                  setAfterLoginPath={setAfterLoginPath}
                  onSessionCaseAdded={this.sessionCaseAddedHandler}
                  {...props}
                  {...state}
                />
                <Authenticated
                  exact
                  path="/createCase-gyneco"
                  component={CreateCaseGynecos}
                  setAfterLoginPath={setAfterLoginPath}
                  {...props}
                  {...state}
                />
                <Authenticated
                  exact
                  path="/editCase-gyneco/:_id"
                  component={EditCaseGynecos}
                  setAfterLoginPath={setAfterLoginPath}
                  {...props}
                  {...state}
                />
                <Authenticated
                  exact
                  path="/createCase-ophtalmo"
                  component={CreateCaseOphtalmo}
                  setAfterLoginPath={setAfterLoginPath}
                  {...props}
                  {...state}
                />

                <Authenticated
                  exact
                  path="/editCase-ophtalmo/:_id"
                  component={EditCaseOphtalmo}
                  setAfterLoginPath={setAfterLoginPath}
                  {...props}
                  {...state}
                />
                
                <Authenticated
                  exact
                  path="/createCase-pediatry"
                  component={CreateCasePediatry}
                  setAfterLoginPath={setAfterLoginPath}
                  {...props}
                  {...state}
                />
                <Authenticated
                  exact
                  path="/editCase-pediatry/:_id"
                  component={EditCasePediatry}
                  setAfterLoginPath={setAfterLoginPath}
                  {...props}
                  {...state}
                />
                <Authenticated
                  exact
                  path="/createCase-gériatrie"
                  component={CreateCaseGeriatry}
                  setAfterLoginPath={setAfterLoginPath}
                  {...props}
                  {...state}
                />

                <Authenticated
                  exact
                  path="/editCase-gériatrie/:_id"
                  component={EditCaseGeriatry}
                  setAfterLoginPath={setAfterLoginPath}
                  {...props}
                  {...state}
                />
                <Authenticated
                  exact
                  path="/externat-gériatrie/:_id"
                  component={CaseViewEditorGeriatry}
                  setAfterLoginPath={setAfterLoginPath}
                  onSessionCaseAdded={this.sessionCaseAddedHandler}
                  {...props}
                  {...state}
                />

                <Authenticated
                  exact
                  path="/externat/gériatrie/:_id"
                  component={GeriatrySessionPage}
                  setAfterLoginPath={setAfterLoginPath}
                  onSessionCaseAdded={this.sessionCaseAddedHandler}
                  {...props}
                  {...state}
                />
                <Authenticated
                  exact
                  path="/externat-revue/gériatrie/:_id"
                  component={GeriatryResultPage}
                  setAfterLoginPath={setAfterLoginPath}
                  onSessionCaseAdded={this.sessionCaseAddedHandler}
                  {...props}
                  {...state}
                />

                <Authenticated
                  exact
                  path="/recap/:_id"
                  component={Recap}
                  setAfterLoginPath={setAfterLoginPath}
                  {...props}
                  {...state}
                />
                <Authenticated
                  exact
                  path="/documents/new"
                  component={NewDocument}
                  setAfterLoginPath={setAfterLoginPath}
                  {...props}
                  {...state}
                />
                <Authenticated
                  exact
                  path="/documents/:_id/edit"
                  component={EditDocument}
                  setAfterLoginPath={setAfterLoginPath}
                  {...props}
                  {...state}
                />
                <Authenticated
                  exact
                  path="/profile"
                  component={Profile}
                  setAfterLoginPath={setAfterLoginPath}
                  {...props}
                  {...state}
                />
                <Authenticated
                  exact
                  path="/viewCases"
                  component={CaseView}
                  setAfterLoginPath={setAfterLoginPath}
                  onSetReasonArray={this.setReasonArrayHandler}
                  onSetSystemeArray={this.setSystemeArrayHandler}
                  onSetNameArray={this.setNameArrayHandler}
                  onSetSearhArray={this.setSearchArrayHandler}
                  onSetUserCases={this.setUserCasesHandler}
                  onSetSessionPage={this.setSessionPageHandler}
                  onSessionCaseAdded={this.sessionCaseAddedHandler}
                  {...props}
                  {...state}
                />
                 <Authenticated
                  exact
                  path="/externats"
                  component={ExternatView}
                  setAfterLoginPath={setAfterLoginPath}
                  onSetReasonArray={this.setReasonArrayHandler}
                  onSetSystemeArray={this.setSystemeArrayHandler}
                  onSetNameArray={this.setNameArrayHandler}
                  onSetSearhArray={this.setSearchArrayHandler}
                  onSetUserCases={this.setUserCasesHandler}
                  onSetSessionPage={this.setSessionPageHandler}
                  onSessionCaseAdded={this.sessionCaseAddedHandler}
                  {...props}
                  {...state}
                />
                <Authenticated
                  exact
                  path="/session/:_id"
                  component={SessionPage}
                  onSetSessionTime={this.setSessionTimeHandler}
                  onSetClockState={this.setClockStateHandler}
                  onStartSession={this.startSessionHandler}
                  onPauseSession={this.pauseSessionHandler}
                  onSetTimeItTook={this.setTimeItTookHandler}
                  onResumeSession={this.resumeSessionHandler}
                  onSessionCaseAdded={this.sessionCaseAddedHandler}
                  onStopSession={this.stopSessionHandler}
                  onSetSessionPage={this.setSessionPageHandler}
                  setAfterLoginPath={setAfterLoginPath}
                  {...props}
                  {...state}
                />

                <Public
                  path="/signup"
                  component={Signup}
                  {...props}
                  {...state}
                />
                <Public path="/login" component={Login} {...props} {...state} />
                <Route
                  path="/logout"
                  render={routeProps => (
                    <Logout
                      {...routeProps}
                      setAfterLoginPath={setAfterLoginPath}
                    />
                  )}
                  {...props}
                  {...state}
                />
                <Route
                  name="verify-email"
                  path="/verify-email/:token"
                  component={VerifyEmail}
                />
                <Route
                  name="recover-password"
                  path="/recover-password"
                  component={RecoverPassword}
                />
                <Route
                  name="reset-password"
                  path="/reset-password/:token"
                  component={ResetPassword}
                />
                <Route name="terms" path="/terms" component={Terms} />
                <Route name="faq" path="/faq" component={FAQ} />
                <Route name="privacy" path="/privacy" component={Privacy} />
                <Route
                  name="examplePage"
                  path="/example-page"
                  component={ExamplePage}
                />
                <Route name="Test" path="/Test" component={Test} />
                <Route component={NotFound} />
              </Switch>
            </Grid>
            <Footer />
          </div>
        ) : (
          ""
        )}
      </Router>
    );
  }
}

App.defaultProps = {
  userId: "",
  emailAddress: ""
};

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  userId: PropTypes.string,
  emailAddress: PropTypes.string,
  emailVerified: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired
};

// REDUX MAPPING TO PROPS
const mapStateToProps = state => {
  return {
    users: state.users,
    usersArray: state.users.usersArray,
    userSearchArray: state.users.userSearchArray,
    cases: state.cases,
    casesArray: state.cases.casesArray,
    searchArray: state.cases.searchArray,
    nameArray: state.cases.nameArray,
    systemeArray: state.cases.systemeArray,
    reasonArray: state.cases.reasonArray,
    session: state.session,
    sessionCase: state.session.sessionCase,
    sessionPage: state.session.sessionPage,
    inSession: state.session.inSession,
    clockState: state.session.clockState,
    sessionTime: state.session.sessionTime, //default time set to ten minutes
    sessionTimeSplit: state.session.sessionTimeSplit,
    timeItTook: state.session.timeItTook,
    timeItTookSplit: state.session.timeItTook,
    currentTime: state.session.currentTime,
    session: state.session.session,
    recapCase: state.session.recapCase,
    userSessions: state.session.userSessions,
    averageFirstScore: state.session.averageFirstScore,
    firstScore: state.session.firstScore,
    average: state.session.average,
    lastScore: state.session.lastScore,
    firstTime: state.session.firstTime,
    sessionId: state.session.sessionId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddCaseDoc: name => dispatch(addCaseDoc(name)),
    onSetUserCases: casesArray => dispatch(setUserCases(casesArray)),
    onSetUsers: users => dispatch(setUsers(users)),
    onSetAdminCases: casesArray => dispatch(setAdminCases(casesArray)),
    onSetSearchArray: searchArray => dispatch(setSearchArray(searchArray)),
    onSetUserSearchArray: searchArray =>
      dispatch(setUserSearchArray(searchArray)),
    onSetSystemeArray: systemeArray => dispatch(setSystemeArray(systemeArray)),
    onSetNameArray: nameArray => dispatch(setNameArray(nameArray)),
    onSetReasonArray: reasonArray => dispatch(setReasonArray(reasonArray)),
    onAddSessionCase: sessionCase => dispatch(addSessionCase(sessionCase)),
    onSetSessionTime: sessionTime => dispatch(setSessionTime(sessionTime)),
    onSetSessionPage: sessionPage => dispatch(setSessionPage(sessionPage)),
    onSetClockState: clockState => dispatch(setClockState(clockState)),
    onStartSession: () => dispatch(startSession()),
    onResumeSession: () => dispatch(resumeSession()),
    onEndSession: () => dispatch(endSession()),
    onPauseSession: () => dispatch(pauseSession()),
    onSetTimeItTook: timeItTook => dispatch(setTimeItTook(timeItTook))
  };
};

const finalApp = withTracker(() => {
  const loggingIn = Meteor.loggingIn();
  const user = Meteor.user();
  const userId = Meteor.userId();
  const loading = !Roles.subscription.ready();
  const name =
    user && user.profile && user.profile.name && getUserName(user.profile.name);
  const emailAddress = user && user.emails && user.emails[0].address;
  // const admin = user.roles.filter((role)=>{return role == "admin"}).length > 0;
  // const editor = user.roles.filter((role)=>{return role == "editor"}).length > 0;
  // const supreme = user.roles.filter((role)=>{return role == "supreme"}).length > 0;
  // const ghost = user.roles.filter((role)=>{return role == "ghost"}).length > 0;
  // const showcase = user.roles.filter((role)=>{return role == "showcase"}).length > 0;
  return {
    loading,
    loggingIn,
    authenticated: !loggingIn && !!userId,
    name: name || emailAddress,
    roles: !loading && Roles.getRolesForUser(userId),
    userId,
    emailAddress,
    admin:
      !loggingIn && !!userId
        ? !loading &&
          user.roles.filter(role => {
            return role == "admin";
          }).length > 0
        : false,
    editor:
      !loggingIn && !!userId
        ? !loading &&
          user.roles.filter(role => {
            return role == "editor";
          }).length > 0
        : false,
    // supreme: supreme,
    // showcase: showcase,
    emailVerified:
      user && user.emails
        ? user && user.emails && user.emails[0].verified
        : true
  };
})(App);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(finalApp);

// AUTHENTICATED POPUP
// {props.authenticated ?
//     <VerifyEmailAlert
//         userId={props.userId}
//         emailVerified={props.emailVerified}
//         emailAddress={props.emailAddress}
//     />
//     : ''}
