import { Resend } from "resend";
import { envConfig } from "../config/env-config";

const { apiKey } = envConfig.mailServer.resend;

class MailClient {
  private static readonly resend = new Resend(apiKey);
  private constructor() {}
  public static readonly getResend = () => this.resend;
}

export const resend = MailClient.getResend();
