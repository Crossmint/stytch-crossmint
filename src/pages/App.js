import { useStytchUser } from "@stytch/nextjs";
import Login from "./components/Login";
import Profile from "./components/Profile";

export default function App({ Component, pageProps }) {
    // The useStytchUser hook will return the existing Stytch User object if one exists
    const { user } = useStytchUser();
    // If there is a user show the profile, otherwise show the login form
    return <div className="container">{user ? <Profile /> : <Login />}</div>;
}
