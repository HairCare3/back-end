exports.up = function(knex) {
    return knex.schema  
        .createTable('photo', tbl => {
            tbl.increments()
            tbl.integer('user_id')
                .notNullable()
                .unsigned()
                .references('id')
                    .inTable('user')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            tbl.string('description')
            tbl.string('img_url')
                .notNullable()
                .unique()
            tbl.boolean('review_photo')
                .defaultTo(false)
      })  
}
  
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('photo')
}
  