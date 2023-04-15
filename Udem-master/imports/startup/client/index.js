import 'typeface-roboto';
import '../../ui/stylesheets/app.scss';
import '../both/api';

import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import { applyMiddleware, createStore } from 'redux';

import App from '../../ui/layouts/App/App';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Meteor} from 'meteor/meteor';
import { Provider } from "react-redux";
import React from 'react';
import configureStore from '../../ui/store/configureStore';
import indigo from '@material-ui/core/colors/indigo';
import {render} from 'react-dom';
import teal from '@material-ui/core/colors/teal';

const store = configureStore();

// FIXME mui palette
const theme = createMuiTheme({
    palette: {
        primary: {
            // light: '#303f9f',
            main: '#303f9f',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contast with palette.primary.main
        },
        secondary: {
            // light: '#009688',
            main: '#00796b',

        },
        // error: will use the default color
    },

    overrides: {
        MuiListItemText: { // Name of the component ⚛️ / style sheet
            primary: { // Name of the rule
                fontSize: 16, // Some CSS
                maxWidth: '80%',
                fontStyle:'bold',
                

            },
            secondary: { // Name of the rule
                fontSize: 14.5, // Some CSS
                align: 'right',
                maxWidth: '80%',
                fontStyle:'italic',
                
            },
        },
        MuiTypography: {
            paragraph: {
                fontSize: 13,
            },
            body1: {
                fontSize: 13,
            }
        },
        MuiModal: {
            root: {
                fontSize: 13,
                
            }
        },
        MuiInput: {
            root:{
                fontSize: 14,
            }
        },

        MuiInputLabel: {
            root:{
                fontSize: 14,
            }
        },
        MuiFormLabel: {
            root:{
                fontSize: 16,
            }
        },
        MuiSelect:{
            root:{
                fontSize: 14,
            }
        },
        MuiMenuItem:{
            root:{
                fontSize: 14,
            }
        },
        MuiButton:{
            label:{
                fontSize: 12,
                padding: 1.5,
            }
        },
        MuiTooltip:{
            tooltip:{
                fontSize: 12,
            }
        },
        MuiTableCell:{
            root:{
                fontSize: 13,
            },
            head:{
                fontSize: 15,
            },
            body:{
                fontSize: 13,
            }
        }

    },
});

Meteor.startup(() => render(
    <Provider store={store}>
    <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        <App/>
    </MuiThemeProvider>
 </Provider>
    , document.getElementById('react-root')));
