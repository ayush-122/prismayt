import prisma from "../DB/db.config.js";

export const fetchPosts = async (req, res) => {

    let page =Number(req.query.page);
    let limit =Number(req.query.limit);
    if(page<=0)
        page=1;
    if(limit<=0 || limit>100)
        limit=10;

    const skip = (page-1)*limit;
    const posts = await prisma.post.findMany({
        skip:skip,
        take:limit,
        include:{
            comment:{
                include:{
                    user:{
                        select:{
                            name:true,
                        }
                    }
                }
            }

        } 
    });
    const totalPosts = await prisma.post.count();
    const totalPages = Math.ceil(totalPosts/limit);
    
    return res.json({
        status: 200,
        data: posts,
        msg: "posts lists",
        meta:{
            totalPages,
            currentPage:page,
            limit
            
        }
    });
}


export const showPost =async (req,res)=>
    {
        const postId=req.params.id;
        const post =await prisma.post.findFirst({
           where:{
            id:Number(postId)

           } ,
           include:{
            comment:{
                include:{
                    user:{
                        select:{
                            name:true
                        }
                    }
                }
            }
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