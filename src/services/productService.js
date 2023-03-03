import mongoose from "mongoose";
import User from "../models/User";
import Item from "../models/Item";
import Category from "../models/Category";
import Product from "../models/Product";

export class ProductService {

  constructor () {
  }

  async create (data) {
    try {
      return await Product.create(data);
    } catch (e) {
      throw new Error(`Failed to create product due to: ${e}`);
    }
  }

  async update (id, data) {
    try {
      await Product.findOneAndUpdate(id, data);
      return await Product.findById(id);
    } catch (e) {
      throw new Error(`Failed to update product due to: ${e}`);
    }
  }

  async delete (id) {
    try {
      return await Product.findByIdAndDelete(id);
    } catch (e) {
      throw new Error(`Failed to delete product due to: ${e}`);
    }
  }

  async getById (id) {
    try {
      return await Product.findById(id).activeOne();
    } catch (e) {
      throw new Error(`Failed to retrieve product due to: ${e}`);
    }
  }

  async getAll () {
    try {
      return await Product.find().actives();
    } catch (e) {
      throw new Error(`Failed to retrieve products due to: ${e}`);
    }
  }

  async checkProductData (productData) {
    let valid = true;

    if (productData.user) {
      if (mongoose.Types.ObjectId.isValid(productData.user)) {
        const user = await User.findById(productData.user);
        if (!user) valid = false;
      } else {
        valid = false;
      }
    }

    if (productData.item) {
      if (mongoose.Types.ObjectId.isValid(productData.item)) {
        const item = await Item.findById(productData.item);
        if (!item) valid = false;
      } else {
        valid = false;
      }
    }

    if (productData.category) {
      if (mongoose.Types.ObjectId.isValid(productData.category)) {
        const category = await Category.findById(productData.category);
        if (!category) valid = false;
      } else {
        valid = false;
      }
    }

    return valid;
  }
}
