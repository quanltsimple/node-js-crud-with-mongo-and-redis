const express = require('express');
const axios = require('axios');
const redis = require('redis');

const router = express.Router();

const {User} = require('../models/user');

// Mongo DB

// Get all users
router.get('/mongo/api/users', (req, res) => {
    User.find({}, (err, data) => {
        if (!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    });
});

// Save the user to the
router.post('/mongo/api/users/add', (req, res) =>{
    const usr = new User({
        firsName: req.body.firsName,
        lastName: req.body.lastName
    }); 
    usr.save((err, data) => {
        res.status(200).json({
            code:200, 
            message:'User added susccessfully!', 
            User:data});
    })
})

// Redis
// Initiate and connect to the Redis client
const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    password: `${process.env.REDIS_PASSWORD}` });
(async () => {
    redisClient.on("error", (error) => console.error(`Ups : ${error}`));
    await redisClient.connect();
})();
async function fetchToDos(completed) {
    const cacheKey = `TODOS2_${completed}`;

    // First attempt to retrieve data from the cache
    try {
        const cachedResult = await redisClient.get(cacheKey);
        if (cachedResult) {
            console.log('Data from cache.');
            return cachedResult;
        }
    } catch (error) {
        console.error('Something happened to Redis', error);
    }

    // If the cache is empty or we fail reading it, default back to the API
    const apiResponse = await axios(`https://jsonplaceholder.typicode.com/todos?completed=${completed}`);
    console.log('Data requested from the ToDo API.');

    // Finally, if you got any results, save the data back to the cache
    if (apiResponse.data.length > 0) {
        try {
            await redisClient.set(
                cacheKey,
                JSON.stringify(apiResponse.data),
                { EX: 10 }
            );
        } catch (error) {
            console.error('Something happened to Redis', error);
        }
    }

    return apiResponse.data;
}

router.get('/redis', async (req, res) => {
    res.send(await fetchToDos(req.query.completed));
});


module.exports = router;