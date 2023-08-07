const path = require("path");

module.exports = {
  logger: {
    logPath: process.env.LOGGER_LOG_PATH,
    printToConsole: process.env.LOGGER_PRINT_TO_CONSOLE === "true",
    printToFile: process.env.LOGGER_PRINT_TO_FILE === "true",
    consoleJson: process.env.LOGGER_CONSOLE_FORMAT_JSON === "true",
  },
  server: {
    host: process.env.SERVER_HOST ?? "localhost",
    port: process.env.SERVER_PORT ?? "3000",
    tokenSecret: process.env.SERVER_TOKEN_SECRET ?? "secret",
    tokenLife: process.env.SERVER_TOKEN_LIFE ?? "100m",
    refreshTokenSecret: process.env.SERVER_REFRESH_TOKEN_SECRET ?? "refresh",
  },
  storage: {
    file:
      process.env.FILE_STORAGE_PATH ||
      path.join(process.cwd(), "public", "files"),
  },
  corsSettings: {
    origin: process.env.SERVER_ORIGIN,
    exposedHeaders: process.env.SERVER_EXPOSE_HEADERS?.split(","),
  },
  database: {
    name: process.env.DATABASE_NAME ?? "test",
    host: process.env.DATABASE_HOST ?? "localhost",
    username: process.env.DATABASE_USERNAME ?? "root",
    password: process.env.DATABASE_PASSWORD ?? "cerber1",
    port: process.env.DATABASE_PORT ?? 3306,
    dialect: process.env.DATABASE_DIALECT ?? "mariadb",
    forceSync: process.env.DATABASE_FORCE_SYNC === "true",
  },
  instanceInfo: {
    name: process.env.INSTANCE_INFO_NAME,
    backendURL: process.env.INSTANCE_INFO_BACKEND_URL,
    webURL: process.env.INSTANCE_INFO_WEB_URL,
    webProtocol: process.env.INSTANCE_INFO_WEB_PROTOCOL,
    webDomain: process.env.INSTANCE_INFO_WEB_DOMAIN,
    webPort: process.env.INSTANCE_INFO_WEB_PORT,
  },
  icd: {
    host: process.env.ICD_API_HOSTNAME,
    authHost: process.env.ICD_AUTH_HOSTNAME,
  },
  media: {
    rootFolder: process.env.MEDIA_ROOT_FOLDER,
  },
};
