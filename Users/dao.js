import userModel from "./model.js";
export const findAllUsers = () => userModel.find();
export const findUserById = (id) => userModel.findById();
export const createUser = (user) => userModel.create(user);
export const findUserByUsername = (username) =>  userModel.findOne({ username: username });
export const findUserByCredentials = (username, password) =>  userModel.findOne({ username, password });
export const updateUser = (userId, user) =>  userModel.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => userModel.deleteOne({ _id: userId });
export const findUserByEmail = (email) => userModel.findOne({email:email,});
