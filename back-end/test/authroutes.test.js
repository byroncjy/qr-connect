const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const mongoose = require('mongoose');
const app = require('../app'); 
const User = require('../models/User'); 

chai.use(chaiHttp);
const expect = chai.expect;

describe('User Routes', () => {
  beforeEach(() => {
    sinon.restore(); // Restore the default sandbox here
  });

  describe('POST /signup', () => {
    it('should create a new user and return a token', (done) => {
      // Stub the findOne and save methods on the User model
      sinon.stub(User, 'findOne').resolves(null);
      sinon.stub(User.prototype, 'save').resolves({
        _id: '123456789',
        email: 'test@example.com',
        first_name: 'John',
        last_name: 'Doe'
      });

      chai.request(app)
        .post('/api/signup') // Adjust the route path based on your Express routes
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

    // Additional test cases for /signup can be added here
  });

  describe('POST /login', () => {
    it('should login a user and return a token', (done) => {
      // Stub the findOne method on the User model
      sinon.stub(User, 'findOne').resolves({
        _id: '123456789',
        email: 'test@example.com',
        password: bcrypt.hashSync('password123', 10)
      });

      chai.request(app)
        .post('/api/login') // Adjust the route path based on your Express routes
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

    // Additional test cases for /login can be added here
  });

  describe('POST /logout', () => {
    it('should log out a user', (done) => {
      chai.request(app)
        .post('/api/logout') // Adjust the route path based on your Express routes
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
      
      chai.request(app)
        .get('/api/protected') // Adjust the route path based on your Express routes
        .set('Authorization', `Bearer ${fakeToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          // Additional assertions
          done();
        });
    });

    // ... other test cases for protected route
  });
});