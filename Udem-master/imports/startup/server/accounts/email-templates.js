import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import getPrivateFile from "../../../modules/server/get-private-file";
import templateToHTML from "../../../modules/server/handlebars-email-to-html";
import templateToText from "../../../modules/server/handlebars-email-to-text";

const name = "AEEMUM";
const email = "<no-reply@umontreal.com>";
const from = `${name} ${email}`;
const { emailTemplates } = Accounts;

emailTemplates.siteName = name;
emailTemplates.from = from;

emailTemplates.verifyEmail = {
	subject() {
		return `[${name}] Confirmer votre couriel`;
	},
	html(user, url) {
		return templateToHTML(getPrivateFile("email-templates/verify-email.html"), {
			applicationName: name,
			firstName: user.profile.name.first,
			verifyUrl: url.replace("#/", ""),
		});
	},
	text(user, url) {
		const urlWithoutHash = url.replace("#/", "");
		if (Meteor.isDevelopment)
			console.info(`Lien de confirmation: ${urlWithoutHash}`); // eslint-disable-line
		return templateToText(getPrivateFile("email-templates/verify-email.txt"), {
			applicationName: name,
			firstName: user.profile.name.first,
			verifyUrl: urlWithoutHash,
		});
	},
};

emailTemplates.resetPassword = {
	subject() {
		return `[${name}] Réinitialiser votre mot de passe`;
	},
	html(user, url) {
		return templateToHTML(
			getPrivateFile("email-templates/reset-password.html"),
			{
				firstName: user.profile.name.first,
				applicationName: name,
				emailAddress: user.emails[0].address,
				resetUrl: url.replace("#/", ""),
			}
		);
	},
	text(user, url) {
		const urlWithoutHash = url.replace("#/", "");
		if (Meteor.isDevelopment)
			console.info(`Lien de réinitialisation: ${urlWithoutHash}`); // eslint-disable-line
		return templateToText(
			getPrivateFile("email-templates/reset-password.txt"),
			{
				firstName: user.profile.name.first,
				applicationName: name,
				emailAddress: user.emails[0].address,
				resetUrl: urlWithoutHash,
			}
		);
	},
};
