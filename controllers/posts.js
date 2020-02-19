// Require our specific model
const Post = require('../models/post');

//Routes

module.exports = app => {
// Index of all posts
app.get('/', (req, res) => {
  const currentUser = req.user;

  Post.find({})
  .then(posts => {
      res.render('posts-index', { posts, currentUser });
  })
  .catch(err => {
      console.log(err.message);
  });
});

//Create new post
app.get('/posts/new', (req, res) => {
  var currentUser = req.user;

  res.render('posts-new')
});

// // CREATE
// app.post("/posts/new", (req, res) => {
// // INSTANTIATE INSTANCE OF POST MODEL
// const post = new Post(req.body);
// // SAVE INSTANCE OF POST MODEL TO DB
// post.save((err, post) => {
//     console.log(err)
//     console.log(post)
//     // REDIRECT TO THE ROOT
//     return res.redirect(`/`);
//   })
// });

// CREATE
app.post("/posts/new", (req, res) => {
  if (req.user) {
    const post = new Post(req.body);

    post.save(function(err, post) {
      return res.redirect(`/`);
    });
  } else {
    return res.status(401); // UNAUTHORIZED
  }
});

//Show a single post
app.get('/posts/:id', function(req,res){
  const currentUser = req.user;

  //Look up the post
  Post.findById(req.params.id).populate('comments').then(post => {
    res.render('posts-show', { post, currentUser });
  }).catch(err => {
    console.log(err.message);
  });
});

// SUBREDDIT
app.get("/n/:subreddit", function(req, res) {

  Post.find({ subreddit: req.params.subreddit })
    .then(posts => {
      const currentUser = req.user;

      res.render("posts-index", { posts });
    })
    .catch(err => {
      console.log(err);
    });});

}