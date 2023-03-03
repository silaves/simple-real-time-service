import {Schema, model} from 'mongoose';
import MongooseDelete from 'mongoose-delete';
import {ProfileSchema} from "./Profile";


const UserSchema = new Schema(
  {
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: false},
    phone: {type: String, required: false},
    isActive: {type: Boolean, default: true},
    profile: {type: Schema.Types.ObjectId, required: false, ref: 'Profile'},
  },
    {
      timestamps: true,
    },
);
UserSchema.plugin(MongooseDelete, { deletedAt : true });

UserSchema.query.activeOne = function() {
  return this.findOne({
    $or:[
      {deleted: { $exists:false }}, {deleted:false}
    ]
  });
};
UserSchema.query.actives = function() {
  return this.find({
    $or:[
      {deleted: { $exists:false }}, {deleted:false}
    ]
  });
};

export default model('User', UserSchema);
