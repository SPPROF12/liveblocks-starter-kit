import { Liveblocks } from "@liveblocks/node";
import { getProviders } from "@/auth";

// Check if the code is running in a non-browser environment
const isServer = typeof window === "undefined";

// Your Liveblocks secret key
const SECRET_API_KEY = process.env.LIVEBLOCKS_SECRET_KEY;

if (!isServer && SECRET_API_KEY) {
  console.log();
  console.error(
    "DANGER: You're using data from /liveblocks.server.config.ts on the client"
  );
  console.error("This may expose your secret key(s)");
  console.log();
}

if (!SECRET_API_KEY) {
  throw new Error(`You must add your Liveblocks secret key to .env.local to use the starter kit 

Example .env.local file:
LIVEBLOCKS_SECRET_KEY=sk_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

You can find your secret keys on https://liveblocks.io/dashboard/apikeys 
Follow the full starter kit guide on https://liveblocks.io/docs/guides/nextjs-starter-kit
 
`);
}

const liveblocks = new Liveblocks({ secret: SECRET_API_KEY as string });

const checkEnvVar = (variable: string, provider: string) => {
  if (isServer && !process.env[variable]) {
    console.log(`Your ${provider} secrets are missing from .env.local

Example .env.local file:
${variable}=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

Follow the full starter kit guide to learn how to get them:
https://liveblocks.io/docs/guides/nextjs-starter-kit#${provider.toLowerCase()}-authentication
    `);
  }
};

const providers = await getProviders();

if (providers?.github) {
  checkEnvVar("GITHUB_CLIENT_ID", "GitHub");
  checkEnvVar("GITHUB_CLIENT_SECRET", "GitHub");
}

if (providers?.auth0) {
  checkEnvVar("AUTH0_CLIENT_ID", "Auth0");
  checkEnvVar("AUTH0_CLIENT_SECRET", "Auth0");
  checkEnvVar("AUTH0_ISSUER_BASE_URL", "Auth0");
}

if (isServer) {
  (async () => {
    // Your server-side logic here
  })();
}
