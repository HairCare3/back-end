const db = require('../db-config')

module.exports = {
    add,
    find,
    update,
    findByUser
}

function add(photoData) {
    return db('photo')
        .insert(photoData)
}

function find() {
    return db('photo')
}

function update(id, data) {
    return db('photo')
        .where('id', id)
        .update({
            description: data.description,
            img_url: data.img_url
        })
}

function findByUser(id) {
    return db('photo as p')
        .join('user as u', 'u.id', 'p.user_id')
        .where('p.user_id', id)
        .select('p.id as photo_id', 'p.user_id', 'p.description', 'p.img_url')
}