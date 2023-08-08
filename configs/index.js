const path = require("path");

module.exports = {
  server: {
    host: process.env.SERVER_HOST ?? "localhost",
    port: process.env.SERVER_PORT ?? "3000",
    tokenSecret: process.env.SERVER_TOKEN_SECRET ?? "secret",
    tokenLife: process.env.SERVER_TOKEN_LIFE ?? "10m",
    refreshTokenSecret: process.env.SERVER_REFRESH_TOKEN_SECRET ?? "refresh",
  },
  storage: {
    file:
      process.env.FILE_STORAGE_PATH ||
      path.join(process.cwd(), "public", "files"),
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
};
