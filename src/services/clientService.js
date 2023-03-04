import User from "../models/User";
import Profile from "../models/Profile";

export class ClientService {

  constructor () {
  }

  async create (data) {
    try {
      return await User.create(data);
    } catch (e) {
      throw new Error(`Failed to create user due to: ${e}`);
    }
  }

  async update (id, data) {
    try {
      await User.findOneAndUpdate(id, data);
      return await User.findById(id);
    } catch (e) {
      throw new Error(`Failed to update user due to: ${e}`);
    }
  }

  async delete (id) {
    try {
      const user = await User.findById(id);
      await Profile.deleteOne({ _id: user.profile });
      await User.deleteOne({ _id: id });
      return user;
    } catch (e) {
      throw new Error(`Failed to delete user due to: ${e}`);
    }
  }

  async getById (id) {
    try {
      return await User.findById(id).activeOne();
    } catch (e) {
      throw new Error(`Failed to retrieve user due to: ${e}`);
    }
  }

  async getAll () {
    try {
      return await User.find().actives();
    } catch (e) {
      throw new Error(`Failed to retrieve user due to: ${e}`);
    }
  }
}
