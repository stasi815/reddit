const app = require("./../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

//Import the Post model from our models folder to use in tests
const Post = require("./../models/post");
const server = require("../server");

chai.should();
chai.use(chaiHttp);

describe('Posts', function()) {
    const agent = chai.request.agent(server);
    //Post that we'll use for testing 
    const newPost = {
        title: 'post title',
        url: 'https://www.google.com',
        summary: 'post summary',
    };
    it("Should create with valid attributes at Post/posts/new", function (done) {
        // Test that new post is created with attributes
        //Checks how many posts there are now
        Post.estimateDocumentCount()
            .then(function (initialDocCount) {
                chai
                    .request(app)
                    .post("/posts/new")
                    //This line fakes a form post
                    .set("content-type", "application/x-www-form-urlencoded")
                    //Make a request to create another
                    .send(newPost)
                    .then(function (newDocCount) {
                        //Check that the database has one more post in it
                        expect(res).to.have.status(200);
                        //Check that the database has one more post in it
                        expect(newDocCount).to.be.equal(initialDocCount + 1)
                        done();
                    })
                    .catch(function (err) {
                        done(err);
                    });
            })
            .catch(function (err) {
                done(err);
            });
        })
        .catch(function (err) {
            done(err);
        });
    });
}