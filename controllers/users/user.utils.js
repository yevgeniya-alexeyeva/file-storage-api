const { validateObject } = require("../../helpers/validation");

module.exports.authValidation = (
  requiredParams = [],
  params,
  additionalProperties = false
) => {
  const properties = {
    Password: { type: "string", minLength: 1 },
    Email: { type: "string", minLength: 1 },
    PhoneNumber: { type: "string", minLength: 1 },
  };
  return validateObject(
    properties,
    requiredParams,
    params,
    additionalProperties
  );
};

module.exports.registerValidation = (
  requiredParams = [],
  params,
  additionalProperties = false
) => {
  const properties = {
    RefreshToken: { type: "string" },
    Password: { type: "string", minLength: 1 },
    Email: { type: "string", minLength: 1 },
    PhoneNumber: { type: "string", minLength: 1 },
  };
  return validateObject(
    properties,
    requiredParams,
    params,
    additionalProperties
  );
};

module.exports.crudValidation = (
  requiredParams = [],
  params,
  additionalProperties = false
) => {
  const properties = {
    UserID: { anyOf: [{ type: "number" }, { type: "string" }] },
    Token: { type: "string" },
    RefreshToken: { type: "string" },
    Password: { type: "string", minLength: 1 },
    Email: { type: "string", minLength: 1 },
    Query: { type: "string", minLength: 1 },
    limit: { type: "number" },
    offset: { type: "number" },
    query: { type: "object" },
  };
  return validateObject(
    properties,
    requiredParams,
    params,
    additionalProperties
  );
};
