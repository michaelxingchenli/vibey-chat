import React from "react";
import PropTypes from "prop-types";
import { provider, auth } from "./firebase";
import "./Login.scss";

import { Button } from "@material-ui/core";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) =>
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        })
      )
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__logo"></div>
        <div className="login__text">
          <h1>Sign in to Chatter</h1>
        </div>
        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </div>
  );
}

Login.propTypes = {};

export default Login;
