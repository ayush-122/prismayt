import prisma from "../DB/db.config.js";

export const fetchPosts = async (req, res) => {
    const posts = await prisma.post.findMany({

        include:{
            comment:true
        }
    });
    
    return res.json({
        status: 200,
        data: posts,
        msg: "All posts lists"
    });
}


export const showPost =async (req,res)=>
    {
        const postId=req.params.id;
        const post =await prisma.post.findFirst({
           where:{
            id:Number(post)

           } 
        });

        return res.json({status:200, data:{
            post
        }});
    }



export const createPost =async (req,res)=>{
    const {user_id,title,description} =req.body;

  

    const newPost= await prisma.post.create({
        data:{
            user_id:Number(user_id),
            title,
            description
        }
    });

    return res.json({status:200, 
        data:{
            newPost
        },
        msg:"User created "});
}

//update the user

export const updatePost = async (req,res)=>{
    const postId =req.params.id;
    const {user_id,title,description} =req.body;
    await prisma.user.update({

        where:{
            id:Number(postId)
        },
        data:{
          user_id: Number(user_id),
          title,
          description
    }});

    return res.json({status:200 ,msg:"Post has been updated"});
}

export const deletePost =async(req,res)=>{

    const postId =req.params.id;
  const deletedPost=  await prisma.post.delete({

        where:{
            id:Number(postId)
        }
    });

    return res.json({status:200,data:{
        deletePost
    },msg:"This post has been deleted now"});

}