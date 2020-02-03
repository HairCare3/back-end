# HairCare API

## Base URL: https://haircare-api-3.herokuapp.com/api

## Endpoints

### Authorization
| Request | URL | Description |
|---------|-----|-------------|
| POST | /auth/register |Add user to database. Requires at least `username`, `email`, `password`, `location`. |
| POST | /auth/login | Login. Requires `username` and `password`. Returns a token to be stored on the client side `authorization` header - all requests below this require a token. |

### General Users
| Request | URL | Description |
|---------|-----|-------------|
| GET | /users | Returns an array of all users. |
| GET | /users/:id | Returns a single user based on the given ID params. Will return an error if the ID doesn't exist. |
| PUT | /users/:id | Edit user. Returns the updated user object. Will return an error if user tries to edit another user. |
| DELETE | /users/:id | Delete user. Will return an error if the user tries to delete another user. |

### Stylists
| Request | URL | Description |
|---------|-----|-------------|
| GET | /stylists | Returns an array of all stylists. |
| GET | /stylists/:id | Returns a single stylist based on the given ID params. Will return an error if the ID doesn't exist, or if the ID belongs to a user with `is_stylist` set to `false`. |

### Photos
| Request | URL | Description |
|---------|-----|-------------|
| POST | /photos | Add photo to database. |
| PUT | /photos/:id | Edit photo `img_url` and/or `description`. Cannot edit other users' photos. |
| DELETE | /photos/:id | Delete photo. Cannot delete other users' photos. |


## Example Data

### User
```
{
    id: 1, // automatically generated
    username: "bianca",
    name: "Bianca Severino",
    email: "biancasev@gmail.com",
    password: "password", // will not return in requests
    location: "New Haven, CT",
    is_stylist: true, // defaults to false if not given
    profile_url: "https://avatars0.githubusercontent.com/u/10442143", // optional profile image
    profile_info: "Hi this is my profile!" // optional
}
```

### Photo
```
{
    id: 1, // automatically generated
    user_id: 2, // generated based on the id of the logged in user
    img_url: "https://picsum.photos/500",
    description: "This is a photo description." // optional
}
```