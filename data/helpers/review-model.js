const db = require('../db-config')

module.exports = {
    add,
    find,
    findById,
    update,
    remove,
    findByCustomer,
    findByStylist
}

function add(reviewData) {
    return db('review')
        .insert(reviewData)
}

function find() {
    return db('review')
}

function findById(id) {
    return db('review')
        .where('id', id)
        .first()
}

function update(id, data) {
    return db('review')
        .where('id', id)
        .update({
            title: data.title,
            text: data.text,
            stylist_rating: data.stylist_rating,
            haircut_rating: data.haircut_rating
        })
}

function remove(id) {
    return db('review')
        .where('id', id)
        .del()
}

function findByCustomer(id) {
    return db('review as r')
        .join('user as u', 'u.id', 'r.customer_id')
        .where('r.customer_id', id)
        .select('r.id as review_id', 'r.customer_id', 'r.stylist_id', 'r.title', 'r.text', 'r.stylist_rating', 'r.haircut_rating')
}

function findByStylist(id) {
    return db('review as r')
        .join('user as u', 'u.id', 'r.stylist_id')
        .where('r.stylist_id', id)
        .select('r.id as review_id', 'r.customer_id', 'r.stylist_id', 'r.title', 'r.text', 'r.stylist_rating', 'r.haircut_rating')
}