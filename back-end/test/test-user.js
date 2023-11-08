var chai = require('chai')
var assert = require('assert');
var router = require('../router')

var expect = chai.expect

// tests related to sending requests about a user
describe('User Routes', function () {
  // email, first/last name, pfp
  describe('Account Information', function () {
    describe('Successful GET', function () {
      it('should respond with an HTTP 200 status code and an object in the body'), function () {
        // example id
        const id = 0
        chai
          .request(router)
          .get(`/user/${id}`)
          .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.a.('object')
            expect(res.body).to.have.all.keys('email', 'first_name', 'last_name', 'url_picture')
            done()
          })
      })
    }),
    describe('Unsuccessful GET', function () {
      it('should respond with an HTTP 500 status code and an error', function () {
        chai
          .request(router)
          .get('/user/notanid')
          .end(err, res) => {
            expect(res).to.have.status(500)
            expect(res.body).to.be.a.('object')
            expect(res).to.have.keys('error')
            done()
      })
    }),
    describe('Successful PUT', function () {
      it('should respond with an HTTP 200 status and confirmation message', function () {
        chai
          .request(router)
          .put(`/user/${id}`)
          .send({
            email: 'email',
            first_name: 'first_name',
            last_name: 'last_name',
            url_picture: 'url_picture'
          })
          .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.a.('object')
            expect(res.body).to.have.keys('message')
            done()
          })
      })
    }),
    describe('Unsuccessful PUT', function() {
      it('should respond with an HTTP 500 status and error message'), function () {
        chai
          .request(router)
          .put(`/user/${id}`)
          .send({
            bad_data: 'bad_data'
          })
          .end((err, res) => {
            expect(res).to.have.status(500)
            expect(res.body).to.be.a.('object')
            expect(res).to.have.keys('error')
            done()
          })
      })
    })
  }),
  // personal information added by the user
  describe('User information', function () {
    describe('Successful GET', function () {
    }),
    describe('Unsuccessful GET', function () {
    }),
    describe('Successful PUT', function () {
    }),
    describe('Unsuccessful PUT', function () {
    })
  })
})

