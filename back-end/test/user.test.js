// assertions
const path = require('path')
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
  // tests that result in success will ask for valid id, and tests that result in
  // failure will ask for id 1
  const successId = '6562c186a4a586c6e19a4eef'
  const serverFailureId = 1
  const badRequestId = 2
  // return 500 status response to failure tests
  beforeEach(function() {
    const failureRe = new RegExp(`\/users\/${serverFailureId}\/*.*`)
    const getServerFailure = nock(/.*/, { allowUnmocked: true })
      .get(failureRe)
      .reply(500, { error: 'Internal Server Error' })
    const putServerFailure = nock(/.*/, { allowUnmocked: true })
      .put(failureRe)
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
              'first_name', 'last_name', 'profile_picture')
            done()
          })
      })
    }),
    describe('Unsuccessful GET', function () {
      it('should respond with an HTTP 500 status code and an error', function (done) {
        chai
          .request(router)
          .get(`/users/${serverFailureId}`)
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
            profile_picture: 'profile_picture'
          })
          .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.be.a('object').that.has.all.keys('message')
            done()
          })
      })
    }),
    describe('Unsuccessful PUT', function () {
      it('should respond with an HTTP 500 status and error message', function (done) {
        chai
          .request(router)
          .put(`/users/${successId}`)
          .send({
            profile_picture: ['bad_data']
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
            expect(res.body).to.deep.nested.have.property('0.name')
            expect(res.body).to.deep.nested.have.property('0.value')
            done()
          })
      })
    }),
    describe('Unsuccessful GET', function () {
      it('should respond with an HTTP 500 status and an error body', function (done) {
        chai
          .request(router)
          .get(`/users/${serverFailureId}/platforms`)
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
            platforms: [
              { name: 'Linkedin', value: 'johndoe254' },
              { name: 'Instagram', value: '@johndoe' }
            ]
          })
          .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.be.a('object').that.has.keys('message')
            done()
          })
      })
    }),
    describe('Unsuccessful PUT', function () {
      it('should respond with an HTTP 400 status and an error body', function (done) {
        chai
          .request(router)
          .put(`/users/${successId}/platforms`)
          .send({
            platforms: [
              { wrong_name: 'bad_platform', wrong_info: 'johndoe254' }
            ]
          })
          .end((err, res) => {
            expect(res).to.have.status(500)
            expect(res.body).to.be.a('object').that.has.keys('error')
            done(err)
          })
      })
    })
  })
  // Profile picture routes: /profilePicture, /uploadPicture
  describe('Profile Picture', function () {
    describe('GET profilePicture', function () {
      describe('Successful GET', function () {
        it('should respond with an HTTP 200 status and profile picture data', function (done) {
          chai
            .request(router)
            .get(`/users/${successId}/profilePicture`)
            .end((err, res) => {
              expect(res).to.have.status(200)
              expect(res.body).to.be.a('object').that.has.keys('profile_picture')
              done()
            })
        })
      })

      describe('Unsuccessful GET', function () {
        it('should respond with an HTTP 500 status and an error body', function (done) {
          chai
            .request(router)
            .get(`/users/${serverFailureId}/profilePicture`)
            .end((err, res) => {
              expect(res).to.have.status(500)
              expect(res.body).to.be.a('object').that.has.keys('error')
              done(err);
            })
        })
      })
    })

    describe('PUT uploadPicture', function () {
      describe('Successful PUT', function () {
        it('should respond with an HTTP 200 status and a confirmation message', function (done) {
          chai
            .request(router)
            .put(`/users/${successId}/uploadPicture`)
            .set('Content-Type', 'multipart/form-data') // Set the content type
            .attach('file', path.join(__dirname, '../public/profile-picture-test.png'))
            .end((err, res) => {
              expect(res).to.have.status(200)
              expect(res.body).to.be.a('object').that.has.keys('message')
              done()
            })
        })
      })

      describe('Unsuccessful PUT (invalid ID)', function () {
        it('should respond with an HTTP 500 status and an error body', function (done) {
          chai
            .request(router)
            // This uses an invalid id
            .put(`/users/${serverFailureId}/uploadPicture`)
            .set('Content-Type', 'multipart/form-data') // Set the content type
            .attach('file', path.join(__dirname, '../public/profile-picture-test.png'))
            .end((err, res) => {
              expect(res).to.have.status(500)
              expect(res.body).to.be.a('object').that.has.keys('error')
              done(err)
            })
        })
      })
    })
  })
})
