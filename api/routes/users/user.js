const router = require('express').Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const RefreshTokenModel = require('../../models/RefreshToken');

//update 
dotenv.config();
router.put('/:id', async (req, res) => {
    console.log(req.body, "body")
   // console.log(req.cookies, req.cookie)
    const userRefreshToken = req.cookies.refresh_token;
    const realRefreshToken = process.env.SECRET_REFRESH_TOKEN;
    const accessToken = process.env.SECRET_ACCESS_TOKEN
    var verified = false
    const valid = jwt.verify(userRefreshToken, realRefreshToken, (err, verifiedJWT)=>{
        if(err){
            verified = false;
        }
        else{
            verified = true;
        }
    });
    
    if(!verified){
        return res.status(400).json("no credentials");
    }
    else{
            if(req.body.password){
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);

            }
            try{

                const realUser = await User.findById(req.params.id);
                const oldUsername = realUser.toJSON().username;
                console.log(oldUsername, "realUser")

                const user = await User.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                });
                var newUser = await User.findById(req.params.id);
                console.log(newUser, "new user")
                var { password, ...others } = newUser;
                var { password, ...others} = others._doc;
                const newAccessToken = jwt.sign(others, accessToken, { expiresIn: '20s'});
                const refreshToken = jwt.sign(others, realRefreshToken);
                
                const newUsername = newUser.toJSON().username;
                // new refreshtoken update for an user
                const oldRefreshToken = await RefreshTokenModel.findOneAndDelete(
                    {"username": oldUsername},
                );
                
                const tokenBody = {
                    username: newUsername,
                    refreshtoken: refreshToken
                }
                const newRefreshtokenObj = await RefreshTokenModel(tokenBody);
                console.log(jwt.decode(newAccessToken, "newAcc"))
                try{
                    newRefreshtokenObj.save();
                }
                catch(err){
                    console.log(err);
                };
                return res.cookie("refresh_token", refreshToken, {sameSite: 'none', secure: true, httpOnly:true})
                .status(200)
                .json({
                    "access_token": newAccessToken,
                })

            }
            catch(err){
                console.log(err)
                return res.status(400).json("error while updating the user");
            }  
}
});

//delete

router.patch('/:id', async (req, res)=>{
    console.log(req.body)
    if(req.body.userId === req.params.id){
        try{
            const user = await User.findById(req.body.userId);
            const blogs = await BlogPost.deleteMany({
                username: user.username
            })
            const result = await User.findByIdAndDelete(req.body.userId);
            return res.status(201).json("Deleted the user successfully")
            
        }
        catch{
            return res.status(400).json("Error while deleting the user")
        }
    }
    
    else{
        return res.status(400).json("Access denied")
    }
})

//get the user
router.get('/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(400).json("No user founded")
        }
        else{
            const {password, ...others} = user._doc;
            return res.status(200).json(others)
        }
    }
    catch{
        return res.status(400).json("Error while getting the user")
    }
})


module.exports = router;