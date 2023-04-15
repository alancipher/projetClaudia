import { Meteor } from 'meteor/meteor';
import getOAuthProfile from '../../../modules/get-oauth-profile';
import sendEmail from '../../../modules/server/send-email';

export default (options, user) => {
  const OAuthProfile = getOAuthProfile(options, user);

  const applicationName = 'AEEMUM';
  const firstName = OAuthProfile ? OAuthProfile.name.first : options.profile.name.first;
  const emailAddress = OAuthProfile ? OAuthProfile.email : options.email;

  return sendEmail({
    to: emailAddress,
    from: `${applicationName} < support@aeemum.com >`,
    subject: `[${applicationName}] Bienvenue, ${firstName}!`,
    template: 'welcome',
    templateVars: {
      applicationName,
      firstName,
      welcomeUrl: Meteor.absoluteUrl('cases'), // e.g., returns http://localhost:3000/documents
    },
  })
    .catch((error) => {
      throw new Meteor.Error('500', `${error}`);
    });
};
