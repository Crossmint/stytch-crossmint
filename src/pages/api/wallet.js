export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            await handleGet(req, res);
            break;

        case "POST":
            await handlePost(req, res);
            break;

        default:
            res.status(400).json({ error: true, message: "Unsupported request" });
            break;
    }
}

async function handlePost(req, res) {
    const body = JSON.parse(req.body);
    const userId = body.userId;
    if (userId === null || userId === undefined) {
        res.status(400).json({ error: true, message: "Missing userId parameter" });
        return;
    }

    const created = await createWallets(userId);
    if (!created) {
        res.status(500).json({ error: true, message: "Failed to create wallets for user" });
        return;
    }

    return res.status(200).json({ error: false });
}

async function handleGet(req, res) {
    const userId = req.query.userId;
    if (userId === null || userId === undefined) {
        res.status(403).json({ error: true, message: "Missing userId parameter" });
        return;
    }

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
            // let's remove `NEXT_PUBLIC` to ensure we're following our own safety procedures re: server-to-server comm only
            "X-CLIENT-SECRET": process.env.X_CLIENT_SECRET,
            "X-PROJECT-ID": process.env.X_PROJECT_ID,
        },
        body: JSON.stringify({ chain: "ethereum", userId: userId }),
    };

    try {
        await fetch(url, options);
        return true;
    } catch (error) {
        return false;
    }
}

async function findExistingWallets(userId) {
    const url = `${process.env.CROSSMINT_BASEURL}/api/v1-alpha1/wallets?userId=${userId}`;
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            // let's remove `NEXT_PUBLIC` to ensure we're following our own safety procedures re: server-to-server comm only
            "X-CLIENT-SECRET": process.env.X_CLIENT_SECRET,
            "X-PROJECT-ID": process.env.X_PROJECT_ID,
        },
    };

    try {
        const response = await fetch(url, options);
        return await response.json();
    } catch (error) {
        return { error: true, message: "An internal error has occurred" };
    }
}
