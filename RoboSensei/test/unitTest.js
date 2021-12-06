let mongoose = ('mongoose');
let request = require('supertest');
let server = require('../server');
let login = require('../routers/login')
let chai = require('chai');
let should = chai.should();


describe('/POST Login', () => {

    /**
     * Test login function (Successful)
     */
    it('it should login with correct credentials', (done) => {
        let user = {
            password: 'password123'
        }
        request(server).post('/login')
            .send(user)
            .expect(302)
            .end((err, res) => {
                cookie = res.headers['set-cookie'];
                done();
            });
    });

    /**
     * Test login function (Fail/invalid credentials)
     */
    it('it should not login with incorrect credentials', (done) => {
        let user = {
            password: '12345'
        }
        request(server).post('/login')
            .send(user)
            .expect(401)
            .end((err, res) => {
                done();
            });
    });

    /**
     * Test Swithch role function, User should logout and no longer can access the authorized page
     */
    it('it should not login with incorrect credentials', (done) => {
        let user = {
            password: '12345'
        }
        request(server).post('/login')
            .send(user)
            .expect(401)
            .end((err, res) => {
                done();
            });
    });
});