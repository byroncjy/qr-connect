const chai = require('chai')
const router = require('../router')

const expect = chai.expect

// tests related to sending requests about a user
describe('User Routes', function () {
  // email, first/last name, pfp
  describe('Account Information', function () {
    describe('Successful GET', function () {
      it('should respond with an HTTP 200 status code and an object in the body', function () {
        // example id
        const id = 0
        chai
          .request(router)
          .get(`/user/${id}`)
          .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.a('object')
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
          .end((err, res) => {
            expect(err).to.not.be.null
            expect(res).to.have.status(500)
            expect(res.body).to.be.a('object')
            expect(res).to.have.keys('error')
            done()
          })
      })
    }),
    describe('Successful PUT', function () {
      it('should respond with an HTTP 200 status and confirmation message', function () {
        const id = 0
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
            expect(res.body).to.be.a('object')
            expect(res.body).to.have.keys('message')
            done()
          })
      })
    }),
    describe('Unsuccessful PUT', function () {
      it('should respond with an HTTP 500 status and error message', function () {
        const id = 0
        chai
          .request(router)
          .put(`/user/${id}`)
          .send({
            bad_data: 'bad_data'
          })
          .end((err, res) => {
            expect(res).to.have.status(500)
            expect(res.body).to.be.a('object')
            expect(res).to.have.keys('error')
            done()
          })
      })
    })
  }),
  // personal information added by the user
  describe('User information', function () {
    describe('Successful GET', function () {
      it('should respond with an HTTP 200 status and platforms list body', function () {
        const id = 0
        chai
          .request(router)
          .get(`/user/${id}/platforms`)
          .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.a('object')
          })
      })
    }),
    describe('Unsuccessful GET', function () {
      it('should respond with an HTTP 500 status and an error body', function () {
        chai
          .request(router)
          .get('/user/notanid/platforms')
          .end((err, res) => {
            expect(res).to.have.status(500)
            expect(res.body).to.be.a('object')
            expect(res.body).to.have.keys('error')
          })
      })
    }),
    describe('Successful PUT', function () {
      it('should respond with an HTTP 200 status and a confirmation message', function () {
        const id = 0
        chai
          .request(router)
          .put(`/user/${id}/platforms`)
          .send({
            platform_1: 'platform_1',
            platform_2: 'platform_2'
          })
          .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.a('object')
            expect(res.body).to.have.keys('message')
          })
      })
    }),
    describe('Unsuccessful PUT', function () {
      it('should respond with an HTTP 500 status and an error body', function () {
        chai
          .request(router)
          .put('/user/anid/platforms')
          .send({})
          .end((err, res) => {
            expect(res).to.have.status(500)
            expect(res.body).to.be.a('object')
            expect(res.body).to.have.keys('error')
          })
      })
    })
  })
})
