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
                done()
            })
    })

    describe('GET /', () => {

        it('should return 401 without token', async () => {
            const res = await request(server)
                .get('/api/users')

            expect(res.status).toBe(401)
        })

        it('should return 200 OK', async () => {
            const res = await request(server)
                .get('/api/users')
                .set('Accept', 'application/json')
                .set('authorization', token)

            expect(res.status).toBe(200)            
        })

        it('should return json', async () => {
            const res = await request(server)
                .get('/api/users')
                .set('Accept', 'application/json')
                .set('authorization', token)

            expect(res.type).toMatch(/json/i)            
        })

    })

    describe('GET /:id', () => {

        it('should return 401 without token', async () => {
            const res = await request(server)
                .get('/api/users/1')

            expect(res.status).toBe(401)
        })

        it('should return 400 invalid ID', async () => {
            const res = await request(server)
                .get('/api/users/9999')
                .set('Accept', 'application/json')
                .set('authorization', token)

            expect(res.status).toBe(400)            
        })

        it('should return 200 OK', async () => {
            const res = await request(server)
                .get('/api/users/1')
                .set('Accept', 'application/json')
                .set('authorization', token)

            expect(res.status).toBe(200)            
        })

        it('should return json', async () => {
            const res = await request(server)
                .get('/api/users/1')
                .set('Accept', 'application/json')
                .set('authorization', token)

            expect(res.type).toMatch(/json/i)            
        })

    })

    describe('PUT /:id', () => {

        it('should return 401 without token', async () => {
            const res = await request(server)
                .get('/api/users/1')

            expect(res.status).toBe(401)
        })

        it('should return 400 invalid ID', async () => {
            const res = await request(server)
                .put('/api/users/9999')
                .set('Accept', 'application/json')
                .set('authorization', token)

            expect(res.status).toBe(400)            
        })

        it('should return 401 if ID does not match client', async () => {
            const res = await request(server)
                .put('/api/users/2')
                .set('Accept', 'application/json')
                .set('authorization', token)

            expect(res.status).toBe(401)            
        })

    })

    describe('DELETE /:id', () => {

        it('should return 401 without token', async () => {
            const res = await request(server)
                .delete('/api/users/1')

            expect(res.status).toBe(401)
        })

        it('should return 400 invalid ID', async () => {
            const res = await request(server)
                .delete('/api/users/9999')
                .set('Accept', 'application/json')
                .set('authorization', token)

            expect(res.status).toBe(400)            
        })

    })

})