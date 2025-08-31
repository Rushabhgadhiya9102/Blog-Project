import bcrypt from "bcrypt"
import UserData from "../models/userSchema.js";

// ---------- register process start ----------- //

export const registersPage = (req, res) => {
  return res.render("pages/register", { page: "Register" });
};

export const registerProcess = async (req, res) => {

  try {
    const { password, confirmPassword } = req.body;
    if (password === confirmPassword) {

      req.body.password = await bcrypt.hash(req.body.password, 10)
      await UserData.create(req.body);
      console.log("user created");
      res.redirect("/login");

    }
  } catch (error) {

    console.log(error.message);
    res.redirect("/register");

  }
};

// ---------- register process end ----------- //


// ---------- login process start ----------- //

export const loginPage = (req, res) => {

  if (req.cookies.userId) {
    return res.redirect("/index");
  }  

  return res.render("pages/login", { page: "Login" });
};

export const loginProcess = async (req, res) =>{
  
  try {
    
    const {email, password} = req.body
    const user = await UserData.findOne({email})
    if(user){

      const isValid = await bcrypt.compare(password, user.password)
      if(isValid){
        console.log("welcome login successfully");
         res.cookie("userId", user._id.toString())
        return res.redirect('/index')

      }else{

      console.log("user not found");
      return res.redirect('/login')

    }
    }

  } catch (error) {
    console.log(error.message);
    
  }

}

// ---------- login process end ----------- //