const { validateObject } = require("../../helpers/validation");

module.exports.crudValidation = (
  requiredParams = [],
  params,
  additionalProperties = false
) => {
  const properties = {
    FileID: { anyOf: [{ type: "number" }, { type: "string" }] },
    FileName: { type: "string" },
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

