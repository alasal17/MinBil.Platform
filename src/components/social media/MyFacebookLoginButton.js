import React from "react";
import {createButton} from "react-social-login-buttons";

const config = {
  text: "Log in with Facebook",
  icon: "facebook",
  iconFormat: name => `fa fa-${name}`,
  style: { background: "#3b5998" },
  activeStyle: { background: "#293e69" }
};
/** My Facebook login button. */
const MyFacebookLoginButton = createButton(config);

export default MyFacebookLoginButton;