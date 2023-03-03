import React from "react";
import App from "./App";
import TokenAuthenticator from "./components/TokenAuthenticator";

export default function Home() {
    return (
        <React.StrictMode>
            {/* StytchProvider gives our app access to the Stytch client */}
            <TokenAuthenticator>
                <App/>
            </TokenAuthenticator>
        </React.StrictMode>
    )
}