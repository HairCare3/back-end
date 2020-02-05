const request = require('supertest')

const server = require('../api/server.js')

describe('user router', () => {
    let token

    beforeAll((done) => {
        request(server)
            .post('/api/auth/login')
            .send({
                username: 'test',
                password: 'password',
            })
            .end((err, res) => {
                token = res.body.token
                console.log(token)
                done()
            })
    })

    describe('GET /', () => {    
        it('should return 200 OK', async () => {
            const response = await request(server)
                .get('/api/users')
                .set('Accept', 'application/json')
                .set('authorization', token)

            expect(response.status).toBe(200)
        })
    })
})