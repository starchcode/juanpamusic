//During the test the env variable is set to test
process.env.NODE_ENV = "test";

//Require the dev-dependencies
let chai = require("chai");
let expect = require("chai").expect;
let chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();

chai.use(chaiHttp);



  xdescribe("/POST /contact", () => {
    it("sendin email with missing NAME", (done) => {
      let body = {
        Email: "a@a.com",
        Phone: "+353905334223",
        Enquiry: "this is message!",
      };
      chai
        .request(server)
        .post("/contact")
        .send(body)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("sendin email with missing EMAIL", (done) => {
      let body = {
        Name: "John Doe",
        Phone: "+353905334223",
        Enquiry: "this is message!",
      };
      chai
        .request(server)
        .post("/contact")
        .send(body)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("sendin email with missing ENQUIRY", (done) => {
      let body = {
        Name: "John Doe",
        Email: "a@a.com",
        Phone: "+353905334223",
      };
      chai
        .request(server)
        .post("/contact")
        .send(body)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("/sending an email with invalid email address", (done) => {
      let body = {
        Name: "John Doe",
        Email: "aa.com",
        Phone: "+353905334223",
        Enquiry: "this is message!",
      };
      chai
        .request(server)
        .post("/contact")
        .send(body)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    
    it("Sending an email", (done) => {
      let body = {
        Name: "John Doe",
        Email: "johndoe@gmail.com",
        Phone: "+353905334223",
        Enquiry: "Test message",
      };
      chai
        .request(server)
        .post("/contact")
        .send(body)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Message sent!');
          done();
        });
    });
  });