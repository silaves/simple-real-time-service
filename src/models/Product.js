import {Schema, model} from 'mongoose';
import MongooseDelete from 'mongoose-delete';

const ProductSchema = new Schema(
  {
    name: {type: String, required: true},
    stock: {type: Number, required: true},
    item: {type: Schema.Types.ObjectId, required: true, ref: 'Item'},
    user: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    category: {type: Schema.Types.ObjectId, required: true, ref: 'Category'},
  },
  {
    timestamps: true,
  },
);
ProductSchema.plugin(MongooseDelete, { deletedAt : true });

ProductSchema.query.activeOne = function() {
  return this.findOne({
    $or:[
      {deleted: { $exists:false }}, {deleted:false}
    ]
  });
};
ProductSchema.query.actives = function() {
  return this.find({
    $or:[
      {deleted: { $exists:false }}, {deleted:false}
    ]
  });
};

export default model('Product', ProductSchema);
