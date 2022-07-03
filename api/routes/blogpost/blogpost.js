const router = require('express').Router();
const BlogPost = require('../../models/BlogPost');

//get the post
router.get('/:id', async (req, res) => {  
    
    try{
        const blog = await BlogPost.findById(req.params.id);
        res.status(200).json(blog)    
    }
    catch{
        res.status(400).json("no blog found")
    }
})

// create a new post
router.post('/', async (req, res) => {
    const newPost = new BlogPost(
        {
            title: req.body.title,
            description: req.body.description,
            photos: req.body.photos,
            username: req.body.username,
            categories: req.body.categories

        }
    )
    try{
        const response = await newPost.save()
        return res.status(200).json("created successfully");
    }
    catch{
        return res.status(200).json("error while creating a blog");
    }
    
})

//update the post 
router.put('/:id', async (req, res) => {
    console.log(req.body)
    try{
        const result = await BlogPost.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
        { new: true} 
        );
        console.log(result)
        return res.status(200).json("updated the blog successfully!!");
    }
    catch{
        return res.status(400).json("error while updating the blog post");
    }      
    
})

//delete the post
router.patch('/:id', async(req, res) => {
    console.log(req.body, req.params.id)
    try{
        const blogPost = await BlogPost.findById(req.params.id);
        console.log(blogPost)
        if(blogPost.username === req.body.username){
            try{
                const response = await Post.findByIdAndDelete(req.params.id);
                console.log(response)
                return res.status(201).json("Deleted the Blog post successfully");
            }
            catch{
                return res.status(400).json("there is an error while deleting the post");
            }
        }
        else{
            return res.status(400).json("donot have a credentials");
        }
    }
    catch{
        return res.status(400).json("Error while deleting the blog post");
    }
})

// fetching all the posts
router.get('/', async (req, res) => {
    console.log("erq in ")
    const username = req.query.username;
    const category = req.query.category;
    console.log(username, "username")
    
    try{
        let blogposts;

        if(username){
            blogposts = await BlogPost.find({ username: username });
            }
        else if(category){
            console.log("innn")
            blogposts = await BlogPost.find({ categories: {
                $in: [category]

            }
            })
            console.log(blogposts, "blogpost")
        }
        else{
            blogposts = await BlogPost.find();
            console.log(blogposts, "blogpost")
        }
        return res.status(200).json(blogposts)
        }
    catch{
        res.status(400).json("no blog found")
    }
})


module.exports = router;