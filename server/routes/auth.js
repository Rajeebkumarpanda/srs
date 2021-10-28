const express = require("express");
const router = new express.Router();
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenticate= require('../middleware/authenticate');
const { json } = require("express");

// middleware
const middleware = (req, res, next) => {
  console.log("middleware hooo");
  next();
};

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "All Fields are Mandatory" });
  }
  try {
    const userexist = await User.findOne({ email: email });
    if (userexist) {
      return res.status(422).json({ error: "Email id already exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "passwords are not matching" });
    } else {
      const newUser = new User({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      });
      //middleware for hashing the password
      await newUser.save();
      res.status(201).json({ message: "User registration Successfull" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please filled all details" });
  }

  try {
    const userEmail = await User.findOne({ email: email });

    if (userEmail) {
      const isMatch = await bcrypt.compare(password, userEmail.password);
      const token=await userEmail.generateAuthToken();
      console.log(token)
      res.cookie('jsontoken',token)
      if (isMatch) {
        return res.status(201).json({ message: "Login Successfully" });
      } else {
        return res.status(422).json({ error: "Invalid Credentials pass" });
      }
    } else {
      return res.status(422).json({ error: "Invalid Credentials email" });
    }

    // if (!userEmail) {
    //   return res.status(400).json({ error: "Invalid Credentials" });
    // } else {
    //   return res.status(201).json({ message: "Login successfull" });
    // }
  } catch (error) {
    console.log(error);
  }
});

router.get("/display", async (req, res) => {
  const displayRecord = await User.find();
  res.status(200).json(displayRecord);
});

// router.get("/about", middleware, (req, res) => {
//   console.log("hello About");
//   res.send("Hello From About Page");
// });
// router.get("/login", (req, res) => {
//   res.send("Hello From Login Page");
// });
// router.get("/signup", (req, res) => {
//   res.send("Hello From Sign-Up Page");
// });


//about us  ka page
router.get('/about',authenticate,(req,res)=>{
  console.log('Hello my about');
  res.send(req.rootUser)
})

//get user data fro contact us and home page
router.get('/getdata',authenticate,(req,res)=>{
  console.log('Hello my contact');
  res.send(req.rootUser)
})

//contact us page
router.post('/contact',authenticate,async(req,res)=>{
  try {
    const {name,email,phone,message}=req.body
    if(!name || !email || !phone || !message){
      console.log('error in contact form');
     return res.json({error:"Plzz filled the contact form"})
    }
    const userContact = await User.findOne({_id:req.userID});
    if(userContact){
      const usermessage =await userContact.addMessage(name,email,phone,message)
      await userContact.save();
      res.status(201),json({message:"user contact successsfully"})
    }
    
  } catch (error) {
    console.log(error);
  }
})

//logout us  ka page
router.get('/logout',authenticate,(req,res)=>{
  console.log('Hello my logout page');
  res.clearCookie('jsontoken',{path:'/'})
  res.status(200).send('user logout')
})

module.exports = router;
