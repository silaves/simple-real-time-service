import User from "../models/User";

export class ClientService {

  constructor (appConfig) {
    this.appConfig = appConfig;
  }

  async create (data) {
    try {
      return await User.create(data);
    } catch (e) {
      throw new Error(`Failed to create user due to: ${e}`);
    }
  }

  async update (client) {
    return null;
  }

  async delete (id) {

  }

  async getById (id) {
    return null;
  }

  async getAll () {
    try {
      return await User.find();
    } catch (e) {
      throw new Error(`Failed to retrieve users due to: ${e}`);
    }
  }
}
