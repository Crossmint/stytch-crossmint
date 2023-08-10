import { useStytch, useStytchSession, useStytchUser } from "@stytch/nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";

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

    const logout = async () => {
        window.history.replaceState({}, document.title, window.location.pathname);
        await stytch.session.revoke();
    }

    return (
        <>
            <div className={""}>
                <div className={"header"}>
                    <div className={"btn-left"}>
                        <Link href="/">
                            <button>Panel</button>
                        </Link>
                        <Link href={"/Nfts?chain=ethereum&address=" + wallet.ethereum}>
                            <button>NFTs</button>
                        </Link>
                    </div>

                    <button className="btn-logout" onClick={logout}>Log out</button>
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
