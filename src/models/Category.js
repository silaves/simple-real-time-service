import {Schema, model} from 'mongoose';
import MongooseDelete from 'mongoose-delete';


const CategorySchema = new Schema(
  {
    name: {type: String, required: true, unique: true},
    isActive: {type: Boolean, default: true},
  },
  {
    timestamps: true,
  },
);
CategorySchema.plugin(MongooseDelete, { deletedAt : true });

CategorySchema.query.activeOne = function() {
  return this.findOne({
    $or:[
      {deleted: { $exists:false }}, {deleted:false}
    ]
  });
};
CategorySchema.query.actives = function() {
  return this.find({
    $or:[
      {deleted: { $exists:false }}, {deleted:false}
    ]
  });
};

export default model('Category', CategorySchema);
