import privateAccess from "./privateAccess.middlewares.js";
import publicAccess from "./publicAccess.middlewares.js";
import onlyUserAccess from "./onlyUserAccess.middlewares.js";
import productPrivateAccess from "./adminAccess.middleware.js";

export {
    publicAccess,
    privateAccess,
    onlyUserAccess,
    productPrivateAccess
}