const Ajv = require("ajv");
const addFormats = require("ajv-formats");

module.exports.validateObject = (
  properties,
  required,
  params,
  additionalProperties
) => {
  const ajv = new Ajv();
  addFormats(ajv);
  const schema = {
    type: "object",
    properties,
    required,
    additionalProperties,
  };

  const validate = ajv.compile(schema);
  const valid = validate(params);
  if (!valid) {
    return validate.errors;
  }

  return null;
};
