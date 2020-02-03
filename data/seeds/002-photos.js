exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('photo').del()
    .then(function () {
      // Inserts seed entries
      return knex('photo').insert([
        {
          id: 1,
          user_id: 1,
          description: 'This is a photo',
          img_url: 'https://picsum.photos/400'
        },
        {
          id: 2,
          user_id: 1,
          description: 'This is another photo',
          img_url: 'https://picsum.photos/500'
        },
        {
          id: 3,
          user_id: 2,
          description: 'This is a customer photo',
          img_url: 'https://picsum.photos/600'
        }
      ]);
    });
};
