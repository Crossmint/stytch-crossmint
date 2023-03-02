import { StytchLogin } from "@stytch/nextjs";
import { Products } from "@stytch/vanilla-js";

/*
Login configures and renders the StytchLogin component which is a prebuilt UI component for auth powered by Stytch

This component accepts style, config, and callbacks props. To learn more about possible options review the documentation at
https://stytch.com/docs/sdks/javascript-sdk#ui-configs
*/
const Login = () => {
  const config = {
    products: [Products.emailMagicLinks, Products.oauth],
    emailMagicLinksOptions: {
      loginRedirectURL: "http://localhost:3000",
      loginExpirationMinutes: 60,
      signupRedirectURL: "http://localhost:3000",
      signupExpirationMinutes: 60,
    },
    oauthOptions: {
      providers: [{ type: "google" }],
      loginRedirectURL: "http://localhost:3000",
      loginExpirationMinutes: 60,
      signupRedirectURL: "http://localhost:3000",
      signupExpirationMinutes: 60,
    },
  };

  return (
    <div className={"login-container"}>
      <div className={"stytch"}>
        <StytchLogin config={config} styles={styles} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
  },
  buttons: {
    primary: {
      backgroundColor: "#4A37BE",
      borderColor: "#4A37BE",
    },
  },
};

export default Login;
