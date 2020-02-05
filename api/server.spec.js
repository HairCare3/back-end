const request = require('supertest')

const server = require('./server.js')

describe('server', () => {

    it('runs the test', () => {
        expect(true).toBe(true)
    })

    describe('GET /', () => {
        it('should return 200 OK', () => {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it('should return JSON', () => {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.type).toMatch(/json/i)
                })
        })

        it('should return api_status: "up"', () => {
            // make a GET request to /
            return request(server).get('/').then(res => {
                // check that the status code is 200
                expect(res.body).toEqual({ api_status: "up" })
            })
        })
    })
    
})