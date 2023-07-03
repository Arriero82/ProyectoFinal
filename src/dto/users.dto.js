import { createHash } from "../utils/cryptPassword.utils.js";

export default class UserDTO {
  constructor(userInfo) {
    this.name = userInfo.name;
    this.lastname = userInfo.lastname;
    this.email = userInfo.email;
    this.role = userInfo.role;
    this.password = createHash(userInfo.password)
  }
}
