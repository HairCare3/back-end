const db = require('../db-config.js')

module.exports = {
    add,
    find,
    findBy,
    findById,
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
        .select('id', 'name', 'email', 'location', 'is_stylist', 'profile_url')
}

// find user(s) based on argument
function findBy(filter) {
    return db('user')        
        .where(filter)
}

function findById(id) {
    return db('user')
        .where('id', id)
        .first()
        .select('id', 'name', 'email', 'location', 'is_stylist', 'profile_url')
}

// return only stylists
function findStylists() {
    return db('user')
        .where('is_stylist', true)
        .select('id', 'name', 'email', 'location', 'is_stylist', 'profile_url')
}