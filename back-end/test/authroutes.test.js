const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const express = require('express');
const authRouter = require('../authRoutes'); // Make sure the path is correct

const expect = chai.expect;
chai.use(chaiHttp);

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use('/auth', authRouter); // Mount the auth router at the /auth path

describe('Auth Router', () => {

  describe('POST /signup', () => {
    it('should sign up a new user and return a JWT', (done) => {
      chai.request(app)
        .post('/auth/signup')
        // .send({ username: 'user', password: 'pass' }) // If you had a real signup process
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('token');
          const payload = jwt.verify(res.body.token, 'secretKey');
          expect(payload).to.be.an('object');
          done();
        });
    });
  });

  describe('POST /login', () => {
    it('should log in a user and return a JWT', (done) => {
      chai.request(app)
        .post('/auth/login')
        // .send({ username: 'user', password: 'pass' }) // If you had a real login process
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          const payload = jwt.verify(res.body.token, 'secretKey');
          expect(payload).to.be.an('object');
          done();
        });
    });
  });

  describe('POST /logout', () => {
    it('should log out a user', (done) => {
      chai.request(app)
        .post('/auth/logout')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message', 'Logged out successfully');
          done();
        });
    });
  });

});
