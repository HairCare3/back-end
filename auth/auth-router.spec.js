const request = require('supertest')

const server = require('../api/server.js')

describe('auth router', () => {

    describe('POST /login', () => {

        it('should return 401 with invalid credentials', async () => {
            const res = await request(server)
                .post('/api/auth/login')
                .send({
                    username: 'wrongtest',
                    password: 'wrongpassword',
                })

            expect(res.status).toBe(401)
        })

        it('should return 400 with missing credentials', async () => {
            const res = await request(server)
                .post('/api/auth/login')
                .send({
                    username: 'test'
                })

            expect(res.status).toBe(400)
        })

        it('should return 200', async () => {
            const res = await request(server)
                .post('/api/auth/login')
                .send({
                    username: 'test',
                    password: 'password',
                })

            expect(res.status).toBe(200)
        })

        it('should return token', async () => {
            const res = await request(server)
                .post('/api/auth/login')
                .send({
                    username: 'test',
                    password: 'password',
                })

            expect(res.body.token).toBeTruthy()
        })

    })

    describe('POST /register', () => {

        it('should return 400 with missing required fields', async () => {
            const res = await request(server)
                .post('/api/auth/register')
                .send({})

            expect(res.status).toBe(400)
        })

    })

})