import UserData from "../models/userSchema.js";


// -------------- profile details start --------------- //

export const profilePage = async (req,res) =>{

    try {
        
        const userId = req.cookies.userId
        if(!userId) return res.redirect('/login')
        
        const user = await UserData.findById(userId)
        if(!user) return res.redirect('/login')

        res.render("pages/editProfile", { page: "about", user });

    } catch (error) {
        console.log(error.message);
        res.redirect('/login')

    }
    
}

// -------------- profile details end --------------- //

// -------------- edit profile details start --------------- //

export const editProfilePage = async (req, res) => {

  const userId = req.cookies.userId;
  if (!userId) return res.redirect("/login");

  const user = await UserData.findById(userId);
  res.render("pages/editProfile", { page: "Edit Profile", user });
};

// -------------- edit profile details end --------------- //

// -------------- update profile details start --------------- //

export const updateProfile = async (req, res) => {

  const userId = req.cookies.userId;
  if (!userId) return res.redirect("/login");

  const { userName, email, bio } = req.body;
  await UserData.findByIdAndUpdate(userId, { userName, email, bio });

  res.redirect("/about");
};

// -------------- update profile details end --------------- //

// -------------- logout process start ------------- //

export const logout = (req, res) => {
  res.clearCookie("userId");
  res.redirect("/login");
};

// -------------- logout process end ------------- //