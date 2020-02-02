exports.up = function(knex) {
    return knex.schema  
        .createTable('review', tbl => {
            tbl.increments()
            tbl.integer('stylist_id')
                .notNullable()
                .unsigned()
                .references('id')
                    .inTable('user')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            tbl.integer('customer_id')
                .notNullable()
                .unsigned()
                .references('id')
                    .inTable('user')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            tbl.integer('photo_id')
                .unsigned()
                .references('id')
                    .inTable('photo')
                .onUpdate('CASCADE')
                .onDelete('SET NULL')
            tbl.string('title')
            tbl.text('text')
                .notNullable()
            tbl.integer('stylist_rating')
                .notNullable()
            tbl.integer('haircut_rating')
      })  
}
  
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('review')
}
  