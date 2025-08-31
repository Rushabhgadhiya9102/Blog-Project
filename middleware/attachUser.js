import UserData from "../models/userSchema.js";

 const attachUser = async (req, res, next) => {
  if (req.cookies.userId) {
    const user = await UserData.findById(req.cookies.userId);
    req.user = user;
  } else {
    req.user = null;
  }
  next();
};

export default attachUser