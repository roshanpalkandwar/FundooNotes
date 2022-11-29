import { client } from "../config/redis"

export const redisCheck=async(req,res,next)=>{
    const value=await client.get('getAllData');
    
    if(value!==null){
        res.status(200).json({
            code:200,
            dataa:JSON.parse(value),
            
            message:'All the notes  successfully  Get from redis'
        });
    }else{
        next();
    }
}

export const redisCheckGetById = async (req, res, next) => {
    const data = await client.get('getById');
    console.log(typeof data);

    if (data != null) {
        res.status(200).json({
            code: 200,
            data: JSON.parse(data),
            message: "Get Note By Id Successfully  From Redis"
        });
    } else {
        next();
    }
}