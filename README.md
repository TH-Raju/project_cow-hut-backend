# Application Routes : 

## Live Link : https://cow-hut-backend-topaz.vercel.app


## User Routes -

### Create-User 

* /api/v1/auth/signup (POST)
* /api/v1/users (GET)
* /api/v1/users/648c6dbbe8eabbdd62b118c6 (GET)
* /api/v1/users/648c1d89bd5f821c46704cf0 (PATCH)
* /api/v1/users/648c1d30bd5f821c46704ce9 (DELETE)


## Cow Routes -

* /api/v1/cows (POST)
* /api/v1/cows (GET)
* /api/v1/cows/648c60be2c71a7e2e89fbf62 (GET)
* /api/v1/cows/648c61e5c10406fdc8ec4efe (PATCH)
* /api/v1/cows/648c60ab2c71a7e2e89fbf5f (DELETE)


### Pagination and Filtering routes of Cows

* /api/v1/cows?pag=1&limit=10
* /api/v1/cows/?sortBy=name&sortOrder=asc
* /api/v1/cows?sortBy=price&sortOrder=asc
* /api/v1/cows?minPrice=20000&maxPrice=70000
* /api/v1/cows?location=Chattogram
 


 ## Order Routes

* /api/v1/orders (GET)
* /api/v1/orders (POST)



### JSON Data
 ```
{
 "cow": "648c60be2c71a7e2e89fbf62",
 "buyer": "648c6dbbe8eabbdd62b118c6"
}
 ```