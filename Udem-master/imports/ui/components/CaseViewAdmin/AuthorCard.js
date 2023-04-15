import React, { Component } from 'react'

import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
  });
// TODO later fix it to use it - enhancement
class AuthorCard extends Component {

  render() {
    const { classes, author } = this.props;
    return (
       <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="headline" component="h3">
          Auteur(e): {author.name}
        </Typography>
        <Typography component="p">
         Membre depuis
        </Typography>
      </Paper>
    </div>
    )
  }
}

export default withStyles(styles)(AuthorCard);