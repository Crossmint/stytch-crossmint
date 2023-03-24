import Link from "next/link";
import Login from "./components/Login";
import { useStytch, useStytchUser } from "@stytch/nextjs";
import { CrossmintNFTCollectionView } from "@crossmint/client-sdk-react-ui";

export default function App({ Component, pageProps }) {
    const stytch = useStytch();
    const { user } = useStytchUser();

    if (!user) return <Login />;

    const params = new URLSearchParams(window.location.search);

    const wallets = [
        {
            chain: params.get("chain"),
            publicKey: params.get("address"),
        },
    ];

    return (
        user && (
            <div>
                <div className={"header"}>
                    <div className={"btn-left"}>
                        <Link href="/">
                            <button>Panel</button>
                        </Link>
                        <Link href="/Nfts">
                            <button>NFTs</button>
                        </Link>
                    </div>

                    <button className="btn-logout" onClick={() => stytch.session.revoke()}>Log out</button>
                </div>

                <div style={{ height: "100vh" }}>
                    {/* Environment can be "staging" or "production" */}
                    <CrossmintNFTCollectionView wallets={wallets} environment="staging"/>
                </div>
            </div>
        )
    );
}
