exports.up = function(knex) {
    return knex.schema  
        .createTable('user', tbl => {
            tbl.increments()
            tbl.string('username')
                .notNullable()
                .unique()
                .index()
            tbl.string('email')
                .notNullable()
                .unique()
                .index()
            tbl.string('password')
                .notNullable()
            tbl.string('location')
                .notNullable()
                .index()
            tbl.boolean('is_stylist')
                .defaultTo(false)
            tbl.string('profile_url')
      })  
}
  
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('user')
}
  