import dotenv from "dotenv";

dotenv.config();

function loadEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`ENV variable with key:${key} is missing`);
  return value;
}

export const envConfig = {
  db: {
    engine: loadEnv("DB_ENGINE"),
    host: loadEnv("DB_HOST"),
    port: Number(loadEnv("DB_PORT")),
    user: loadEnv("DB_USER"),
    password: loadEnv("DB_PASSWORD"),
    dbName: loadEnv("DB_NAME"),
  },
  cloudinary: {
    publicCloudName: loadEnv("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME"),
  },
  auth: {
    url: loadEnv("AUTH_URL"),
    secret: loadEnv("AUTH_SECRET"),
  },
  authProviders: {
    google: {
      clientId: loadEnv("AUTH_GOOGLE_ID"),
      clientSecret: loadEnv("AUTH_GOOGLE_SECRET"),
      issuer: loadEnv("AUTH_GOOGLE_ISSUER"),
    },
    facebook: {
      //
    },
  },
  mailServer: {
    resend: {
      apiKey: loadEnv("RESEND_API_KEY"),
    },
  },
};
