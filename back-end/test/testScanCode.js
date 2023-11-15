const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const expect = chai.expect

chai.use(chaiHttp)
chai.should()

describe('GET /ScanCode', () => {
  it('return a JSON object with the LogoUrl', (done) => {
    chai.request(server)
      .get('/ScanCode')
      .end((err, res) => {
        expect(err).to.be.null
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('LogoUrl')
        done()
      })
  })
})
