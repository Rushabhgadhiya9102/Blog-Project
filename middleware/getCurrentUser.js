import UserData from "../models/userSchema.js";

const getCurrentUser = async (req) => {
  if (!req.cookies.userId) return null;
  const user = await UserData.findById(req.cookies.userId);
  return user;
};

export default getCurrentUser