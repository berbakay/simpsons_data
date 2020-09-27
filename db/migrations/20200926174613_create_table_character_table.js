
exports.up = function(knex) {
    console.log('creating character table...');
    return knex.schema.createTable('characters', (characterTable) => {
        characterTable.increments('character_id').primary();
        characterTable.string('character_full_name').notNullable();
        characterTable.string('character_short_name').notNullable();
    })
  
};

exports.down = function(knex) {
  console.log('removing character table...');
  return knex.schema.dropTable('characters');
};
