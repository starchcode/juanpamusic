//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('Testing the Server:', () => {
    // beforeEach((done) => { //Before each test we empty the database
    //     Book.remove({}, (err) => {
    //        done();
    //     });
    // });
/*
  * Test the /GET route
  */

describe('/GET', () => {
    it('Server should be running', (done) => {
      chai.request(server)
          .get('/')
          .end((err, res) => {
                res.should.have.status(200);
                console.log('response: ', res.body)
                res.body.should.be.a('string');
                res.body.should.be.eql('Welcome to JuanpaMusic!');
            done();
          });
    });

    it('/adminData should deliver an object that includes: home, music and shows with specific lengths', (done) => {
      chai.request(server)
            .get('/admindata')
            .end((err, res) => {
              res.should.have.status(200);
              // console.log('response: ', res.body);
              res.body.should.be.a('object')

              //should include home, music and shows:
              res.body.should.have.property('home')
              res.body.should.have.property('music')
              res.body.should.have.property('shows')

              //home should have length of 
              res.body.home.length.should.be.eql(6);
              res.body.music.forEach(el => {
                el.length.should.be.eql(7);
              })
              res.body.shows.forEach(el => {
                el.length.should.be.eql(7);
              })
              done();
            })
    })

    // it('Shows must be in order from latest to newes', (done) => {
    //   chai.request(server)
    //     .get('/admindata')
    //     .end((err, res) => {
    //       res.body.shows
    //     })
    // })
});

});