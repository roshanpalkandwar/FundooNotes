//import { userAuth } from '../middlewares/auth.middleware';
import User from '../models/user.model';
import bcrypt from'bcrypt';


//registration new user
export const RegisterNewUser = async (body) => {
  const saltRounds=10;
  const hashPassaword=await bcrypt.hash(body.Passaword,saltRounds);
  body.Passaword=hashPassaword;
  const data=await User.create(body);
  return data;
};

//create new user

export const Registration = async (body) => {
  const exsit=await User.findOne({Username:body.Username});
  if(exsit){
    
    throw new Error('opps Email Exsit Already');
  
  }else
  {
    const data = await User.create(body);
     return data;
  }
  
};

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//update single user
export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};

//get single user
export const getUser = async (_id) => {
  const data = await User.findById(_id);
  return data;
};