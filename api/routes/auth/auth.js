const router = require('express').Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const RefreshToken = require('../../models/RefreshToken');
const dotenv = require("dotenv");

dotenv.config();
const SecretRefreshToken = process.env.SECRET_REFRESH_TOKEN;
const SecretAccessToken = process.env.SECRET_ACCESS_TOKEN;

// register 
router.post("/register", async(req, res) => {
   
    try{
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        console.log(salt)
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email
    });   
        const createdUser = await newUser.save();
        return res.status(200).json(createdUser);
    }
    catch(err){ 
        console.log(err)
        return res.status(400).send(err)
    }
});

// we can give mail or username to retrieve the user.
router.post('/login', async(req, res) => {

    try{
        const identity = req.body.identity;
        const plainTextPassword = req.body.password;
        const user = await User.findOne({$or: [{email: identity},{username: identity}]});
        if(!user){
            return res.status(400).json("Wrong Credentials");
        }
        hashedPassword = user.password;
        const validation = await bcrypt.compare(plainTextPassword, hashedPassword);
        if(!validation){
            return res.json("Wrong Credentials");
        }
        // need to send access and refresh token
        const { password, ...others } = user._doc;
        const accessToken = jwt.sign(others, SecretAccessToken, { expiresIn: '20s'});
        const refreshToken = jwt.sign(others, SecretRefreshToken); 
        try{
            const response = await RefreshToken.deleteMany({username: others.username});
            const newRefreshToken = new RefreshToken({
                refreshtoken: refreshToken,
                username: others.username
            });
            const response1 = await newRefreshToken.save();
        }
        catch(err){
            return res.send("internal server error")
        }
        return res.cookie("refresh_token", refreshToken, {sameSite: 'none', secure: true, httpOnly:true})
                  .status(200)
                  .json({
                      "access_token": accessToken,
                  })
    }
    catch(err){
        console.log(err)
        return res.status(400).json("error while retrieving the user.");
    }
});

router.get('/refresh_token', async(req, res) => {
   
    const userRefreshToken = req.cookies.refresh_token;
    
    var isVerified = false;
    if(userRefreshToken){
        const valid = jwt.verify(userRefreshToken, SecretRefreshToken, (err, verified) => {
            if(err){
                return res.status(400).send(err)
            }
            else{
                isVerified = true;
            }});
        try{
            if(isVerified){
                const refreshTokenDetails = await RefreshToken.find({
                    refreshtoken: userRefreshToken
                })
                const username = refreshTokenDetails[0].username;
                const userDetails = await User.findOne(
                    {
                        username: username,
                    });
                const newAccessToken = jwt.sign(userDetails.toJSON(), SecretAccessToken, { expiresIn: '20s'})
               // console.log(jwt.decode(newAccessToken), "from refresh")
                return res.json(
                    {
                        "access_token": newAccessToken
                    });
                }}
        catch(err){
            console.log(err);
            return res.status(400).json({
                "failure": "no credentials"
            });
    }}
    return res.status(400).json({
        "failure": "no credentials"
    })
});
module.exports = router;
