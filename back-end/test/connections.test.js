const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app'); 

chai.use(chaiHttp);
chai.should();

describe('Connections', () => {
  describe('/GET saved-connections', () => {
    it('it should GET all the connections', (done) => {
      chai.request(server)
        .get('/api/saved-connections')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  describe('/GET non-existent-endpoint', () => {
    it('it should return 404 for non-existent endpoint', (done) => {
      chai.request(server)
        .get('/api/non-existent-endpoint')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('/GET saved-connections with wrong endpoint', () => {
    it('it should not GET connections due to wrong endpoint', (done) => {
      chai.request(server)
        .get('/api/incorrect-endpoint')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('/GET saved-connections with simulated server error', () => {
    before(() => {
      process.env.SIMULATE_ERROR = 'true';
    });

    after(() => {
      delete process.env.SIMULATE_ERROR;
    });

    it('it should handle server error', (done) => {
      chai.request(server)
        .get('/api/saved-connections')
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });
});
