import EnumErrors from "../utils/errors/enums.errors.js";

export default (error, req, res, next) => {
  console.log(error.cause);
  switch (error.code) {
    case EnumErrors.INVALID_TYPES_ERROR:
      res.json({ error: error.name });  
      break;

    case EnumErrors.INVALID_PARAM_ERROR:
      res.json({error: error.name})
      break;

    default:
      res.json({ error: "unhandled error" });
      break;
  }
};
