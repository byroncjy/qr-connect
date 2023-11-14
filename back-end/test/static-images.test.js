const express = require('express');
const chai = require('chai');
const chaiHttp = require('chai-http');
const nock = require('nock');
const router = require('../unchanged-images'); // Make sure this is the correct path

const expect = chai.expect;
chai.use(chaiHttp);

describe('Router Tests', function() {
  let app;

  before(function() {
    app = express();
    app.use('/', router);
  });

  it('should fetch and return an image successfully', async function() {
    nock('https://picsum.photos')
      .get('/400')
      .reply(200, Buffer.from('mock-image-data'), { 'Content-Type': 'image/jpeg' });

    const res = await chai.request(app).get('/home-logo-image');
    expect(res).to.have.status(200);
    expect(res.headers).to.include({ 'content-type': 'image/jpeg' });
    expect(res.body).to.be.an.instanceof(Buffer); // Additional check for response body
  });
  //this part should return an error
  it('should handle an error when fetching the image', async function() {
    nock('https://picsum.photos')
      .get('/400')
      .replyWithError('Mocked error');

    const res = await chai.request(app).get('/home-logo-image');
    expect(res).to.have.status(500);
    expect(res.text).to.equal('Error fetching image');
  });


  // Ensure nock interceptors are removed after tests
  after(function() {
    nock.cleanAll();
  });
});