# HairCare API

## Base URL: https://haircare-api-3.herokuapp.com/api

## Endpoints

|Request|URL|Description|
|------------|---|-----------|
|POST|/auth/register|Add user to database. Requires at least `username`, `email`, `password`, `location`.|
|POST|/auth/login| Login. Requires `username` and `password`. Returns a token to be stored on the client side `authorization` header - all requests below this require a token.|
|GET|/users|Returns an array of all users.|
|GET|/users/:id|Returns a single user based on the given ID params. Will return an error if the ID doesn't exist.|
|GET|/stylists|Returns an array of all stylists.|
|GET|/stylists/:id|Returns a single stylist based on the given ID params. Will return an error if the ID doesn't exist, or if the ID belongs to a user with `is_stylist` set to `false`.|

## Example Data

### User Object:
```
{
    id: 1,
    name: "Bianca Severino",
    email: "biancasev@gmail.com",
    password: "password", // will not return in requests
    location: "New Haven, CT",
    is_stylist: true, // defaults to false if not given
    profile_url: "https://avatars0.githubusercontent.com/u/10442143", // optional
    profile_info: "Hi this is my profile!" // optional
}
```