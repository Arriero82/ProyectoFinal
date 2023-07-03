import dotenv from "dotenv";

let path = "";

if (!process.env.NODE_ENV) {
  path = `./.env`;
} else {
  path = `./.${process.env.NODE_ENV}.env`;
}

dotenv.config({
  path: path,
});

const config = {
  port: {
    port: process.env.PORT || 8082,
  },
  mongodb: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
  passportGithub: {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CBK_URL,
  },
  persistence: {
    persistence: process.env.PERSISTENCE,
  },
  email: {
    serviceMail: process.env.SERVICE_MAIL,
    serviceMailPort: process.env.SERVICE_MAIL_PORT,
    emailUser: process.env.EMAIL_USER,
    emailPassword: process.env.EMAIL_PASS,
  },
};

export default config;
