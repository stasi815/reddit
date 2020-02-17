// Require our models
const Post = require('../models/post');
const Comment = require('../models/comment');

//Routes

module.exports = app => {
    //Create comment
    app.post("/posts/:postId/comments", function(req,res){
        // Instantiate instance of comment model
        const comment = new Comment(req.body);

        // Save instance of Comment Model to DB
        comment
            .save()
            .then(comment => {
                return Post.findById(req.params.postId);
            })
            .then(post => {
                post.comments.unshift(comment);
                return post.save();
            })
            .then(comment => {
                // Redirect to the root
                return res.redirect('/');
            })
            .catch(err => {
                console.log(err);
            });
    });
};