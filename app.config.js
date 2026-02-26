import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  extra: {
    FIREBASE_API_KEY: process.env.API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.PROJECT_ID,
    FIREBASE_MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.APP_ID,
    GOOGLE_ANDROID_CLIENT_ID_DEBUG: process.env.GOOGLE_ANDROID_CLIENT_ID_DEBUG,
    GOOGLE_ANDROID_CLIENT_ID_RELEASE: process.env.GOOGLE_ANDROID_CLIENT_ID_RELEASE,
  },
});
