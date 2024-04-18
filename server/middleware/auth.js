import jwt from "jsonwebtoken";

export const verifyToken = async(req,res,next)=>{
    try{
        let token = req.header("Authorization"); // an https request contains an header which is followed by the token, req.header() tries to find the authorization header in http req

        if(!token){
            return res.status(403).send("Access Denied");
        }

        if(token.startsWith("Bearer ")){
            token = token.slice(7).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET); // verifying the jwt token with jwt secret key to ensure that this jwt is from our website
        req.user = verified;
        next();

    } catch (err) {
        if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
          return res.status(401).json({ error: 'Invalid or expired token' });
        }
      
        res.status(500).json({ error: err.message });
      }
}