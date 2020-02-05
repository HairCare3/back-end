const request = require('supertest')

const server = require('../api/server.js')

describe('photo router', () => {

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
                done()
            })
    })

    describe('GET /', () => {

        it('should return 401 without token', async () => {
            const res = await request(server)
                .get('/api/photos')

            expect(res.status).toBe(401)
        })

        it('should return 200 OK', async () => {
            const res = await request(server)
                .get('/api/photos')
                .set('Accept', 'application/json')
                .set('authorization', token)

            expect(res.status).toBe(200)            
        })

        it('should return json', async () => {
            const res = await request(server)
                .get('/api/photos')
                .set('Accept', 'application/json')
                .set('authorization', token)

            expect(res.type).toMatch(/json/i)            
        })

    }) // GET /

})