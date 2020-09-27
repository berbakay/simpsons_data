
exports.up = function(knex) {
    console.log('creating episode table...');
    return knex.schema.createTable('episodes', (episodeTable) => {
        episodeTable.increments('episode_id').primary();
        episodeTable.string('title').notNullable();
        episodeTable.integer('season').notNullable();
        episodeTable.integer('episode').notNullable();
        episodeTable.text('description').notNullable();
        episodeTable.string('disneyplus_id');
        episodeTable.bigInteger('simpsonsworld_id');
        episodeTable.boolean('good').notNullable();
    })
  
};

exports.down = function(knex) {
  console.log('removing episode table...');
  return knex.schema.dropTable('episodes');
};
