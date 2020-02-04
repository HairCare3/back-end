exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('photo')
    .then(function () {
      // Inserts seed entries
      return knex('photo').insert([
        {
          user_id: 1,
          description: 'This is a photo',
          img_url: 'https://picsum.photos/400',
          review_photo: false
        },
        {
          user_id: 1,
          description: 'This is another photo',
          img_url: 'https://picsum.photos/500',
          review_photo: false
        },
        {
          user_id: 2,
          description: 'This is a customer photo',
          img_url: 'https://picsum.photos/600',
          review_photo: true
        }
      ]);
    });
};
