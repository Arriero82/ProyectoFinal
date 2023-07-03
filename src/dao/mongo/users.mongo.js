import User from "../mongo/models/users.models.js";

class UserManager {
  async get() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      console.log(error);
    }
  }

  async getByFilter(filter){
    try {
      const users = await User.find(filter).select('email');
      return users;
    } catch (error) {
      console.log(error);
    }
  }

  async findById(id){
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  async findOne(email){
    try {
      const user = await User.findOne(email);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  async create(userInfo) {
    try {
      const newUser = await User.create(userInfo);
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }
  async updateOne(email, encryptedPass){
    try {
      const newUser = await User.updateOne({email}, {password: encryptedPass})
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }
  async updateRole(email, newRole){
    try {
      const updatedUser = await User.updateOne({email}, {role: newRole})
      return updatedUser
    } catch (error) {
      console.log(error);
    }
  }
  async updateConnection(id, date){
    try {
      const updatedUser = await User.findByIdAndUpdate(id, {connection: date} )
      return updatedUser
    } catch (error) {
      console.log(error);
    }
  }
  async deleteOne(email){
    try {
      const deletedUser = await User.deleteOne({email})
      return deletedUser
    } catch (error) {
      console.log(error);
    }
  }
  async deleteMany(data){
    try {
      const deletedUsers = await User.deleteMany(data)
      return deletedUsers
    } catch (error) {
      console.log(error);
    }
  }

}

export default UserManager;
