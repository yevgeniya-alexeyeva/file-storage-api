/* istanbul ignore file */

const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");

const config = require("../configs");

module.exports = {
  init: init,
  getEntity: getEntity,
  instance: null,
  entities: {},
  close: close,
};

function init() {
  return new Promise((resolve, reject) => {
    try {
      getSequelizeInstance.bind(this)();
      collectEntities.bind(this)();
      this.instance.sync({ force: false });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

function close() {
  return this.instance.close();
}

function getEntity(entityName) {
  if (!this.entities[entityName]) {
    throw new Error(`Entity ${entityName} does not exist.`);
  }
  return this.entities[entityName];
}

function getSequelizeInstance() {
  if (!this.instance) {
    this.instance = new Sequelize(
      config.database.name,
      config.database.username,
      config.database.password,
      {
        // the sql dialect of the database
        // currently supported: 'mysql', 'sqlite', 'postgres', 'mssql'
        dialect: config.database.dialect,

        // custom host; default: localhost
        host: config.database.host,
        // for postgres, you can also specify an absolute path to a directory
        // containing a UNIX socket to connect over
        // host: '/sockets/psql_sockets'.

        // custom port; default: dialect default
        port: config.database.port,

        // disable logging or provide a custom logging function; default: console.log
        logging: (msg) => console.log(msg),

        // you can also pass any dialect options to the underlying dialect library
        // - default is empty
        // - currently supported: 'mysql', 'postgres', 'mssql'
        dialectOptions: {
          supportBigNumbers: true,
          bigNumberStrings: true,
        },

        // disable inserting undefined values as NULL
        // - default: false
        omitNull: false,
        // Specify options, which are used when sequelize.define is called.
        // The following example:
        //   define: { timestamps: false }
        // is basically the same as:
        //   Model.init(attributes, { timestamps: false });
        //   sequelize.define(name, attributes, { timestamps: false });
        // so defining the timestamps for each model will be not necessary
        define: {
          underscored: false,
          freezeTableName: false,
          charset: "utf8",
          dialectOptions: {
            collate: "utf8_general_ci",
          },
          timestamps: false,
        },

        // similar for sync: you can define this to always force sync for models
        sync: { force: false },

        // pool configuration used to pool database connections
        pool: {
          max: 5,
          idle: 30000,
          acquire: 60000,
        },

        // isolation level of each transaction
        // defaults to dialect default
        isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
        loqQueryParameters: true,
      }
    );
  }

  return this.instance;
}

function collectEntities() {
  const entities = fs.readdirSync(path.join(__dirname, "entities"));
  // Entities initialization
  for (const entity of entities) {
    const entityName = path.basename(entity, ".js");
    const importedEntity = require(path.join(__dirname, "entities", entity));
    this.entities[entityName] = importedEntity.init(this.instance);
    console.log(`Defining - ${entityName}`);
  }

  // Entities association
  for (const entity in this.entities) {
    if (typeof this.entities[entity].associate === "function") {
      this.entities[entity].associate(this.entities);
    }
  }
}
