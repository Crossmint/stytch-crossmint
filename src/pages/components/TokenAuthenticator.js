import { useStytch, useStytchUser } from "@stytch/nextjs";
import { useEffect } from "react";

/*
During both the Magic link and OAuth flow, Stytch will redirect the user back to your application to a specified redirect URL (see Login.js). 
Stytch will append query parameters to the redirect URL which are then used to complete the authentication flow. 
A redirect URL for this example app will look something like: http://localhost:3000/?stytch_token_type=magic_links&token=abc123

TokenAuthenticator will detect the presence of a token in the query parameters, and attempt to authenticate it.
On successful authentication, a session will be created and the user will be shown Profile.js 
*/
const TokenAuthenticator = ({ children }) => {
    const stytch = useStytch();
    const { user } = useStytchUser();

    useEffect(() => {
        // If the stytch SDK is available, and there is no existing user check for a token value in query params
        if (stytch && !user) {
            authenticate(stytch, user);
        }
    }, [stytch, user]);

    return children;
};

async function authenticate(stytch, user) {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    const tokenType = queryParams.get("stytch_token_type");

    // If a token is found, authenticate it with the appropriate method
    if (token == null || tokenType == null) {
        console.error("some appropriate error");
        return;
    }

    const authResponse = await getAuthResponse(stytch, token, tokenType);
    await createWallets(authResponse);
}

async function getAuthResponse(stytch, token, tokenType) {
    switch (tokenType) {
        case "magic_links":
            return stytch.magicLinks.authenticate(token, { session_duration_minutes: 60 });
        case "oauth":
            return stytch.oauth.authenticate(token, { session_duration_minutes: 60 });
        default:
            console.error("some appropriate error");
    }
}

async function createWallets(authResponse) {
    const options = {
        method: "POST",
        body: JSON.stringify({ userId: authResponse.user_id }),
    };

    const response = await fetch("/api/wallet", options);
    const json = await response.json();
    if (json.error) {
        // An error has occurred while attempting to create your wallets
        throw new Error();
    }
}

export default TokenAuthenticator;
