
exports.up = function(knex, Promise) {
    return knex.schema.createTable('pictures', function(tbl) {
        tbl.increments();
        tbl.text('category')
           .notNullable();
        tbl.text('date');
        tbl.text('description');
        tbl.text('location');
        tbl.text('photographer');
        tbl.text('event');
        tbl.text('tags');
        tbl.integer('order_number');
        tbl.text('image_url')
            .notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('pictures');
};