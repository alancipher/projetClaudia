import { Redirect, Route } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

class Administrator extends React.Component {
  componentWillMount() {
    this.props.setAfterLoginPath(`${window.location.pathname}${window.location.search}`);
  }

  render() {
    const {
      loggingIn,admin, authenticated, component, path, exact, ...rest
    } = this.props;

    return (
      <Route
        path={path}
        exact={exact}
        render={props => (
          authenticated ? 
          ( admin ?
            (React.createElement(component, {
              ...props, ...rest, loggingIn, admin,
            })) :
            (<Redirect to="/" />)
        ):(<Redirect to="/login" />))
      
      }
      />
    );
  }
}

Administrator.defaultProps = {
  path: '/',
  exact: false,
};

Administrator.propTypes = {
  loggingIn: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  admin: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  setAfterLoginPath: PropTypes.func.isRequired,
  path: PropTypes.string,
  exact: PropTypes.bool,
};

export default Administrator;
