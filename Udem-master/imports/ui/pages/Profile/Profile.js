/* eslint-disable no-underscore-dangle */

import './Profile.scss';

import { Button, Col, ControlLabel, FormGroup, Row } from 'react-bootstrap';

import AccountPageFooter from '../../components/AccountPageFooter/AccountPageFooter';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import FileSaver from 'file-saver';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputHint from '../../components/InputHint/InputHint';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import React from 'react';
import Switch from '@material-ui/core/Switch';
import _ from 'lodash';
import autoBind from 'react-autobind';
import base64ToBlob from 'b64-to-blob';
import swal from 'sweetalert';
import validate from '../../../modules/validate';
import { withTracker } from 'meteor/react-meteor-data';

class Profile extends React.Component {
    state = {
        creationInterest: this.props.user.profile.creationInterest ? this.props.user.profile.creationInterest : false,
    }
    constructor(props) {
        super(props);
        autoBind(this);

    }

    componentDidMount() {
        const component = this;

        validate(component.form, {
            rules: {
                firstName: {
                    required: true,
                },
                middleName: {
                    required: true,
                },
                lastName: {
                    required: true,
                },
                emailAddress: {
                    required: true,
                    email: true,
                },
                currentPassword: {
                    required() {
                        // Only required if newPassword field has a value.
                        return component.form.newPassword.value.length > 6;
                    },
                },
                newPassword: {
                    required() {
                        // Only required if currentPassword field has a value.
                        return component.form.currentPassword.value.length > 6;
                    },
                },
            },
            messages: {
                firstName: {
                    required: 'Veuillez entrer votre prenom',
                },
                lastName: {
                    required: 'Veuillez entrer votre nom de famille',
                },
                emailAddress: {
                    required: 'Veuillez entrer votre addresse couriel.',
                    email: 'Le format de ce couriel n\'est pas valide?',
                },
                currentPassword: {
                    required: "Pour modifier votre mot de passe vous devez confirmer l'ancien",
                },
                newPassword: {
                    required: 'Veuillez entrer votre nouveau mot de passe.',
                },
            },
            submitHandler() {
                component.handleSubmit(component.form);
            },
        });
    }

    getUserType(user) {
        const userToCheck = user;
        delete userToCheck.services.resume;
        const service = Object.keys(userToCheck.services)[0];
        return service === 'password' ? 'password' : 'oauth';
    }

    handleExportData(event) {
        event.preventDefault();
        Meteor.call('users.exportData', (error, exportData) => {
            if (error) {
                Bert.alert(error.reason, 'danger');
            } else {
                FileSaver.saveAs(base64ToBlob(exportData), `${Meteor.userId()}.zip`);
            }
        });
    }

    handleDeleteAccount() {
        if (confirm('Are you sure? This will permanently delete your account and all of its data.')) {
            Meteor.call('users.deleteAccount', (error) => {
                if (error) {
                    swal(error.reason, 'danger');
                } else {
                    swal('Account deleted!', 'success');
                }
            });
        }
    }

    handleSubmit(form) {
        console.log(this.state.creationInterest);
        const profile = {
            emailAddress: form.emailAddress.value,

            profile: {
                name: {
                    first: form.firstName.value,
                    last: form.lastName.value,

                },
                creationInterest: this.state.creationInterest,
            },
        };
//verifier que c'est une adresse umontreal
var emailToCheck = form.emailAddress.value.split('@').slice(1);

    var allowedDomains = [ 'umontreal.ca',  'joycava.com' ];
    
    if ($.inArray(emailToCheck[0], allowedDomains) !== -1) {
        Meteor.call('users.editProfile', profile, (error) => {
            if (error) {
                // Bert.alert(error.reason, 'danger');
                swal(error.reason, { icon: "error", });
            } else {
                // Bert.alert('Profile updated!', 'success');
                swal("Votre profil à été mis a jour.", { icon: "success", });
                
            }
        });

        if (form.newPassword.value) {
            Accounts.changePassword(form.currentPassword.value, form.newPassword.value, (error) => {
                if (error) {
                    swal(error.reason, {icon:'error'});
                } else {
                    form.currentPassword.value = '';
                    form.newPassword.value = '';
                }
            });
        }} else {
             //not acceptable
      swal("Cette application est exclusive au membre de l'Université de Montréal.", { icon: "error", });
        }
    }

    renderOAuthUser(loading, user) {
        return !loading ? (
            <div className="OAuthProfile">
                {Object.keys(user.services).map(service => (
                    <div key={service} className={`LoggedInWith ${service}`}>
                        <img src={`/${service}.svg`} alt={service} />
                        <p>{`You're logged in with ${_.capitalize(service)} using the email address ${user.services[service].email}.`}</p>
                        <Button
                            className={`btn btn-${service}`}
                            href={{
                                facebook: 'https://www.facebook.com/settings',
                                google: 'https://myaccount.google.com/privacy#personalinfo',
                                github: 'https://github.com/settings/profile',
                            }[service]}
                            target="_blank"
                        >
                            Edit Profile on {_.capitalize(service)}
                        </Button>
                    </div>
                ))}
            </div>) : <div />;
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };
    renderPasswordUser(loading, user) {
        return !loading ? (
            <div>
                <Row>
                    <Col xs={6}>
                        <FormGroup>
                            <ControlLabel>Prénom</ControlLabel>
                            <input
                                type="text"
                                name="firstName"
                                defaultValue={user.profile.name.first}
                                className="form-control"
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={6}>
                        <FormGroup>
                            <ControlLabel>Nom de famille</ControlLabel>
                            <input
                                type="text"
                                name="lastName"
                                defaultValue={user.profile.name.last}
                                className="form-control"
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup>
                    <ControlLabel>Adresse courriel</ControlLabel>
                    <input
                        type="email"
                        name="emailAddress"
                        defaultValue={user.emails[0].address}
                        className="form-control"
                    />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Mot de passe</ControlLabel>
                    <input
                        type="password"
                        name="currentPassword"
                        className="form-control"
                    />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Nouveau mot de passe</ControlLabel>
                    <input
                        type="password"
                        name="newPassword"
                        className="form-control"
                    />
                    <InputHint>Minimum de 6 caractères</InputHint>
                </FormGroup>

                <FormGroup>


                    <FormControlLabel
                        control={
                            <Switch

                                checked={this.state.creationInterest}
                                onChange={this.handleChange('creationInterest')}
                                value="creationInterest"
                                color="primary"
                            />
                        }
                        label="Êtes-vous intéressé à créer des cas cliniques ?"
                    />
                </FormGroup>

                <Button type="submit" bsStyle="success">Sauvegarder le profil</Button>
            </div>
        ) : <div />;
    }

    renderProfileForm(loading, user) {
        return !loading ? ({
            password: this.renderPasswordUser,
            oauth: this.renderOAuthUser,
        }[this.getUserType(user)])(loading, user) : <div />;
    }

    render() {
        const { loading, user } = this.props;
        return (
            <div className="Profile">
                <Row>
                    <Col xs={12}>
                        <h4 className="page-header">Mettre à jour votre profil</h4>
                        <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
                            {this.renderProfileForm(loading, user)}
                        </form>

                       
                    </Col>
                </Row>
            </div>
        );
    }
}

Profile.propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
};

/* <AccountPageFooter>
<Button bsStyle="danger" onClick={this.handleDeleteAccount}>Supprimer le compte</Button>
</AccountPageFooter> */


export default withTracker(() => {
    const subscription = Meteor.subscribe('users.editProfile');

    return {
        loading: !subscription.ready(),
        user: Meteor.user(),
    };
})(Profile);
