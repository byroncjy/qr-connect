const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const expect = chai.expect

chai.use(chaiHttp)

describe('POST /ConnectionDetails', () => {
  it('fetch user info from QR code', (done) => {
    chai.request(server)
      .post('/ConnectionDetails')
      .send({ qrCodeText: `${process.env.USER_INFO_API}?key=${process.env.USER_INFO_API_KEY}` })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('array')
        done()
      })
  })
})
