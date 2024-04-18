import express from "express";  // simple flexible and scalable NodeJs framework.
import bodyParser from "body-parser"; // express middleware which can parse an incoming http req into Json or other formats.
// in newer versions of express inbuilt parsing can be done.
import mongoose from "mongoose"; // this ODM makes handling database operations easier for us.
import cors from "cors"; // (middleware) CORS is a mechanism that allows a server to specify which origins are permitted to access its resources
import dotenv from "dotenv"; // this is used to keep certain variables hidden from github repo.
import multer from "multer"; // middleware primarily used to upload files.
import morgan from "morgan"; // (middleware)keeps a log of all https reqs and their relevent info like res time, URL, res status, etc.
import path from "path"; // (built-in)provides utilities for working with file/directory paths but also operations to join paths and other path related operations.
import { fileURLToPath } from "url"; // (built-in) used to deal with URLs
import helmet from "helmet"; // (middleware)a very useful tool to secure express applications as it adds relevent http header which protects from certain attacks and vulnerabilities
import { ppid } from "process"; // (built-in) ppid = parent process id this helps in identifying current processes' parent id
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import travelRoutes from "./routes/travel.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users,posts} from "./data/index.js";
import 'dotenv/config';
import { logTravel, getOne, findMate } from "./controllers/travelDetail.js";


/* CONFIGURATION */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); // initialise the express modules as app

// app.use() is a function which is used to indicate the middlewares which have access to the working with req and res.

app.use(express.json()); // parses the http req into json format.
app.use(helmet()); 
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));  // sets up helmet middleware

app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));


// FILE STORAGE

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/assets');
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname);
    }
});
  
const upload = multer({ storage });

app.get("/", (req, res)=>{
  res.status(200).send("hii");
});

// Routes with Files

app.post("/auth/register", upload.single("picture"), register);
app.post("/travel", logTravel);
// app.get("/travel/:id", getTravelDetails);
// app.post("/posts", verifyToken, upload.single("picture"), createPost);
app.get("/findTravelMate", getOne);
app.get("/travels/:id", findMate);
console.log("FindMate !");



// Routes 


app.use("/auth", authRoutes); // checked on postman
app.use("/users", userRoutes);
// app.use("/travel", travelRoutes);
// app.use("/posts", postRoutes);

// Mongoose SETUP

mongoose
  .connect(process.env.MONGO_URL)
  .then(()=>{
    app.listen(process.env.PORT, ()=> console.log(`Server running at ${process.env.PORT}.`))

}).catch((error)=>console.log(`${error} did not connect`))
