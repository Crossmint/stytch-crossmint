import '@/styles/globals.css'
import { StytchProvider } from "@stytch/nextjs";
import { createStytchUIClient } from "@stytch/nextjs/ui";

const stytch = createStytchUIClient(process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN);

export default function App({ Component, pageProps }) {
  return (
      <StytchProvider stytch={stytch}>
        <Component {...pageProps} />
      </StytchProvider>
  );
}
