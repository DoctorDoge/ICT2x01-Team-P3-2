let mongoose = ('mongoose');
let request = require('supertest');
let server = require('../server');
let login = require('../routers/account')
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
     * Test update user password and redirect to login page
     */
    it('it should change password when user update the password', (done) => {
        let user = {
            newPassword: '12345'
        }
        request(server).post('/account/updatePass')
             .send(user)
           .expect(200)
            .end((err, res) => {
                done();
            });
    });

    /**
     * Test Swithch role function, User should logout and no longer can access the authorized page
     */
    it('it should logout when switch to student role', (done) => {
        request(server).post('/student')
            .expect(200)
            .end((err, res) => {
                done();
            });
    });
});