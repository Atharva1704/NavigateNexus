import Post from "../models/Post.js";
import User from "../models/User.js";

// CREATE 

export const createPost = async (req,res) => {
    try{
        const { userId, description, picturePath } = req.body; // destructuring req 
        const postingUser = await User.findById(userId); // searching for user to get his/her info
        
        const newPost = new Post({
            userId: userId,
            firstName: postingUser.firstName,
            lastName: postingUser.lastName,
            location: postingUser.location,
            description: description,
            userPicturePath: postingUser.picturePath,
            picturePath: picturePath,
            likes: {},
            comments: [],
        });

        await newPost.save();

        const post = await Post.find();
        res.status(201).json(post);

    } catch(err) {
        res.status(409).json({ message: err.message });
    }
}

// READ 

export const getFeedPosts = async (req,res) =>{
    try{
        const post = await Post.find();
        res.status(200).json(post);
    } catch(err){
        res.status(404).json({message: err.message});
    }
}

export const getUserPosts = async (req,res) =>{
    try{
        const { userId } = req.params;
        const post = await Post.find({ userId });

        res.status(200).json(post);
    } catch(err) {
        res.status(404).json({message: err.message});
    }
}

// Update 

export const likePost = async (req,res) =>{
    try{
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);  // checks if the user is in the list of people who have liked the post

        if(isLiked){
            post.likes.delete(userId); // removing like 
        } else {
            post.likes.set(userId, true);  // adding user to like list
        }

        // because the likes is set as a map data type we can use get, set, delete function on it(they are inbuilt functions for data type: map)

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true } 
        );  // here first argument: to find, 2nd argument: what and how to update, 3rd argument: always return the updated object.

        res.status(200).json(updatedPost);
    } catch(err) {
        res.status(404).json({message: err.message});
    }
}