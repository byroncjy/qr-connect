// assertions
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)
// fakes
const nock = require('nock')
// routes
const router = require('../app')


// tests related to sending requests about a users
describe('User Routes', function () {
  // tests that result in success will ask for id 0, and tests that result in
  // failure will ask for id 1
  const successId = 0
  const failureId = 1
  // return 500 status response to failure tests
  beforeEach(function() {
    const re = new RegExp(`\/users\/${failureId}\/*.*`)
    const getFailure = nock(/.*/, { allowUnmocked: true })
      .get(re)
      .reply(500, { error: 'Internal Server Error' })
    const putFailure = nock(/.*/, { allowUnmocked: true })
      .put(re)
      .reply(500, { error: 'Internal Server Error' })
  })
  afterEach(function () {
    nock.cleanAll()
  })
  // email, first/last name, pfp
  describe('Account Information', function () {
    describe('Successful GET', function () {
      it('should respond with an HTTP 200 status code and an object in the body', function (done) {
        chai
          .request(router)
          .get(`/users/${successId}`)
          .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.a('object').that.has.all.keys('email',
              'first_name', 'last_name', 'url_picture')
            done()
          })
      })
    }),
    describe('Unsuccessful GET', function () {
      it('should respond with an HTTP 500 status code and an error', function (done) {
        chai
          .request(router)
          .get(`/users/${failureId}`)
          .end((err, res) => {
            expect(res).to.have.status(500)
            expect(res.body).to.be.a('object').that.has.keys('error')
            done(err)
          })
      })
    }),
    describe('Successful PUT', function () {
      it('should respond with an HTTP 200 status and confirmation message', function (done) {
        chai
          .request(router)
          .put(`/users/${successId}`)
          .send({
            email: 'email',
            first_name: 'first_name',
            last_name: 'last_name',
            url_picture: 'url_picture'
          })
          .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.be.a('object').that.has.all.keys('message', 'updatedUserData')
            done()
          })
      })
    }),
    describe('Unsuccessful PUT', function () {
      it('should respond with an HTTP 500 status and error message', function (done) {
        chai
          .request(router)
          .put(`/users/${failureId}`)
          .send({
            bad_data: 'bad_data'
          })
          .end((err, res) => {
            expect(res).to.have.status(500)
            expect(res.body).to.be.a('object').that.has.keys('error')
            done(err)
          })
      })
    })
  }),
  // personal information added by the users
  describe('User information', function () {
    describe('Successful GET', function () {
      it('should respond with an HTTP 200 status and platforms list body', function (done) {
        chai
          .request(router)
          .get(`/users/${successId}/platforms`)
          .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.be.a('array')
            expect(res.body).to.deep.nested.have.property('0.platform')
            expect(res.body).to.deep.nested.have.property('0.info')
            done()
          })
      })
    }),
    describe('Unsuccessful GET', function () {
      it('should respond with an HTTP 500 status and an error body', function (done) {
        chai
          .request(router)
          .get(`/users/${failureId}/platforms`)
          .end((err, res) => {
            expect(res).to.have.status(500)
            expect(res.body).to.be.a('object').that.has.keys('error')
            done(err)
          })
      })
    }),
    describe('Successful PUT', function () {
      it('should respond with an HTTP 200 status and a confirmation message', function (done) {
        chai
          .request(router)
          .put(`/users/${successId}/platforms`)
          .send({
            platform_1: 'platform_1',
            platform_2: 'platform_2'
          })
          .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.be.a('object').that.has.keys('message')
            done()
          })
      })
    }),
    describe('Unsuccessful PUT', function () {
      it('should respond with an HTTP 500 status and an error body', function (done) {
        chai
          .request(router)
          .put(`/users/${failureId}/platforms`)
          .send({ 
            bad_data: 'bad_data'
          })
          .end((err, res) => {
            expect(res).to.have.status(500)
            expect(res.body).to.be.a('object').that.has.keys('error')
            done(err)
          })
      })
    })
  })
})
