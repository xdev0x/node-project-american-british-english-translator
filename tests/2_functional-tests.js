const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
    
    suite('Translation with text and locale fields: POST request to /api/translate', () => {
        test('Translate Mangoes are my favorite fruit. to British English', (done) => {
            chai.request(server)
                .post('/api/translate')
                .set('content-type', 'application/json')
                .send({ text:'Mangoes are my favorite fruit.' , locale:'american-to-british' })
                .end((err, response) => {
                if (err) throw err
                assert.equal(response.body.text,'Mangoes are my favorite fruit.');
                assert.equal(response.body.translation,'Mangoes are my <span class="highlight">favourite</span> fruit.')
                done();
            });
        });
    })
    suite('Translation with text and invalid locale field: POST request to /api/translate', () => {
        test('Translate locale = dsfsdfdsf. to British English', (done) => {
            chai.request(server)
                .post('/api/translate')
                .set('content-type', 'application/json')
                .send({ text:'Mangoes are my favorite fruit.' , locale:'dsfsdfdsf' })
                .end((err, response) => {
                if (err) throw err
                assert.equal(response.body.error,'Invalid value for locale field');
                done();
            });
        }); 
    })
    suite('Translation with missing text field: POST request to /api/translate', () => {
        test('Translate empty locale. to British English', (done) => {
            chai.request(server)
                .post('/api/translate')
                .set('content-type', 'application/json')
                .send({ locale:'american-to-british' })
                .end((err, response) => {
                if (err) throw err
                assert.equal(response.body.error,'Required field(s) missing');
                done();
            });
        }); 
    })
    suite('Translation with missing locale field: POST request to /api/translate', () => {
        test('Translate missing locale. to British English', (done) => {
            chai.request(server)
                .post('/api/translate')
                .set('content-type', 'application/json')
                .send({ text:'Mangoes are my favorite fruit.' })
                .end((err, response) => {
                if (err) throw err
                assert.equal(response.body.error,'Required field(s) missing');done();
            });
        });
        test('Translate empty locale. to British English', (done) => {
            chai.request(server)
                .post('/api/translate')
                .set('content-type', 'application/json')
                .send({ text:'Mangoes are my favorite fruit.' , locale:'' })
                .end((err, response) => {
                if (err) throw err
                assert.equal(response.body.error,'Invalid value for locale field');
                done();
            });
        });
    })
    suite('Translation with empty text: POST request to /api/translate', () => {
        test('Translate empty text. to British English', (done) => {
            chai.request(server)
                .post('/api/translate')
                .set('content-type', 'application/json')
                .send({ text:'' , locale:'american-to-british' })
                .end((err, response) => {
                if (err) throw err
                assert.equal(response.body.error,'No text to translate');
                done();
            });
        }); 
    })
    suite('Translation with text that needs no translation: POST request to /api/translate', () => {
        test('Translation with that needs no translation', (done) => {
            chai.request(server)
              .post('/api/translate')
              .set('content-type', 'application/json')
              .send({ text: 'random text', locale: 'british-to-american' })
              .end((err, response) => {
                if (err) throw err
                assert.equal(response.status, 200);
                assert.equal(response.body.text,'random text');
                assert.equal(response.body.translation,'Everything looks good to me!')
                done();
              });
          });
    })
});

















