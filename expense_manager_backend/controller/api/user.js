const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
require('dotenv').config();

module.exports.signup = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.json(200, {
        success: true,
        message: "user already existed! Please Login",

        data: {
          user:user
        },
      });
    } else {
      console.log(req.body)
      let user = await User.create(req.body);
      console.log(user)
      return res.json(200, {
        success: true,
        messsage:
          "Sign up Successfull ,Please login ",
        
      });
    }
  } catch (error) {
    console.log(`there is an error while signup ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.createsession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user || user.password != req.body.password) {
      return res.json(422, {
        messsage: "Invalid username or password",
      });
    }
    return res.json(200, {
      success: true,
      messsage: "Sign in Successfull , Here is your token please keep it safe!",

      data: {
        
        token: jwt.sign(user.toJSON(), "expense", { expiresIn: "3d" }),
        user: {
          username:user.name,
          email:user.email,
          id:user._id
        },
      },
    });
  } catch (error) {
    console.log("********", error);
    return res.json(500, {
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.updateprofile = async function (req, res) {
  try {
    let user = await User.findById(req.params.id);

    User.uploadedAvatar(req, res, function (err) {
      if (err) {
        console.log("****Multer Error: ", err);
      }

      user.name = req.body.name;
      user.email = req.body.email;
console.log(__dirname)
      if (req.file) {
        if (user.avatar) {
          fs.unlinkSync(path.join(__dirname, "..", "..", user.avatar));
        }

        user.avatar = User.avatarPath + "/" + req.file.filename;
        console.log(user.avatar)
      } else {
        console.log("chal be");
      }
      user.save();
      res.status(200).json({
        success: true,
        messsage:
          "Sign in Successfull , Here is your token please keep it safe!",

        data: {
          user: user,
        },
      });
    });
  } catch (error) {
    console.log("********", error);
    return res.json(500, {
      success: false,
      message: "Internal Server Error",
    });
  }
};