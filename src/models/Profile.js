import {model, Schema} from 'mongoose';
import MongooseDelete from "mongoose-delete";

export const ProfileSchema = new Schema(
  {
    staff: {type: Boolean, default: true},
    password: {type: String, required: true},
  },
    {
      timestamps: true,
    },
);

ProfileSchema.plugin(MongooseDelete, { deletedAt : true });

ProfileSchema.query.activeOne = function() {
  return this.findOne({
    $or:[
      {deleted: { $exists:false }}, {deleted:false}
    ]
  });
};
ProfileSchema.query.actives = function() {
  return this.find({
    $or:[
      {deleted: { $exists:false }}, {deleted:false}
    ]
  });
};

export default model('Profile', ProfileSchema);