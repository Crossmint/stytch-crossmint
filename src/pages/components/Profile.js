import { useStytch, useStytchSession, useStytchUser } from "@stytch/nextjs";
import { useEffect, useState } from "react";

const Profile = () => {
    async function getWallet(user) {
        if (user == null) {
            return;
        }

        const userId = user.user_id;

        const response = await fetch(`/api/wallet?userId=${userId}`);
        const data = await response.json();

        if (data.error) {
            setWallet({ error: data.error });
        }

        setWallet(data);
    }

    const stytch = useStytch();
    // Get the Stytch User object if available
    const { user } = useStytchUser();
    // Get the Stytch Session object if available
    const { session } = useStytchSession();

    const [wallet, setWallet] = useState({ wallet: "Loading..." });

    useEffect(() => {
        if (user != null) {
            getWallet(user);
        }
    }, [user]);

    return (
        <>
            <div className={""}>
                <div className={"header"}>
                    <button className="btn-logout" onClick={() => stytch.session.revoke()}>
                        Log out
                    </button>
                </div>
            </div>
            <div className="card">
                <h2>Wallets</h2>
                <pre className="code-block">
                    <code>{JSON.stringify({ ...wallet }, null, 2)}</code>
                </pre>
            </div>
        </>
    );
};

export default Profile;
