const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
// const hostname = "127.0.0.1";
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");
const password = encodeURIComponent("Venkatesh@123");

mongoose
  .connect(
    `mongodb+srv://Venkatesh:${password}@cluster0.suoemu9.mongodb.net/data`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("MongoDB is Connectd 😀");
  })
  .catch(err => {
    console.log("Error while connecting to MonogDB", err);
  });

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}/`);
});

const User = require("./Models/User");
const Order = require("./Models/Order");

// function to send Verification Email to the user
const sendVerificationEmail = async (email, varificationToken) => {
  // create a nodemailer transport

  const transporter = nodemailer.createTransport({
    // confiure the email service
    service: "gmail",
    auth: {
      user: "sahoovenketeswar@gmail.com",
      pass: "sywymrzzzdysmpxi"
    }
  });

  // compose the email message
  const mailOptions = {
    from: "amazonclone.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email : http://localhost:${port}/verify/${varificationToken}`
  };

  // send the email
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error sending verifiation email", error);
  }
};

// endpoint to register in the app
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if the user is already register or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already registered:", email); // Debugging statement
      return res.status(400).json({ message: "Email Is Already Registerd" });
    }

    // crate a new user
    const newUser = new User({ name, email, password });

    // generte and store the verification token
    newUser.varificationToken = crypto.randomBytes(20).toString("hex");

    // save the user to the database
    await newUser.save();

    // save varification email to the user
    sendVerificationEmail(newUser.email, newUser.varificationToken);
    res.status(201).json({
      message:
        "Registration successful. Please check your email for verification."
    });
  } catch (error) {
    console.log("Error Registering User", error);
    res.status(500).json({ message: "Registeration Faild" });
  }
});

// endpoint to verify the email
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    // find the user with the given verification token
    const user = await User.findOne({ varificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    // mark the user as verified
    user.verified = true;
    user.varificationToken = undefined;

    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Email Verifiation Failed" });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

const secretKey = generateSecretKey();

// endpoint to login the user!
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if th user exits or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // check if the password is correct or not
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    // generate a token
    const token = jwt.sign({ userId: user._id }, secretKey);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login Faild" });
  }
});
