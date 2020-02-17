// Require our specific model
const Post = require('../models/post');

//Routes

module.exports = app => {
// Index of all posts
app.get('/', (req, res) => {
  Post.find({}).then(posts => {
      res.render('posts-index', { posts });
  }).catch(err => {
      console.log(err.message);
  });
  // res.render('posts-index')
})

//Create new post
app.get('/posts/new', (req, res) => {
  res.render('posts-new')
})
// CREATE
app.post("/posts/new", (req, res) => {
// INSTANTIATE INSTANCE OF POST MODEL
const post = new Post(req.body);
// SAVE INSTANCE OF POST MODEL TO DB
post.save((err, post) => {
    console.log(err)
    console.log(post)
    // REDIRECT TO THE ROOT
    return res.redirect(`/`);
  })
});

//Show a single post
app.get('/posts/:id', function(req,res){
  //Look up the post
  Post.findById(req.params.id).populate('comments').then(post => {
    res.render('posts-show', { post });
  }).catch(err => {
    console.log(err.message);
  });
});

// SUBREDDIT
app.get("/n/:subreddit", function(req, res) {
  Post.find({ subreddit: req.params.subreddit })
    .then(posts => {
      res.render("posts-index", { posts });
    })
    .catch(err => {
      console.log(err);
    });});

}