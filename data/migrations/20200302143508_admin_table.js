
exports.up = function(knex, Promise) {
    return knex.schema.createTable('admin', function(tbl) {
        tbl.increments();
        tbl.text('username')
            .notNullable()
            .unique();
        tbl.text('password')
           .notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('admin');
};