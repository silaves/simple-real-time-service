import {Schema, model} from 'mongoose';
import MongooseDelete from 'mongoose-delete';


const ItemSchema = new Schema(
  {
    name: {type: String, required: true, unique: true},
    isActive: {type: Boolean, default: true},
  },
  {
    timestamps: true,
  },
);
ItemSchema.plugin(MongooseDelete, { deletedAt : true });

ItemSchema.query.activeOne = function() {
  return this.findOne({
    $or:[
      {deleted: { $exists:false }}, {deleted:false}
    ]
  });
};
ItemSchema.query.actives = function() {
  return this.find({
    $or:[
      {deleted: { $exists:false }}, {deleted:false}
    ]
  });
};

export default model('Item', ItemSchema);
