import { Redirect, Route } from 'react-router-dom';

import PropTypes from 'prop-types';
import React from 'react';

const Public = ({
  loggingIn, authenticated, afterLoginPath, component, path, exact, ...rest
}) => (
  <Route
    path={path}
    exact={exact}
    render={props => (
      !authenticated ?
        (React.createElement(component, {
          ...props, ...rest, loggingIn, authenticated,
        })) :
        (<Redirect to={afterLoginPath || '/viewcases'} />)
    )}
  />
);

Public.defaultProps = {
  path: '',
  exact: false,
  afterLoginPath: null,
};

Public.propTypes = {
  loggingIn: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  afterLoginPath: PropTypes.string,
  path: PropTypes.string,
  exact: PropTypes.bool,
};

export default Public;
