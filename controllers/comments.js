// Require our models
const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

//Routes

module.exports = app => {
    //Create comment
    app.post("/posts/:postId/comments", function(req,res){
        if (req.user){
        // Instantiate instance of comment model
        const comment = new Comment(req.body);
        comment.author = req.user._id;

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
                // return res.redirect('posts/${post._id}/comments/${comment._id}');
                return res.redirect('/');

            })
            .catch(err => {
                console.log(err.messsage);
            });
        } else {
            return res.status(401); // UNAUTHORIZED
        }
    });
};