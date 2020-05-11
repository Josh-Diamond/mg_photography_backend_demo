
exports.up = function(knex, Promise) {
    return knex.schema.createTable('profile', function(tbl) {
        tbl.increments();
        tbl.text('profile_picture_url')
        .notNullable();
        tbl.text('view_all_picture_url')
        .notNullable();
        tbl.text('modeling_picture_url')
        .notNullable();
        tbl.text('photography_picture_url')
        .notNullable();
        tbl.text('art_picture_url')
        .notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('profile');
};