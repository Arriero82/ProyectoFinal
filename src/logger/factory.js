let addLogger;
import config from "../config/index.js";

switch (config.persistence.persistence) {
  case "memory":
    console.log("devLog");
    const { default: devLogger } = await import("./dev.logger.js");
    addLogger = devLogger;
    break;

  case "mongo":
    console.log("prodLog");
    const { default: prodLogger } = await import("./prod.logger.js");
    addLogger = prodLogger;
    break;
}

export default addLogger
