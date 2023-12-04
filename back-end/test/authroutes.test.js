const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const server = require('../app'); // Replace with the path to your Express app
const User = require('../models/User'); // Replace with the correct path

chai.use(chaiHttp);
const expect = chai.expect;

describe('User Routes', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('POST /signup', () => {
    it('should create a new user and return a token', (done) => {
      sinon.stub(User, 'findOne').resolves(null);
      sinon.stub(User.prototype, 'save').resolves({
        _id: '123456789',
        email: 'test@example.com',
        first_name: 'John',
        last_name: 'Doe'
      });

      chai.request(server)
        .post('/signup')
        .send({
          email: 'test@example.com',
          password: 'password123',
          first_name: 'John',
          last_name: 'Doe'
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('token');
          done();
        });
    });
    // ... other test cases for signup
  });

  describe('POST /login', () => {
    it('should login a user and return a token', (done) => {
      sinon.stub(User, 'findOne').resolves({
        _id: '123456789',
        email: 'test@example.com',
        password: bcrypt.hashSync('password123', 10)
      });

      chai.request(server)
        .post('/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('token');
          done();
        });
    });

    // ... other test cases for login
  });

  describe('POST /logout', () => {
    it('should log out a user', (done) => {
      chai.request(server)
        .post('/logout')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message', 'Logout successful');
          done();
        });
    });
  });

  describe('GET /protected', () => {
    it('should access the protected route with a valid token', (done) => {
      const fakeToken = jwt.sign({ userId: '123456789' }, 'yourDefaultJwtSecret');
      
      chai.request(server)
        .get('/protected')
        .set('Authorization', `Bearer ${fakeToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          done();
        });
    });

    // ... other test cases for protected route
  });
});
