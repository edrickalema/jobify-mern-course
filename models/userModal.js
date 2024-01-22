import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: "lastName",
  },
  location: {
    type: "String",
    default: "Kampala",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  avatar:String,
  avatarPublic:String,
});

UserSchema.methods.toJSON = function () {
  let userObj = this.toObject();
  delete userObj.password;
  return userObj;
};
export default mongoose.model("User", UserSchema);
