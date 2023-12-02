const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app'); 

chai.use(chaiHttp);
chai.should();

describe('Connections', function() {
  this.timeout(5000); 
  describe('/GET /users/:id', () => {
    it('should GET a user by ID', (done) => {
      const validUserId = '656a21d3110e39dcc9abb4cc'; 
      chai.request(server)
        .get(`/users/${validUserId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('/GET /connections/:userId', () => {
    it('should GET all the connections for a user', (done) => {
      const testUserId = '656a21d3110e39dcc9abb4cc';
      chai.request(server)
        .get(`/connections/${testUserId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });

    it('should return 400 for an invalid user ID format', (done) => {
      const invalidUserId = '! !';
      chai.request(server)
        .get(`/connections/${invalidUserId}`)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should return 404 for a non-existent user or no connections', (done) => {
      const nonExistentUserId = '656a21d3110e39dcc9abb422'; 
      chai.request(server)
        .get(`/connections/${nonExistentUserId}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

});


describe('/DELETE /connections/:userId/:friendId', () => {
  it('should DELETE a connection for a user', (done) => {
    const testUserId = '656a21d3110e39dcc9abb4cc';
    const testFriendId = '6562c186a4a586c6e19a4eef'; 
    chai.request(server)
      .delete(`/connections/${testUserId}/${testFriendId}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should return 400 for an invalid user ID or friend ID format', (done) => {
    const invalidUserId = '! !';
    const invalidFriendId = '! !';
    chai.request(server)
      .delete(`/connections/${invalidUserId}/${invalidFriendId}`)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should return 404 for a non-existent user or friend ID', (done) => {
    const nonExistentUserId = '656a21d3110e39dcc9abb4ee'; 
    const nonExistentFriendId = '656a21d3110e39dcc9abb4ff';
    chai.request(server)
      .delete(`/connections/${nonExistentUserId}/${nonExistentFriendId}`)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});