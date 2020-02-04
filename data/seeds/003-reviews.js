exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('review').del()
    .then(function () {
      // Inserts seed entries
      return knex('review').insert([
        {
          stylist_id: 1,
          customer_id: 2,
          photo_id: 3,
          title: 'This is a review',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus accumsan nulla a elit hendrerit porta. Nam nec mollis velit. Nulla et ipsum sit amet quam fermentum interdum. In quis enim vulputate, convallis velit in, vehicula mauris. Mauris blandit arcu nisl, nec finibus augue molestie in. Sed vitae facilisis nisi. Etiam condimentum tortor ut iaculis commodo. Sed varius lacus purus, non dapibus turpis fermentum id. Phasellus dignissim, enim eu ornare pretium, libero eros iaculis urna, sit amet posuere mi ante vitae velit. Nunc nec ante ut purus commodo rhoncus. Morbi feugiat dolor sit amet magna rhoncus, vehicula condimentum purus tincidunt. Pellentesque convallis nisi nulla, non gravida est tempus vitae. Morbi metus diam, fermentum non rhoncus et, efficitur a tellus. Quisque leo diam, scelerisque eu dolor et, venenatis euismod magna. Proin eu nunc eu lectus placerat sollicitudin. Sed sodales lacus et elementum congue.',
          stylist_rating: 5,
          haircut_rating: 5
        }
      ]);
    });
};
