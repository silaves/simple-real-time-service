import Category from "../models/Category";


export class CategoryService {

  constructor () {
  }

  async create (data) {
    try {
      return await Category.create(data);
    } catch (e) {
      throw new Error(`Failed to create user due to: ${e}`);
    }
  }

  async update (id, data) {
    try {
      await Category.findOneAndUpdate(id, data);
      return await Category.findById(id);
    } catch (e) {
      throw new Error(`Failed to update category due to: ${e}`);
    }
  }

  async delete (id) {
    try {
      return await Category.findByIdAndDelete(id);
    } catch (e) {
      throw new Error(`Failed to delete category due to: ${e}`);
    }
  }

  async getById (id) {
    try {
      return await Category.findById(id).activeOne();
    } catch (e) {
      throw new Error(`Failed to retrieve category due to: ${e}`);
    }
  }

  async getAll () {
    try {
      return await Category.find().actives();
    } catch (e) {
      throw new Error(`Failed to retrieve categorys due to: ${e}`);
    }
  }
}
