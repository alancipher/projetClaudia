import "./signup.scss";

import { Button, Col, ControlLabel, FormGroup, Row } from "react-bootstrap";

import AccountPageFooter from "../../components/AccountPageFooter/AccountPageFooter";
import { Accounts } from "meteor/accounts-base";
import Avatar from "@material-ui/core/Avatar";
import { Bert } from "meteor/themeteorchef:bert";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import FlatButton from "material-ui/FlatButton";
import InputHint from "../../components/InputHint/InputHint";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import OAuthLoginButtons from "../../components/OAuthLoginButtons/OAuthLoginButtons";
import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import autoBind from "react-autobind";
import red from "@material-ui/core/colors/red";
import swal from "sweetalert";
import validate from "../../../modules/validate";

const styles = (theme) => ({
	card: {
		maxWidth: 400,
		paddingTop: "56.25%",
	},
	media: {
		height: 0,
		paddingTop: "56.25%", // 16:9
	},
	actions: {
		display: "flex",
	},
	expand: {
		transform: "rotate(0deg)",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest,
		}),
		marginLeft: "auto",
	},
	expandOpen: {
		transform: "rotate(180deg)",
	},
	avatar: {
		backgroundColor: red[500],
	},
});

class Signup extends React.Component {
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
				lastName: {
					required: true,
				},
				emailAddress: {
					required: true,
					email: true,
				},
				password: {
					required: true,
					minlength: 6,
				},
			},
			messages: {
				firstName: {
					required: "Entrez votre prenom.",
				},
				lastName: {
					required: "Entrez votre nom de famille.",
				},
				emailAddress: {
					required: "Entrez votre addresse courriel.",
					email: "Le format de ce couriel n'est pas valide.",
				},
				password: {
					required: "Entrez un mot de passe.",
					minlength: "Votre mot de passe doit avoir au moins 6 characteres.",
				},
			},
			submitHandler() {
				component.handleSubmit(component.form);
			},
		});
	}

	handleSubmit(form) {
		const { history } = this.props;

		//verifier que c'est une adresse umontreal
		var emailToCheck = form.emailAddress.value.split("@").slice(1);

		var allowedDomains = ["umontreal.ca", "perfectionclinique.com"];

		if ($.inArray(emailToCheck[0], allowedDomains) !== -1) {
			//acceptable
			// TODO if joycava make supreme user
			Accounts.createUser(
				{
					email: form.emailAddress.value,
					password: form.password.value,
					profile: {
						name: {
							first: form.firstName.value,
							last: form.lastName.value,
						},
					},
				},
				(error) => {
					if (error) {
						swal(error.reason, { icon: "error" });
					} else {
						Meteor.call("users.sendVerificationEmail");
						swal("Bienvenue!", { icon: "success" });
						// TODO this is when you trigger the explanatory modal
						history.push("/cases");
					}
				}
			);
		} else {
			//not acceptable
			swal(
				"Cette application est exclusive au membre de l'Université de Montréal.",
				{ icon: "error" }
			);
		}
	}

	render() {
		return (
			<div className='Login'>
				<Row>
					<Col
						xs={12}
						smOffset={3}
						sm={6}
						md={6}
						mdOffset={3}
						lgOffset={4}
						lg={4}
					>
						<Card style={styles.card}>
							<CardHeader
								align='center'
								title={<img src='img/aeemum.png' alt='AEEMUM' />}
								subheader='Inscription'
							/>

							<CardContent>
								<form
									ref={(form) => (this.form = form)}
									onSubmit={(event) => event.preventDefault()}
								>
									<Row>
										<Col xs={6}>
											<FormGroup>
												<ControlLabel>Prénom</ControlLabel>
												<input
													type='text'
													name='firstName'
													className='form-control'
												/>
											</FormGroup>
										</Col>
										<Col xs={6}>
											<FormGroup>
												<ControlLabel>Nom de famille</ControlLabel>
												<input
													type='text'
													name='lastName'
													className='form-control'
												/>
											</FormGroup>
										</Col>
									</Row>
									<FormGroup>
										<ControlLabel>Adresse courriel</ControlLabel>
										<input
											type='email'
											name='emailAddress'
											className='form-control'
										/>
									</FormGroup>
									<FormGroup>
										<ControlLabel>Mot de passe</ControlLabel>
										<input
											type='password'
											name='password'
											className='form-control'
										/>
										<InputHint>Minimum de 6 caractères</InputHint>
									</FormGroup>
									<Button type='submit' bsStyle='success'>
										Inscription
									</Button>
									<AccountPageFooter>
										<p>
											Vous avez déjà un compte?{" "}
											<Link to='/login'>Connexion</Link>.
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

Signup.propTypes = {
	history: PropTypes.object.isRequired,
};

export default Signup;
