import { DefaultSession } from "next-auth";

export interface AppSession extends DefaultSession {
  accessToken?: string;
}
