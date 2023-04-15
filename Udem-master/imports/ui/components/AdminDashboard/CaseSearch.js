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

// FIXME READY FOR FINAL STYLING 

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



class CaseSearch extends React.Component {
    state = {
        value: '',
        facile: true,
        moyen: true,
        difficile: true,
        suggestions: this.props.reasonArray ? this.props.reasonArray : [],
    };
    componentWillMount = () => {
        this.props.onSetReasonArray(this.generateReasonArray(this.props.cases));
        this.props.onSetSystemeArray(this.generateSystemeArray(this.props.cases));
    }
    componentDidMount = () => {

        this.props.onSetReasonArray(this.generateReasonArray(this.props.cases));
        this.props.onSetSystemeArray(this.generateSystemeArray(this.props.cases));

    }
    handleSuggestionsFetchRequested = ({ value }) => {
        // console.log("handleSuggestionsFetchRequested");
        this.setState({
            suggestions: getSuggestions(value, this.props.reasonArray),
        },
            () => { this.generateSearchArray(this.state.value) });
        this.generateSearchArray(this.state.value)
    };

    handleSuggestionsClearRequested = () => {
        // console.log("handleSuggestionsClearRequested value is" + this.state.value);
        this.setState({
            suggestions: [],
        },
            () => { this.generateSearchArray(this.state.value) });

        // this.generateSearchArray(this.state.value)
    };

    handleChangeCheckbox = name => event => {
        this.setState({ [name]: event.target.checked },
            () => { this.generateSearchArray(this.state.value) });
        ;
    };
    generateReasonArray = (baseArray) => {

        var reasonObject = [];
        // console.log('in generateReasonArray');
        // console.log('base aray is ');
        // console.log(baseArray);
        // console.log('now creating reasonObect');
        baseArray.forEach(function (caseDoc) {
            // console.log(reasonObject)
            reasonObject = reasonObject.concat(caseDoc.gabarit.reason);
        });

        // console.log("Reason array is ");
        // console.log(reasonObject);

        //remove duplicates from the array 
        var finalReasonObject = reasonObject.filter(function (value, index, self) {

            return self.indexOf(value) == index;
        });

        // console.log("final reason object is :");
        // console.log(finalReasonObject)
       
        return (finalReasonObject.length == 0 ) ? [""] : Array.from(finalReasonObject);
    };


    generateSystemeArray = (baseArray) => {

        var systemeObject = [];
        // console.log('in generateSystemeArray');
        // console.log('base aray is ');
        // console.log(baseArray);
        // console.log('now creating systemeObect');
        baseArray.forEach(function (caseDoc) {
            // console.log(systemeObject)
            systemeObject = systemeObject.concat(caseDoc.gabarit.systeme);
        });

        // console.log("Systeme array is ");
        // console.log(systemeObject);

        //remove duplicates from the array 
        var finalSystemeObject = systemeObject.filter(function (value, index, self) {

            return self.indexOf(value) == index;
        });

        // console.log("final systeme object is :");
        // console.log(finalSystemeObject)
        if (finalSystemeObject.length == 0) {
            finalSystemeObject = [""];
        }
        return (finalSystemeObject.length == 0 ) ? [""] : Array.from(finalSystemeObject);
    };


    generateNameArray = (baseArray) => {

        var systemeObject = [];
        // console.log('in generateNameArray');
        // console.log('base aray is ');
        // console.log(baseArray);
        // console.log('now creating NameObect');
        baseArray.forEach(function (caseDoc) {
            // console.log(systemeObject)
            systemeObject = systemeObject.concat(caseDoc.gabarit.nom);
        });

        // console.log("Systeme name is ");
        // console.log(systemeObject);

        //remove duplicates from the array 
        var finalSystemeObject = systemeObject.filter(function (value, index, self) {

            return self.indexOf(value) == index;
        });

        // console.log("final systeme object is :");
        // console.log(finalSystemeObject)
        if (finalSystemeObject.length == 0) {
            finalSystemeObject = [""];
        }
        return (finalSystemeObject.length == 0 ) ? [""] : Array.from(finalSystemeObject);
    };
    generateSearchArray = (newValue) => {

        // console.log("New value is " + newValue);
        //after setting the new value we display the results by filtering the new searchArray
        var toCompare;

        if (newValue == '' || newValue == "") {
            // console.log('in if');
            const newSearchArrayLevel = this.props.casesArray.filter(({ gabarit, ...caseDoc }) => {
                //if the value entered by the user matches with part of the current value obj it returns true

                //then filter the levels
                switch (gabarit.niveau) {
                    case 'Difficile': {
                        // console.log('case is Difficile , state is ' + this.state.difficile);
                        return this.state.difficile;
                    }
                    case 'Moyen': {
                        // console.log('case is Moyen , state is ' + this.state.moyen);
                        return this.state.moyen;
                    }
                    case 'Facile': {
                        // console.log('case is Facile , state is ' + this.state.facile);
                        return this.state.facile;
                    }

                }

            });
            this.props.onSetSearchArray(newSearchArrayLevel);
        } else {
            // console.log('in else');

            const newSearchArray = this.props.casesArray.filter(({ gabarit, ...caseDoc }) => {
                //if the value entered by the user matches with part of the current value obj it returns true
                toCompare = gabarit.reason.toLowerCase();

                // console.log(toCompare + " "+newValue);
                if (toCompare.includes(newValue.toLowerCase())) {
                    //then filter the levels
                    switch (gabarit.niveau) {
                        case 'Difficile': {
                            // console.log('case is Difficile , state is ' + this.state.difficile);
                            return this.state.difficile;
                        }
                        case 'Moyen': {
                            // console.log('case is Moyen , state is ' + this.state.moyen);
                            return this.state.moyen;
                        }
                        case 'Facile': {
                            // console.log('case is Facile , state is ' + this.state.facile);
                            return this.state.facile;
                        }

                    }
                }
            });
            this.props.onSetSearchArray(newSearchArray);
        }
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
                    <Col xs={12} sm={8} className="search-checkbox">
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.facile}
                                        onChange={this.handleChangeCheckbox('facile')}
                                        value="facile"
                                        color="default"
                                    />
                                }
                                label="Facile"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.moyen}
                                        onChange={this.handleChangeCheckbox('moyen')}
                                        value="moyen"
                                        color="default"
                                    />
                                }
                                label="Moyen"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.difficile}
                                        onChange={this.handleChangeCheckbox('difficile')}
                                        value="difficile"
                                        color="default"
                                    />
                                }
                                label="Difficile"
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={12} sm={4} className="search-checkbox">
                        <div></div>

                </Col> 
                </Row>


            </Grid>
        );
    }
}

CaseSearch.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CaseSearch);
