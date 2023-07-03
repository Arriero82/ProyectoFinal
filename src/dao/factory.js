export let mockDao;
import config from "../config/index.js";
import mongooseRun from "../db/index.js";

switch (config.persistence.persistence) {
    case "mongo":
      console.log('using mongoDB');
      mongooseRun();
      const { default: MocksMongo } = await import("./mongo/mock.mongo.js");
      mockDao = MocksMongo;
      break;
  
    case "memory":
      console.log('using memory');
      const { default: MocksMemory } = await import("./memory/mock.memory.js");
      mockDao = MocksMemory;
      break;
  }
  

