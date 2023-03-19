const express = require('express');

const router = express.Router();

const {User} = require('../models/user');

const appDao = require('../models/app');

const resp = function (res, data, code, next) {
    res.status(code).json(data);
    return next();
};

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
router.post('/redis/user/add', function (req, res, next) {

    const body = req.body;

    appDao.add_user(body, function (response, code) {
        resp(res, response, code, next)
    })

});
router.get('/redis/user/:id', function (req, res, next) {
    const param = req.params;

    appDao.get_user(param, function (response, code) {
        resp(res, response, code, next)
    })
});
router.put('/redis/user/:id', function (req, res, next) {
    const id = req.params.id;
    const param = req.body;

    appDao.update_user(id, param, function (response, code) {
        resp(res, response, code, next)
    })

});
router.delete('/redis/user/:id', function (req, res, next) {
    const param = req.params;

    appDao.delete_user(param, function (response, code) {
        resp(res, response, code, next)
    })
});


module.exports = router;