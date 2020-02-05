const request = require('supertest')

const server = require('../api/server.js')

describe('stylist router', () => {

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
                .get('/api/stylists')

            expect(res.status).toBe(401)
        })

        it('should return 200 OK', async () => {
            const res = await request(server)
                .get('/api/stylists')
                .set('Accept', 'application/json')
                .set('authorization', token)

            expect(res.status).toBe(200)            
        })

        it('should return json', async () => {
            const res = await request(server)
                .get('/api/stylists')
                .set('Accept', 'application/json')
                .set('authorization', token)

            expect(res.type).toMatch(/json/i)            
        })

    }) // GET /

    describe('GET /:id', () => {

        it('should return 401 without token', async () => {
            const res = await request(server)
                .get('/api/stylists/1')

            expect(res.status).toBe(401)
        })

        it('should return 400 invalid ID', async () => {
            const res = await request(server)
                .get('/api/stylists/9999')
                .set('Accept', 'application/json')
                .set('authorization', token)

            expect(res.status).toBe(400)            
        })

        it('should return 400 if not stylist', async () => {
            const res = await request(server)
                .get('/api/stylists/2')
                .set('Accept', 'application/json')
                .set('authorization', token)

            expect(res.status).toBe(400)            
        })

        it('should return 200 OK', async () => {
            const res = await request(server)
                .get('/api/stylists/1')
                .set('Accept', 'application/json')
                .set('authorization', token)

            expect(res.status).toBe(200)            
        })

        it('should return json', async () => {
            const res = await request(server)
                .get('/api/stylists/1')
                .set('Accept', 'application/json')
                .set('authorization', token)

            expect(res.type).toMatch(/json/i)            
        })

        it('should return photos and reviews', async () => {
            const res = await request(server)
                .get('/api/stylists/1')
                .set('Accept', 'application/json')
                .set('authorization', token)

            expect(res.body.photos).toBeTruthy()
            expect(res.body.reviews).toBeTruthy()
        })

    }) // GET /:id

    describe('POST /:id', () => {

        it('should return 401 without token', async () => {
            const res = await request(server)
                .post('/api/stylists/1')
                .send({
                    text: 'review text',
                    stylist_rating: 5,
                    haircut_rating: 4
                })

            expect(res.status).toBe(401)
        })

        it('should return 400 invalid ID', async () => {
            const res = await request(server)
                .post('/api/stylists/9999')
                .set('Accept', 'application/json')
                .set('authorization', token)
                .send({
                    text: 'review text',
                    stylist_rating: 5,
                    haircut_rating: 4
                })

            expect(res.status).toBe(400)            
        })

        it('should return 400 if not stylist', async () => {
            const res = await request(server)
                .post('/api/stylists/2')
                .set('Accept', 'application/json')
                .set('authorization', token)
                .send({
                    text: 'review text',
                    stylist_rating: 5,
                    haircut_rating: 4
                })

            expect(res.status).toBe(400)            
        })

        it('should return 400 if ID matches client', async () => {
            const res = await request(server)
                .post('/api/stylists/1')
                .set('Accept', 'application/json')
                .set('authorization', token)
                .send({
                    text: 'review text',
                    stylist_rating: 5,
                    haircut_rating: 4
                })

            expect(res.status).toBe(400)            
        })

        it('should return 400 if required fields are missing', async () => {
            const res = await request(server)
                .post('/api/stylists/3')
                .set('Accept', 'application/json')
                .set('authorization', token)
                .send({})

            expect(res.status).toBe(400)            
        })

        it('should return 400 if rating is out of bounds', async () => {
            const res = await request(server)
                .post('/api/stylists/3')
                .set('Accept', 'application/json')
                .set('authorization', token)
                .send({
                    text: 'review text',
                    stylist_rating: 10,
                    haircut_rating: 10
                })

            expect(res.status).toBe(400)            
        })

        it('should return 201', async () => {
            const res = await request(server)
                .post('/api/stylists/3')
                .set('Accept', 'application/json')
                .set('authorization', token)
                .send({
                    text: 'review text',
                    stylist_rating: 5,
                    haircut_rating: 4
                })

            expect(res.status).toBe(201)            
        })

    }) // POST /:id

})