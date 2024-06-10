import prisma from "../DB/db.config.js";

export const fetchUsers = async (req,res)=>
{
    const users = await prisma.user.findMany({});
    return res.json({status:200,data:users, msg:"all users lists"});
}



export const createUser =async (req,res)=>{
    const {name,email,password} =req.body;

    const findUser = await prisma.user.findUnique({
        where:{
            email:email
        }
    });

    if(findUser)
        {
            return res.json({status:400,message:"Email Already Taken . please another email."});
        }

    const newUser= await prisma.user.create({
        data:{
            name:name,
            email:email,
            password:password
        }
    });

    return res.json({status:200, data:newUser,msg:"User created "});
}

//update the user

export const updateuser = async (req,res)=>{
    const userId =req.params.id;
    const {name,email,password} =req.body;
    await prisma.user.update({

        where:{
            id:Number(userId)
        },
        data:{
            name,
            email,
            password
    }});

    return res.json({status:200 ,msg:"User has been updated"});
}