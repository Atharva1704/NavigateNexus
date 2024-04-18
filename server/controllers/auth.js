import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Register User

export const register = async (req,res)=>{
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;  // req body is destructured.

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);  // salt for hashing is generated
        const passwordHash = await bcrypt.hash(password, salt); // hashed password is created.

        const newUser = new User({ 
            firstName,
            lastName,
            email,
            password : passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random()*10000),
            impressions:Math.floor(Math.random()*10000),
        });             // here the User mongoose schema is invoked and hashed password is stored 

        const savedUser = await newUser.save(); // this new user is stored in database

        res.status(201).json(savedUser);

    } catch(err) {
        res.status(500).json({error: err.message, msg:"error in registering"});
    }
}

// Login

export const login = async (req,res) =>{
    try{
        const { email, password } = req.body; // req body is destructed

        const user = await User.findOne( { email: email } );  // database search is done using key email === req.body.email

        if(!user) return res.status(400).json({msg: "User does not exist"});  // if no database match is found error thrown of non-existent user

        const isMatch = await bcrypt.compare(password, user.password);  // checks the normal password with hashed password 
        
        if( !isMatch ) return res.status(400).json({msg: "Password doesnt match"});

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // function to create the jwt token

        delete user.password;
        res.status(200).json({ token, user});
        
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
}