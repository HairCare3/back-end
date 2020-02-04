const db = require('../db-config')

module.exports = {
    add,
    find,
    findById,
    findByUrl,
    update,
    remove,
    findByUser
}

function add(photoData) {
    return db('photo')
        .insert(photoData)
}

function find() {
    return db('photo')
}

function findById(id) {
    return db('photo')
        .where('id', id)
        .first()
}

function findByUrl(url) {
    return db('photo')
        .where('img_url', url)
        .first()
}

function update(id, data) {
    return db('photo')
        .where('id', id)
        .update({
            description: data.description,
            img_url: data.img_url
        })
}

function remove(id) {
    return db('photo')
        .where('id', id)
        .del()
}

function findByUser(id) {
    return db('photo as p')
        .join('user as u', 'u.id', 'p.user_id')
        .where('p.user_id', id)
        .select('p.id as photo_id', 'p.user_id', 'p.description', 'p.img_url')
}