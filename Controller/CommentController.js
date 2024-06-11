import prisma from "../DB/db.config.js";

export const fetchComments = async (req, res) => {
    const comments = await prisma.comment.findMany({});
 
    return res.json({
        status: 200,
        data: comments,
        msg: "All comments lists"
    });
}


export const showComment =async (req,res)=>
    {
        const commentId=req.params.id;
        const comment =await prisma.comment.findFirst({
           where:{
            id:Number(commentId)

           } 
        });

        return res.json({status:200, data:{
            data:comment
        }});
    }



export const createComment =async (req,res)=>{
    const {user_id,post_id,comment} =req.body;

  //increse the comment counter

  await prisma.post.update({
    where:{
        id:Number(post_id)
    }
    ,
    data:{
        comment_count:{
            increment:1
        }
    }
  })

    const newComment= await prisma.comment.create({
        data:{
            user_id:Number(user_id),
            post_id:Number(post_id),
            comment
        }
    });

    return res.json({status:200, 
        data:{
            newComment
        },
        msg:"Comment created "});
}

//update the comment

export const updateComment = async (req,res)=>{
    const commentId =req.params.id;
    const {user_id,post_id,comment} =req.body;
    await prisma.user.update({

        where:{
            id:Number(commentId)
        },
        data:{
          user_id: Number(user_id),
          
    }});

    return res.json({status:200 ,msg:"comment has been updated"});
}

export const deleteComment =async(req,res)=>{

    const commentId =req.params.id;
    await prisma.post.update({
        where:{
            id:Number(post_id)
        }
        ,
        data:{
            comment_count:{
                decrement:1
            }
        }
      })
  const deletedComment=  await prisma.comment.delete({

        where:{
            id:Number(commentId)
        }
    });

    return res.json({status:200,data:{
        deleteComment
    },msg:"This comment has been deleted now"});

}