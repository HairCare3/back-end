# HairCare API

## Base URL: https://haircare-api-3.herokuapp.com/api

## Endpoints

### Authorization
| Request | URL | Description |
|---------|-----|-------------|
| POST | /auth/register |Add user to database. Requires at least `username`, `email`, `password`, `location`. |
| POST | /auth/login | Login. Requires `username` and `password`. Returns a token to be stored on the client side `authorization` header - all requests below this require a token. |

#### Example register input:
```
{
    username: "username",
    password: "password",
    email: "email@email.com",
    location: "City, State",
    is_stylist: true, // optional, will default to false if not given
    profile_url: "http://imgurl.com/img.jpg", // optional profile iamge
    profile_info: "I am the user's profile description. I am optional and have no character limit."
}
```

#### Example login input:

```
{
    username: "username",
    password: "password"
}
```

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
| POST | /stylists/:id/reviews | Add a review for a stylist. See input requirements below. |

#### Example review input:
```
{
    title: "Review Title", // optional title
    text: "This is the body text of the review. I have no character limit.",
    stylist_rating: 4, // integer 1-5
    haircut_rating: 5, // integer 1-5
    img_url: "http://images.com/img.png", // optional photo
    img_description: "This is a photo description, I am not required."
}
```

### Photos
| Request | URL | Description |
|---------|-----|-------------|
| GET | /photos | Returns an array of all photos in the database. |
| GET | /photos/:id | Returns a photo by ID params. Will return an error if the ID doesn't exist. |
| POST | /photos | Add photo to database. |
| PUT | /photos/:id | Edit photo `img_url` and/or `description`. Cannot edit other users' photos. |
| DELETE | /photos/:id | Delete photo. Cannot delete other users' photos. |

#### Example photo input:
```
{
    img_url: "http://images.com/img.png",
    description: "This is a photo description, I am not required."
}
```

## Example Data

### General User
```
{
    id: 1, // automatically generated
    username: "bianca",
    name: "Bianca Severino",
    email: "biancasev@gmail.com",
    password: "password", // will not return in requests
    location: "New Haven, CT",
    is_stylist: false,
    profile_url: "https://avatars0.githubusercontent.com/u/10442143",
    profile_info: "Hi this is my profile!"
}
```

### Stylist
```
{
    id: 1, // automatically generated
    username: "bianca",
    name: "Bianca Severino",
    email: "biancasev@gmail.com",
    password: "password", // will not return in requests
    location: "New Haven, CT",
    is_stylist: true,
    profile_url: "https://avatars0.githubusercontent.com/u/10442143",
    profile_info: "Hi this is my profile!",
    photos: [
        ...array of photos
    ],
    reviews: [
        ...array of reviews
    ]
}
```

### Photo
```
{
    id: 1, // automatically generated
    user_id: 2, // generated based on id of logged in user
    img_url: "https://picsum.photos/500",
    description: "This is a photo description."
}
```

### Review
```
{
    id: 1, // automatically generated
    stylist_id: 1, // generated based on id of stylist
    customer_id: 2, // generated based on id of logged in user
    photo_id: 5, // generated based on id of photo given, will be null if no photo was uploaded
    title: "Review Title",
    text: "This is the body text of the review. I have no character limit.",
    stylist_rating: 4,
    haircut_rating: 5
}
```