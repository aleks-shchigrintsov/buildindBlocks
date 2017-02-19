var request = require('supertest');
var app = require('./app');

describe('Requests to the root path', function() {
  it('Returns a 200 status code', function(done) {
    request(app)
      .get('/')
      .expect(200, done)
  });

  it('Returns a HTML format', function(done) {
    request(app)
      .get('/')
      .expect('Content-Type', /html/, done)
  });

  it('Returns an index file with Cities', function(done) {
    request(app)
      .get('/')
      .expect(/cities/i, done);
  });
});

describe('Listing cities on /cities', function () {
  it ('Returns 200 status code', function(done) {
      request(app)
        .get('/cities')
        .expect(200, done)
  });

  it('Returns json format', function(done) {
    request(app)
      .get('/cities')
      .expect('Content-Type', /json/, done);
  });

  it('Returns initial cities' , function(done) {
    request(app)
      .get('/cities')
      .expect(JSON.stringify(['Loopa', 'London', 'SanFran']), done);
  });
});

describe('Creating new cities', function() {
  it('Returns 201 status code', function(done) {
    request(app)
      .post('/cities')
      .send('name=Springfield&description=what+a+fuck+?')
      .expect(201, done);
  });

  it('Returns created city name', function(done) {
    request(app)
      .post('/cities')
      .send('name=Springfield&description=what+a+fuck+?')
      .expect(/Springfield/i, done);
  });
});
