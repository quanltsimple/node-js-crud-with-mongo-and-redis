# node-js-crud-with-mongo-and-redis
An application demonstrating use of docker compose, dockerfile , Mongo Db, Redis and Node Js to perform basic CRUD operation.

## Description
This app simply provide two end-points to add and get list of users. We use MongoDb for DB operation & Redis for caching i.e. storing and fetching the users details. 

<<**TODO:** Add update and delete operation as two more end-points. >>

User structure takes only first name and last name , you may add few too. 
```javascript
 firsName: {
        type: String,
        required: true
    },
   lastName: {
        type: String,
        required: true
    }
```

## Dependecies
1. Docker 
2. Node Js and Mongo DB will be fetched using docker file. :)

## Executing
1. Create a project direcotry (optional) 
```bash
$ mkdir -p Projects 
$ cd Projects
```
2. Clone the repo
```bash
~/Projects/$ gh repo clone quanltsimple/node-js-crud-with-mongo-and-redis
```
3. Go to app directory (~/Projects/node-js-crud-with-mongo/) and build the dockerfile. 
```bash
~node-js-crud-with-mongo/$ docker build -t node-js-crud-with-mongo-and-redis .
```
4. Run the image.
```bash
# list images and copy the id
~node-js-crud-with-mongo/$ docker images
# Run your image 
~node-js-crud-with-mongo/$ docker run -d -p 1337:1337 <image id>
```
5. Boom! Your end-points are ready to be accessed. 
```html
http://localhost:1337/api/users/add
http://localhost:1337/api/users
http://localhost:1337/redis/redis?completed=false
```

