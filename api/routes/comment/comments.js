const router = require("express").Router();
const CommentModel = require("../../models/Comment");

router.get('/', async (req, res) => {
    console.log(req.cookies, "cookies")
    try{
        const comments = await CommentModel.find();
        return res.json(comments);
    }
    catch(err){
        return err;
    }
})

router.post('/:blogName', async (req, res) => {    
    var id = await CommentModel.find(); 
    if(!id){
        id = 0;
    }
    else{id = id.length + 1;}
    console.log(id)
    
    const blogName = req.params.blogName;
    const comment = await CommentModel(
        {
            blogName: blogName,
            username: req.body.username,
            parentId: req.body.parentId,
            body: req.body.body,
            id: id
        }
    )
    try{
        comment.save();
        return res.json("created successfully");
    }
    catch(err){
        return res.json(err);
    }

})

router.delete('/:commentid', async (req, res) => {
    const commentId = req.params.commentid;
    try{
        const comment = await CommentModel.find({id: commentId});
        console.log("oparent", comment)
        if(!comment.parentId){
            console.log("in")
            const childrenComment = await CommentModel.deleteMany(
                {
                    "parentId": commentId
                }
            )
            
            const parentComment = await CommentModel.deleteOne({id: commentId});
            return res.json("deleted successfully");
        }
        else{
            console.log("into else ")
            const parentComment = await CommentModel.findByIdAndDelete(commentId);
            return res.json("deleted successfully");
        }     
    }
    catch(err){
        console.log("into catch")
        return res.json("error");
    }
})

router.put('/:commentid', async (req, res) => {
    const commentId = req.params.commentid;
    try{
        const comment1 = await CommentModel.findOne({id: commentId});
        console.log(comment1)
        const comment = await CommentModel.findOneAndUpdate({id: commentId}, {
            $set: req.body
        });
        console.log(comment)
        return res.json("updated  successfully");
    }
    catch(err){
        return res.json(err);
    }
})

router.get('/:blogName', async (req, res) => {
    const blogName = req.params.blogName;
    try{
        const comments = await CommentModel.find({blogName: blogName});
        console.log(comments)
        return res.json(comments);
    }
    catch(err){
        return err;
    }

})
module.exports = router;