import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../server.js'

const { expect } = chai
chai.use(chaiHttp)

describe('POST /ConnectionDetails', () => {
  it('fetch user info from QR code', (done) => {
    chai.request(app)
      .post('/ConnectionDetails')
      .send({ qrCodeText: 'https://my.api.mockaroo.com/QRcodeResult.json?key=723ed310' })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('array')
        done()
      })
  })
})
