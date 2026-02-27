const User=require("../Model/User");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');



exports.register=async (req,res)=> {
    try {
        const {firstname,name,email,password}=req.body;
        const foundUser=await User.findOne({email});
        if (foundUser){
            return res.status(400).send({errors : [{msg:"email déja utilisé"}]})
        }
    const saltRounds=10;
    const hashpassword=await bcrypt.hash(password,saltRounds)
     

    const newUser =new User({...req.body})
    newUser.password=hashpassword;
    await newUser.save()

    const token =jwt.sign({
        id:newUser._id 
    } ,process.env.SCRT_KEY, {expiresIn : "48h"})
        res.status(200).send({success : [{msg:"inscription avec success ..."}],user:newUser , token}) 

  


    } catch (error) {
        res.status(400).send({errors : [{msg:"   try again"}]})
    }
}


exports.login=async (req,res) => {
    try {
        const {email,password}=req.body;
        const foundUser= await User.findOne({email})

        if (!foundUser) {
            return res.status(400).send({errors: [{msg: "email introvable"}]})
        }

const checkPassword=await bcrypt.compare(password,foundUser.password)
if (!checkPassword) {
               return res.status(400).send({errors: [{msg: " password incorrect"}]})
 
}

const token =jwt.sign({
        id:foundUser._id 
    } ,process.env.SCRT_KEY, {expiresIn : "48h"})
        res.status(200).send({success : [{msg:"connexion avec success ..."}],user:foundUser , token}) 








    } catch (error) {
                return res.status(400).send({errors: [{msg: "verifier vos information"}]})

    }
}


