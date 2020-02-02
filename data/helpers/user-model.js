const db = require('../db-config.js')

module.exports = {
    add,
    find,
    findBy,
    findStylists
}

// add user: requires username, email, password, name, location (is_stylist defaults to false)
function add(userData) {
    return db('user')
        .insert(userData)
}

// return all users
function find() {
    return db('user')
}

// find user(s) based on argument
function findBy(filter) {
    return db('user')        
        .where(filter)
}

// return only stylists
function findStylists() {
    return db('user')
        .where('is_stylist', true)
}