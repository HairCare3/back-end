const bc = require('bcryptjs')
const hash = bc.hashSync('password', 8)

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {
          username: 'bianca',
          password: hash,
          name: 'Bianca',
          email: 'biancasev@gmail.com',
          location: 'West Haven, CT',
          is_stylist: true,
          profile_url: 'https://avatars0.githubusercontent.com/u/10442143',
          profile_info: 'Hi this is my profile!'
        },
        {
          username: 'isabela',
          password: hash,
          name: 'Isabela',
          email: 'isabela@cat.com',
          location: 'West Haven, CT',
          is_stylist: false,
          profile_url: null,
          profile_info: 'I am a cat'
        },
        {
          username: 'best-stylist',
          password: hash,
          name: 'Best Stylist',
          email: 'best@stylist.com',
          location: 'West Haven, CT',
          is_stylist: true,
          profile_url: null,
          profile_info: `There's no one better than me!`
        }
      ]);
    });
};
