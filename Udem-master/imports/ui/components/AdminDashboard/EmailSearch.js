import { Col, Grid, Row } from 'react-flexbox-grid';

import Autosuggest from 'react-autosuggest';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { inlineContent } from '../../../../node_modules/juice';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { white } from 'material-ui/styles/colors';
import { withStyles } from '@material-ui/core/styles';

function renderInput(inputProps) {
    const { classes, ref, ...other } = inputProps;

    return (
        <TextField
            fullWidth
            InputProps={{
                inputRef: ref,
                classes: {
                    input: classes.input,
                },
                ...other,
            }}
        />
    );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion, query);
    const parts = parse(suggestion, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map((part, index) => {
                    return part.highlight ? (
                        <span key={String(index)} style={{ fontWeight: 500 }}>
                            {part.text}
                        </span>
                    ) : (
                            <strong key={String(index)} style={{ fontWeight: 300 }}>
                                {part.text}
                            </strong>
                        );
                })}
            </div>
        </MenuItem>
    );
}

function renderSuggestionsContainer(options) {
    const { containerProps, children } = options;

    return (
        <Paper {...containerProps} square>
            {children}
        </Paper>
    );
}

function getSuggestionValue(suggestion) {
    return suggestion;
}

function getSuggestions(value, suggestions) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {
            const keep =
                count < 5 && suggestion.toLowerCase().slice(0, inputLength) === inputValue;

            if (keep) {
                count += 1;
            }

            return keep;
        });
}

const styles = theme => ({

    container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    margin: {
        margin: theme.spacing.unit,
    },
    withoutLabel: {
        marginTop: theme.spacing.unit * 3,
    },
    checboxes: {
        display: inlineContent,
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    item: {
        width: '92%',
    },
    seperateInput: {
        backgroundColor: white,
        padding: 3,
        justifyContent: 'center',
        height: 60,
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
});



class EmailSearch extends React.Component {
    state = {
        value: '',
       
        suggestions: this.props.emailsArray ? this.props.emailsArray : [],
    };
    componentDidMount = () => {
        console.log("component did mount");
        this.props.onSetUsers(this.props.usersArray);
        this.generateSearchArray(this.state.value)
      };

    handleSuggestionsFetchRequested = ({ value }) => {
        console.log("handleSuggestionsFetchRequested");
        this.setState({
            suggestions: getSuggestions(value, this.props.emailsArray),
        },
        () => { this.generateSearchArray(this.state.value) });
        this.generateSearchArray(this.state.value)
    };

    handleSuggestionsClearRequested = () => {
        console.log("handleSuggestionsClearRequested value is" + this.state.value);
        this.setState({
            suggestions: [],
        },
        () => { this.generateSearchArray(this.state.value) });

        // this.generateSearchArray(this.state.value)
    };
    componentWillUnmount = () =>{ 
        this.props.onSetUserSearchArray([]);
    }
    handleChangeCheckbox = name => event => {
        this.setState({ [name]: event.target.checked },
            () => { this.generateSearchArray(this.state.value) });
        ;
    };

    generateSearchArray = (newValue) => {

        console.log("New value is " + newValue);
        //after setting the new value we display the results by filtering the new searchArray
      
const newArray = this.props.usersArray.filter((userDoc)=>{
            for(var i =0; i< userDoc.emails.length; i++){
                    //check with all the emails
                    if(userDoc.emails[i].address.includes(newValue)){
                        return true;
                    }

            }
            //if nothing returns tru in the loop , return false
            return false;
});
       
            this.props.onSetUserSearchArray(newArray);
      
    }
    handleChange = (event, { newValue }) => {
        this.setState({
            value: newValue,
        },
        () => { this.generateSearchArray(newValue) });

        this.generateSearchArray(newValue);


    };

    render() {
        const { classes } = this.props;

        return (
            <Grid fluid>
                <Row>
                    <Col xs={12} sm={12} className="search-bar">
                    <Autosuggest
                        theme={{
                            container: classes.container,
                            suggestionsContainerOpen: classes.suggestionsContainerOpen,
                            suggestionsList: classes.suggestionsList,
                            suggestion: classes.suggestion,
                        }}
                        renderInputComponent={renderInput}
                        suggestions={this.state.suggestions}
                        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                        renderSuggestionsContainer={renderSuggestionsContainer}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={{
                            classes,
                            placeholder: this.props.label,
                            value: this.state.value,
                            onChange: this.handleChange,
                        }}
                    />
                    </Col>
                </Row>
                <Row>
                               </Row>


            </Grid>
        );
    }
}

EmailSearch.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmailSearch);
    