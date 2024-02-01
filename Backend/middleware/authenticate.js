const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const secretkey = "rejrie4854urj4943ji3j8u48ijije";

const authorization = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const verifyToken = jwt.verify(token, secretkey);       
        
        const rootuser = await userModel.findOne({_id:verifyToken._id});
        
        if (!rootuser){throw new Wrror ("user not found")}

        req.token = token
        req.rootuser = rootuser
        req.userId = rootuser._id

        next();

    } catch (error) {
       res.status(401).json({ status:401, message:"Unauthorized no token provide" });
    }
};

module.exports = authorization;