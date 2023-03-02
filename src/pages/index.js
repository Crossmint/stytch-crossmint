import React from "react";
import App from "./App";
import { StytchProvider } from "@stytch/nextjs";
import TokenAuthenticator from "./components/TokenAuthenticator";
import { createStytchUIClient } from '@stytch/nextjs/ui';

const stytch = createStytchUIClient(process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN);

export default function Home() {
  return (
      <React.StrictMode>
          {/* StytchProvider gives our app access to the Stytch client */}
          <StytchProvider stytch={stytch}>
              <TokenAuthenticator>
                  <App />
              </TokenAuthenticator>
          </StytchProvider>
      </React.StrictMode>
  )
}