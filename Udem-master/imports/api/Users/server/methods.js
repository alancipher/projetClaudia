import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { check } from 'meteor/check';
import deleteAccount from './delete-account';
import editProfile from './edit-profile';
import exportData from './export-data';
import handleMethodException from '../../../modules/handle-method-exception';
import rateLimit from '../../../modules/rate-limit';

Meteor.methods({
  'users.sendVerificationEmail': function usersSendVerificationEmail() {
    // set up the template 
    

    return Accounts.sendVerificationEmail(this.userId);
  },
  'users.editProfile': function usersEditProfile(profile) {

    console.log(profile);
    check(profile, {
      emailAddress: String,
      profile: {
        name: {
          first: String,
          last: String,
        },
        creationInterest: Boolean,
      },
    });

    return editProfile({ userId: this.userId, profile })
      .then(response => response)
      .catch((exception) => {
        handleMethodException(exception);
      });
  },
  'user.updateRole': function userUpdateRole(userId, role, action) {
    console.log("In updateRole " + userId + " " + role + " " + action);
    check(userId, String);
    check(role, String);
    check(action, String);

    switch (action) {
      case "promote": 
        console.log(action);
        Roles.addUsersToRoles(userId, [role]);
        break;
      
      case "demote": 
        console.log(action);
        Roles.setUserRoles(userId, ["user"]);
        break;
      
      case "ghost": 
        console.log(action);
        Roles.addUsersToRoles(userId, ["ghost"]);
        break;
      
      case "dev": 
        console.log(action);
        Roles.addUsersToRoles(userId, [role, "admin", "editor"]);
      
      break;
      case "supreme": 
        console.log(action);
        Roles.addUsersToRoles(userId, ["supreme", "admin", "editor", "dev"]);
      break;
      default :
    }






  },
  'users.exportData': function usersExportData() {
    return exportData({ userId: this.userId })
      .then(response => response)
      .catch((exception) => {
        handleMethodException(exception);
      });
  },
  'users.deleteAccount': function usersDeleteAccount() {
    return deleteAccount({ userId: this.userId })
      .then(response => response)
      .catch((exception) => {
        handleMethodException(exception);
      });
  },
});

rateLimit({
  methods: [
    'users.sendVerificationEmail',
    'users.editProfile',
    'users.exportData',
    'users.deleteAccount',
  ],
  limit: 5,
  timeRange: 1000,
});
