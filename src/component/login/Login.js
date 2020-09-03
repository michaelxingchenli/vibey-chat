import React, { useEffect } from "react";
import { provider, auth } from "../../firebase";
import "./Login.scss";

import { Button } from "@material-ui/core";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";

import blobBg from "./loginBg";

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

  useEffect(() => {
    blobBg();
  }, []);

  return (
    <div className="login">
      <div className="login__logo"></div>
      <div className="login__container">
        <div className="login__text">
          <h2>Welcome back!</h2>
          <h3>We are so excited to see you again!</h3>
        </div>
        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </div>
  );
}

Login.propTypes = {};

export default Login;
