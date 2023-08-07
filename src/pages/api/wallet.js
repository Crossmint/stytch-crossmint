import Cookies from "cookies";
import loadStytch from "@/lib/loadStytch";

export default async function handler(req, res) {
    const cookies = new Cookies(req, res);
    const storedSession = cookies.get('stytch_session');

    // If session does not exist return an error
    if (!storedSession) {
        return res.status(400).json({ errorString: 'No session provided' });
    }

    const stytchClient = loadStytch();
    // The `authenticate` function throws an error if the session is invalid
    const { session } = await stytchClient.sessions.authenticate({ session_token: storedSession });

    const userId = session.user_id;

    switch (req.method) {
        case "GET":
            await handleGet(userId, res);
            break;

        case "POST":
            await handlePost(userId, res);
            break;

        default:
            res.status(400).json({ error: true, message: "Unsupported request method" });
            break;
    }
}

async function handlePost(userId, res) {
    const created = await createWallets(userId);
    if (!created) {
        res.status(500).json({ error: true, message: "Failed to create wallets for user" });
        return;
    }

    return res.status(200).json({ error: false });
}

async function handleGet(userId, res) {
    const data = await findExistingWallets(userId);
    if (data.error) {
        res.status(400).json(data);
        return;
    }

    let jsonData = {};

    data.forEach((wallet) => {
        const chain = wallet.chain;
        const address = wallet.publicKey;

        jsonData[chain] = address;
    });

    res.status(200).json(jsonData);
}

async function createWallets(userId) {
    const url = `${process.env.CROSSMINT_BASEURL}/api/v1-alpha1/wallets`;
    const options = {
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            "X-CLIENT-SECRET": process.env.CROSSMINT_X_CLIENT_SECRET,
            "X-PROJECT-ID": process.env.CROSSMINT_X_PROJECT_ID,
        },
        body: JSON.stringify({ chain: "ethereum", userId: userId }),
    };

    try {
        await fetch(url, options);
        return true;
    } catch (error) {
        console.error("Error whilst creating wallets", error);
        return false;
    }
}

async function findExistingWallets(userId) {
    const url = `${process.env.CROSSMINT_BASEURL}/api/v1-alpha1/wallets?userId=${userId}`;
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            "X-CLIENT-SECRET": process.env.CROSSMINT_X_CLIENT_SECRET,
            "X-PROJECT-ID": process.env.CROSSMINT_X_PROJECT_ID,
        },
    };

    try {
        const response = await fetch(url, options);
        return await response.json();
    } catch (error) {
        console.error("Error whilst fetching wallets", error);
        return { error: true, message: "An internal error has occurred" };
    }
}
