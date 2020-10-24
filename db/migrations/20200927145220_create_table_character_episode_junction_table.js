
exports.up = function(knex) {
  console.log('creating character episode junction table...');
  return knex.schema.createTable('characterepisode', (characterepisodeTable) => {
    characterepisodeTable.increments('character_episode_id').primary();  
    characterepisodeTable.integer('character_id').references('characters.character_id');
    characterepisodeTable.integer('episode_id').references('episodes.episode_id');
  })
};

exports.down = function(knex) {
  console.log('deleting chracter episode junction table...');
  return knex.schema.dropTable('characterepisode');
};
