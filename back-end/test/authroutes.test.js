// Import necessary libraries
const request = require('supertest');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const { User } = require('./models/User'); // Update this path as necessary

const app = express();
app.use('/', require('./path-to-your-router')); // Update with the path to your router file

describe('Authentication Tests', () => {
    let mongoServer;

    beforeAll(async () => {
        // Setup an in-memory MongoDB server
        mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        // Disconnect and stop in-memory MongoDB server
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    beforeEach(async () => {
        // Clear the users collection before each test
        await User.deleteMany({});
    });

    // Test for Sign Up functionality
    test('Sign Up - Successful', async () => {
        const res = await request(app)
            .post('/signup')
            .send({ email: 'test@example.com', password: 'password123', first_name: 'John', last_name: 'Doe' });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('token');
    });

    describe('Signup Error Tests', () => {
      test('Signup - Missing Fields', async () => {
          const res = await request(app)
              .post('/signup')
              .send({ email: 'test@example.com', first_name: 'John', last_name: 'Doe' }); // Password is missing
          expect(res.statusCode).toBe(400);
          expect(res.body).toHaveProperty('error');
      });
  
      test('Signup - Existing User', async () => {
          // First create a user
          const hashedPassword = await bcrypt.hash('password123', 10);
          await User.create({ email: 'test@example.com', password: hashedPassword, first_name: 'John', last_name: 'Doe' });
  
          // Then try to create the same user again
          const res = await request(app)
              .post('/signup')
              .send({ email: 'test@example.com', password: 'password123', first_name: 'John', last_name: 'Doe' });
          expect(res.statusCode).toBe(409);
          expect(res.body).toHaveProperty('message', 'User already exists');
      });
  });
    // Test for Login functionality
    test('Login - Successful', async () => {
        // First create a user
        const hashedPassword = await bcrypt.hash('password123', 10);
        await User.create({ email: 'test@example.com', password: hashedPassword, first_name: 'John', last_name: 'Doe' });

        // Then test the login
        const res = await request(app)
            .post('/login')
            .send({ email: 'test@example.com', password: 'password123' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
    });

    describe('Login Error Tests', () => {
      test('Login - Missing Fields', async () => {
          const res = await request(app)
              .post('/login')
              .send({ email: 'test@example.com' }); // Password is missing
          expect(res.statusCode).toBe(400);
          expect(res.body).toHaveProperty('error');
      });
  
      test('Login - Invalid Credentials', async () => {
          // First create a user
          const hashedPassword = await bcrypt.hash('password123', 10);
          await User.create({ email: 'test@example.com', password: hashedPassword, first_name: 'John', last_name: 'Doe' });
  
          // Then try to log in with the wrong password
          const res = await request(app)
              .post('/login')
              .send({ email: 'test@example.com', password: 'wrongPassword' });
          expect(res.statusCode).toBe(401);
          expect(res.body).toHaveProperty('message', 'Invalid credentials');
      });
  });
    // Test for Logout functionality
    test('Logout - Successful', async () => {
        const res = await request(app).post('/logout');
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Logout successful');
    });

    // ... additional tests for protected route access
});

