const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app'); 
const should = chai.should();

chai.use(chaiHttp);

describe('Connections', () => {
  describe('/GET saved-connections', () => {
    it('it should GET all the connections', (done) => {
      chai.request(server)
        .get('/api/saved-connections')
        .end((err, res) => {
          should.not.exist(err); 
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
});