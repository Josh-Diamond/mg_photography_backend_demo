
exports.up = function(knex, Promise) {
    return knex.schema.createTable('security', function(tbl) {
        tbl.increments();
        tbl.text('username')
            .notNullable()
            .unique()
        tbl.text('security_question')
           .notNullable();
        tbl.text('security_question_answer')
           .notNullable()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('security');
};