const express = require('express');
const chai = require('chai');
const chaiHttp = require('chai-http');
const nock = require('nock');
const router = require('./unchanged-images'); // Update with the path to your router file

const expect = chai.expect;
chai.use(chaiHttp);

describe('Router Tests', function() {
  let app;

  before(function() {
    app = express();
    app.use('/', router);
  });

  it('should fetch and return an image successfully', function(done) {
    nock('https://picsum.photos')
      .get('/400')
      .reply(200, 'mock-image-data', { 'Content-Type': 'image/jpeg' });

    chai.request(app)
      .get('/home-logo-image')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.have.header('content-type', 'image/jpeg');
        done();
      });
  });

  it('should handle an error when fetching the image', function(done) {
    nock('https://picsum.photos')
      .get('/400')
      .replyWithError('Mocked error');

    chai.request(app)
      .get('/home-logo-image')
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.text).to.equal('Error fetching image');
        done();
      });
  });
});
