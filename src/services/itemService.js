import Item from "../models/Item";


export class ItemService {

  constructor () {
  }

  async create (data) {
    try {
      return await Item.create(data);
    } catch (e) {
      throw new Error(`Failed to create user due to: ${e}`);
    }
  }

  async update (id, data) {
    try {
      await Item.findOneAndUpdate(id, data);
      return await Item.findById(id);
    } catch (e) {
      throw new Error(`Failed to update item due to: ${e}`);
    }
  }

  async delete (id) {
    try {
      return await Item.findByIdAndDelete(id);
    } catch (e) {
      throw new Error(`Failed to delete item due to: ${e}`);
    }
  }

  async getById (id) {
    try {
      return await Item.findById(id).activeOne();
    } catch (e) {
      throw new Error(`Failed to retrieve item due to: ${e}`);
    }
  }

  async getAll () {
    try {
      return await Item.find().actives();
    } catch (e) {
      throw new Error(`Failed to retrieve items due to: ${e}`);
    }
  }
}
