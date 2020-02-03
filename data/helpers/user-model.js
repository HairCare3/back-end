const db = require('../db-config.js')

module.exports = {
    add,
    find,
    findBy,
    findById,
    update,
    updatePassword,
    remove,
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
        .select('id', 'username', 'name', 'email', 'location', 'is_stylist', 'profile_url', 'profile_info')
}

// find user(s) based on argument
function findBy(filter) {
    return db('user')        
        .where(filter)
}

// find user by id
function findById(id) {
    return db('user')
        .where('id', id)
        .first()
        .select('id', 'username', 'name', 'email', 'location', 'is_stylist', 'profile_url', 'profile_info')
}

// edit user by id
function update(id, data) {
    return db('user')
        .where('id', id)
        .update({
            username: data.username,
            email: data.email,
            location: data.location,
            name: data.name,
            is_stylist: data.is_stylist,
            profile_url: data.profile_url,
            profile_info: data.profile_info
        })
}

// edit password by id
function updatePassword(id, password) {
    return db('user')
        .where('id', id)
        .update('password', password)
}

// delete user by id
function remove(id) {
    return db('user')
        .where('id', id)
        .del()
}

// return only stylists
function findStylists() {
    return db('user')
        .where('is_stylist', true)
        .select('id', 'username', 'name', 'email', 'location', 'is_stylist', 'profile_url', 'profile_info')
}