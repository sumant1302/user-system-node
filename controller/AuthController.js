const User= require('../models/user')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const register=(req,res,next)=>{
    //this will encrypt the password we enter
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            res.json({
                error:err
            })
        }
        let user= new User ({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:hashedPass
        })
        user.save()
        .then(user=>{
            res.json({
                message:'User added successfullly!'
            })
        })
        .catch(error=>{
            res.json({
                message:'An error occurred'
            })
        })
    })
}

const login=(req,res,next)=>{
    var username=req.body.username
    var password=req.body.password
    //check for email or phone as username
    User.findOne({$or: [{email:username},{phone:username}]})
    .then(user=>{
        //if user is found
        if(user){
            //compare the input password with the stored hashed password
            bcrypt.compare(password,user.password,function(err,result){
                if(err){
                    res.json({
                        error: err
                    })
                }
                //if both the user and the passwords match
                if(result){
                    //we will create a token with name so user doesnot have to login everytime
                    //from anywhere of the project we can take the name, we don't have to run extra query
                    //the token will expire after 1h(as given in time), the user will have to login again
                    let token = jwt.sign({name: user.name}, 'AzItg,PnG',{expiresIn: '1h'})
                    res.json({
                        message: 'Login Successfull',
                        token: token
                    })
                }else{
                    res.json({
                        message:'Password does not match'
                    })
                }
            })
        }
        //if user is not found
        else{
            res.json({
                message: 'No user found!'
            })
        }
    })
}

module.exports={
    register,login
}
