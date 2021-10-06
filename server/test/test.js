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
});

});