const http = require("http");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
const EntityFactory = require("./entityFactory");
const helmet = require("helmet");
const log4js = require("log4js");
const config = require("./configs");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
// set HTTP response headers
app.use(helmet());
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: "auto" }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", require("./routes"));

app.use((_req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((error, _req, res, _next) => {
  console.log("error.message", error.message);
  const { code = 500, message = "Server error" } = error;
  console.log("code", code);

  if (
    error.message.includes("validation failed") ||
    error.message.includes("Validation error")
  ) {
    res.status(400).json({
      status: "fail",
      code: 400,
      message,
    });
    return;
  }

  if (error.code.includes("LIMIT_UNEXPECTED_FILE")) {
    res.status(400).json({
      status: "fail",
      code: 400,
      message,
    });
    return;
  }

  res.status(code).json({
    status: "fail",
    code,
    message,
  });
});

const server = http.createServer(app);

const startServer = async () => {
  // Database initialization
  await EntityFactory.init();

  // Server initialization
  await server.listen(config.server.port || 3000);
  console.log(`Server started on port ${config.server.port || 3000}`);
};

startServer();
