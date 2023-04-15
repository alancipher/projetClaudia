import './login.scss';

import {Button, Col, ControlLabel, FormGroup, Row} from 'react-bootstrap';

import AccountPageFooter from '../../components/AccountPageFooter/AccountPageFooter';
import Avatar from '@material-ui/core/Avatar';
import {Bert} from 'meteor/themeteorchef:bert';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import {Link} from 'react-router-dom';
import {Meteor} from 'meteor/meteor';
import OAuthLoginButtons from '../../components/OAuthLoginButtons/OAuthLoginButtons';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import autoBind from 'react-autobind';
import red from '@material-ui/core/colors/red';
import swal from 'sweetalert';
import validate from '../../../modules/validate';

const styles = theme => ({
    card: {
        maxWidth: 400,
        paddingTop: '56.25%',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
});

class Login extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentDidMount() {
        const component = this;

        validate(component.form, {
            rules: {
                emailAddress: {
                    required: true,
                    email: true,
                },
                password: {
                    required: true,
                },
            },
            messages: {
                emailAddress: {
                    required: 'Veuillez entrer une addresse email.',
                    email: 'Le format de ce couriel n\'est pas valide.',
                },
                password: {
                    required: 'Veuillez entrer un mot de passe.',
                },
            },
            submitHandler() {
                component.handleSubmit(component.form);
            },
        });
    }

    handleSubmit(form) {
        Meteor.loginWithPassword(form.emailAddress.value, form.password.value, (error) => {
            if (error) {
                // Bert.alert(error.reason, 'danger');
                swal(error.reason, { icon: "error", });
            } else {
               

            }
        });
    }

    render() {
        return (
            <div className="Login">
                <Row>
                    <Col xs={12} smOffset={3} sm={6} md={6} mdOffset={3} lgOffset={4} lg={4}>
                        <Card style={styles.card}>
                            <CardHeader align="center" title={<img
                                src="img/aeemum.png"
                                alt="AEEMUM"
                            />} subheader="Accéder à l'application"/>


                            <CardContent>
                                <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
                                    <FormGroup>
                                        <ControlLabel>Courriel</ControlLabel>
                                        <input
                                            type="email"
                                            name="emailAddress"
                                            className="form-control"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel className="clearfix">
                                            <span className="pull-left">Mot de passe</span>
                                        </ControlLabel>
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                        />
                                    </FormGroup>
                                    <Button type="submit" bsStyle="success">Connexion</Button>
                                    <Link className="pull-right" to="/recover-password">Mot de passe
                                                oublié?</Link>
                                    <AccountPageFooter>
                                        <p>{'Vous n\'avez pas encore de compte ?'} <Link to="/signup">Inscription</Link>.
                                        </p>
                                    </AccountPageFooter>
                                </form>
                            </CardContent>

                        </Card>


                    </Col>
                </Row>
            </div>
        );
    }
}

export default Login;
