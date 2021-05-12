const User= require('../../../models/user');
const jwt= require('jsonwebtoken');
const env= require('../../../config/environment');

module.exports.createSession= async function(req, res){

    try{
        const user= await User.findOne({email: req.body.email});

        if(!user || user.password!= req.body.password){
            return res.json(401, {
                message: "Invalid username/password"
            });
        }

        return res.json(200, {
            message: "Sign in successful, here is your token, please keep it safe",
            data: {
                // 'Codial' here is the secretOrKey in passport-jwt-strategy.js file
                token: jwt.sign(user.toJSON(), env.jwt_secret, {expiresIn: '10000000'})
            }
        });
    } catch(err){
        console.log(err);
        return res.json(500, {
            message: "Internal Server Error"
        })
    }
    
}