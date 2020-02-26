// Require our specific models
const Post = require('../models/post');
const User = require('../models/user');


//Routes

module.exports = app => {
// Index of all posts
app.get('/', (req, res) => {
  const currentUser = req.user;

  console.log(req.cookies);
  Post.find().populate('author')
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

// CREATE
app.post("/posts/new", (req, res) => {
  if (req.user) {
    const post = new Post(req.body);
    post.author = req.user._id;

    post
    .save()
    .then(post => {
      return User.findById(req.user._id);
    })
    .then(user => {
      user.posts.unshift(post);
      user.save();
      // REDIRECT TO THE NEW POST
      res.redirect(`/posts/${post._id}`);
    })
    .catch(err => {
      console.log(err.message);
    });
  } else {
  return res.status(401); // UNAUTHORIZED
  }
});
//     (function(err, post) {
//       return res.redirect(`/`);
//     });
//   } else {
//     return res.status(401); // UNAUTHORIZED
//   }
// });

//Show a single post
app.get('/posts/:id', function(req,res){
  const currentUser = req.user;

  //Look up the post
  Post.findById(req.params.id).populate('comments').lean()
  .then(post => {
    res.render('posts-show', { post, currentUser });
  }).catch(err => {
    console.log(err.message);
  });
});

// SUBREDDIT
app.get("/n/:subreddit", function(req, res) {
  const currentUser = req.user;
  Post.find({ subreddit: req.params.subreddit }).lean()
    .then(posts => {
      res.render("posts-index", { posts, currentUser });
    })
    .catch(err => {
      console.log(err);
    });
  });

};