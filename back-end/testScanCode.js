import chai from 'chai'
import chaiHttp from 'chai-http'
import app from './server.js'

const { expect } = chai
chai.use(chaiHttp)
chai.should()

describe('GET /ScanCode', () => {
  it('return a JSON object with the LogoUrl', (done) => {
    chai.request(app)
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
