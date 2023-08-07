const { validateObject } = require("../../helpers/validation");

module.exports.crudValidation = (
  requiredParams = [],
  params,
  additionalProperties = false
) => {
  const properties = {
    FileID: { type: "string" },
    FileName: { type: "string" },
    list_size: { type: "number" },
    page: { type: "number" },
  };
  return validateObject(
    properties,
    requiredParams,
    params,
    additionalProperties
  );
};
