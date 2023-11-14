import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../server.js'

const { expect } = chai
chai.use(chaiHttp)

describe('POST /ConnectionDetails', () => {
  it('fetch user info from QR code', (done) => {
    chai.request(app)
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
