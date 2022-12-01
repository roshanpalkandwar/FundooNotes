//import { userAuth } from '../middlewares/auth.middleware';
import User from '../models/user.model';
import bcrypt from'bcrypt';
import jwt from 'jsonwebtoken';
import * as utils from '../utils/user.util';
import * as mq from '../utils/rabbitmq'
import dotenv from 'dotenv';
dotenv.config();
//import userModel from '../models/user.model';

//registration new user
export const RegisterNewUser = async (body) => {
  const existingUsername=await User.findOne({Username:body.Username});
  if(existingUsername===null){
  const saltRounds=10;
  const hashPassaword=await bcrypt.hash(body.Passaword,saltRounds);
  body.Passaword=hashPassaword;
  const data=await User.create(body);

  const dataRabbit=JSON.stringify(data);
  mq.producer('register',dataRabbit);
  return data;
  }
  else{
    throw new Error("Oops, User with same EmailId already exists, so use different!!!");
  }
  
  
};

//login user
export const loginUser=async(body)=>{
  const data = await User.findOne({Username:body.Username});
  if(data !== null){
    const result=await bcrypt.compare(body.Passaword,data.Passaword);
    if(result){
      var token=jwt.sign({Username:data.Username,id:data._id},
        process.env.SECRET_KEY);
      return token
    }
    else
    {
      throw new  Error('invalid password');

    }
  }else
  {
    throw new  Error('invalid email');
  }
 
};

export const ForgottPassword=async(body)=>{
  const data=await User.findOne({Username:body.Username});
  if(data!==null){
    var token=jwt.sign(
      {id:data._id,Username:data.Username},process.env.SECRET_KEY
    );
    await utils.sendMail(body.Username);
    return token;
  }else{
    throw new Error("Invalid Email Please Enter Valid one....");
  }
}

//service to reset the password for Authorize User
export const resetPassword=async(body)=>{
  console.log("body =================>",body)
  const saltRounds=10;
  const hashPassword=await bcrypt.hash(body.Passaword,saltRounds);
  body.Passaword=hashPassword;
  const data=await User.findOneAndUpdate(
    {Username:body.Username},
    body,
    {
      new:true
    }
  );
  return data;
};