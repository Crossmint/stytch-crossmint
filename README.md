## Set up

Follow the steps below to get this application fully functional and running using your own Stytch credentials.

### In the Stytch Dashboard

1. Create a [Stytch](https://stytch.com/) account. Once your account is set up a Project called "My first project" will be automatically created for you.

2. Within your new Project, navigate to [SDK configuration](https://stytch.com/dashboard/sdk-configuration), and make the following changes:

    - Click **Enable SDK**.
    - Under **Authorized environments** add the domain `http://localhost:3000`.

      <img width="400" alt="Authorized environments" src="https://user-images.githubusercontent.com/100632220/217052985-2e6fc264-7b8b-452b-9d24-66a76c143d10.png">

    - Within the **Email Magic Links** drawer, toggle on **Enable the LoginOrCreate Flow**.

      <img width="400" alt="SDK Email Magic Links" src="https://user-images.githubusercontent.com/100632220/217053215-8c369de8-7828-4ad6-ac88-a50918520fc3.png">

    - Toggle on **OAuth**.

      <img width="400" alt="SDK OAuth" src="https://user-images.githubusercontent.com/100632220/217053483-e757d1aa-af18-4af3-a476-45860ca3065f.png">

3. Navigate to [Redirect URLs](https://stytch.com/dashboard/redirect-urls), and add `http://localhost:3000` as the types **Login** and **Sign-up**.

   <img width="400" alt="Redirect URLs" src="https://user-images.githubusercontent.com/100632220/217054016-913cabda-098e-4436-9829-2f33e7db05a7.png">

4. Navigate to [OAuth](https://stytch.com/dashboard/oauth), and set up login for Google in the Test environment. Follow all the instructions provided in the Dashboard. If you are not interested in OAuth login you can skip this step. However, the _Continue with Google_ button in this application will not work.

   <img width="400" alt="OAuth configuration" src="https://user-images.githubusercontent.com/100632220/217055674-a7dafc17-6ad3-492f-8dd2-92560d60dc00.png">

5. Finally, navigate to [API Keys](https://stytch.com/dashboard/api-keys), and copy your `public_token`. You will need this value later on.

### On your machine

In your terminal clone the project and install dependencies:

```bash
git clone https://github.com/Crossmint/stytch-crossmint.git
cd stytch-crossmint
yarn
```

Next, create `.env.local` file by running the command below and your `public_token`. Learn more about Create React App's support for [custom environment variables here](https://create-react-app.dev/docs/adding-custom-environment-variables/).

```bash
echo "REACT_APP_STYTCH_PUBLIC_TOKEN=YOUR_TOKEN_HERE" > .env.local
# For example, echo "REACT_APP_STYTCH_PUBLIC_TOKEN=public-token-test-123abcd-1234-1234-abcd-123123abcabc" > .env.local
```

## Running locally

After completing all the set up steps above the application can be run with the command:

```bash
yarn dev
```

The application will be available at [`http://localhost:3000`](http://localhost:3000).

You'll be able to login with Email Magic Links or Google OAuth and see your Stytch User object, Stytch Session, and see how logging out works.
