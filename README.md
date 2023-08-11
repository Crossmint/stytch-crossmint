# Stytch Auth + Crossmint Wallets example

Create in under 5 minutes a fully functional user account system, with magic links and google auth, where each user has NFT custodial wallets created. This sample code uses Stytch for authentication and Crossmint for wallet creation.

## 1. Stytch set up

### Stytch Dashboard

1.  Create a [Stytch](https://stytch.com/) account. Once your account is set up a Project called "My first project" will be automatically created for you.

2.  Within your new Project, navigate to [SDK configuration](https://stytch.com/dashboard/sdk-configuration), and make the following changes:

    -   Click **Enable SDK**.
    -   Under **Authorized environments** add the domain `http://localhost:3000`.

    <img width="400" alt="Authorized environments" src="https://user-images.githubusercontent.com/100632220/217052985-2e6fc264-7b8b-452b-9d24-66a76c143d10.png">

    -   Within the **Email Magic Links** drawer, toggle on **Enable the LoginOrCreate Flow**.

    <img width="400" alt="SDK Email Magic Links" src="https://user-images.githubusercontent.com/100632220/217053215-8c369de8-7828-4ad6-ac88-a50918520fc3.png">

    -   Toggle on **OAuth**.

    <img width="400" alt="SDK OAuth" src="https://user-images.githubusercontent.com/100632220/217053483-e757d1aa-af18-4af3-a476-45860ca3065f.png">

3.  Navigate to [Redirect URLs](https://stytch.com/dashboard/redirect-urls), and add `http://localhost:3000` as the types **Login** and **Sign-up**.

 <img width="400" alt="Redirect URLs" src="https://user-images.githubusercontent.com/100632220/217054016-913cabda-098e-4436-9829-2f33e7db05a7.png">

4. Navigate to [OAuth](https://stytch.com/dashboard/oauth), and set up login for Google in the Test environment. Follow all the instructions provided in the Dashboard. If you are not interested in OAuth login you can skip this step. However, the _Continue with Google_ button in this application will not work.

 <img width="400" alt="OAuth configuration" src="https://user-images.githubusercontent.com/100632220/217055674-a7dafc17-6ad3-492f-8dd2-92560d60dc00.png">

5. Finally, navigate to [API Keys](https://stytch.com/dashboard/api-keys), and copy your `public_token`, `STYTCH_PROJECT_ID`, and `STYTCH_SECRET`. You will need this value later on.

### On your machine

In your terminal clone the project and install dependencies:

```bash
git clone https://github.com/Crossmint/stytch-crossmint.git
cd stytch-crossmint
yarn
```

Next, create an `.env.local` file at the project root folder, and copy paste the following line inside:

```bash
NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN=YOUR_STYTCH_PUBLIC_TOKEN_HERE
# For example, "NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN=public-token-test-123abcd-1234-1234-abcd-123123abcabc"
```

## 2. Crossmint set up

Now we are going to sign up to Crossmint and create an API key that allows us to create and manage wallet for our users. During development, we're going to create wallets in the free sandbox environment ('staging').

### In the Crossmint console

1. Go to [staging.crossmint.com/console](https://staging.crossmint.com/console) and follow the steps to create an account.

2. Navigate to [API keys](https://staging.crossmint.com/console/projects/apiKeys) and click on New API Key. Then check the `wallets.read` and `wallets.create` scopes -- this will give your API key permission to create and manage crypto wallets for your users. Finally save your new key and copy the `CLIENT SECRET` and `Project ID` values for later.

### On your machine

Go back to your project, open again the `.env.local` file, and enter the following three lines:

```bash
CROSSMINT_BASEURL=https://staging.crossmint.com
CROSSMINT_X_CLIENT_SECRET=YOUR_CROSSMINT_CLIENT_SECRET_HERE
CROSSMINT_X_PROJECT_ID=YOUR_CROSSMINT_PROJECT_ID_HERE
```

And then save.

Please note: make sure the clent secret doesn't get leaked, as it would allow others to create wallets for your users.

## Running locally

After completing the setup steps above the application can be run with the command:

```bash
yarn dev
```

The application will be available at [`http://localhost:3000`](http://localhost:3000).

You'll be able to login with Email Magic Links or Google OAuth and see your Stytch User object, Stytch Session, and see how logging out works.

## Deploy via Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FCrossmint%2Fstytch-crossmint&env=NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN,CROSSMINT_X_CLIENT_SECRET,CROSSMINT_X_PROJECT_ID,CROSSMINT_BASEURL)

## Final result:
#### Authentication page
<img width="1407" alt="Screenshot 2023-03-03 at 9 21 10 AM" src="https://user-images.githubusercontent.com/113327185/222746723-1581ba00-8743-4d76-a571-3b771725ff94.png">

#### Post-login page:
<img width="1433" alt="Screenshot 2023-03-03 at 9 21 48 AM" src="https://user-images.githubusercontent.com/113327185/222746927-d675ad82-c5c4-4845-ab7b-502298619be0.png">
