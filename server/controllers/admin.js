

const express = require('express');
const { getAll, AddWorkout, update, remove, search, get, create, login} = require('../models/users');
const router = express.Router();
const { requireUser } = require('../middleware/authorization')

router
.patch('/:id', requireUser(true),(req, res, next) => {
    
    req.body.id = req.params.id;
    update(req.body)
    .then((user) => {
        res.send(user);
    }).catch(next);

})
.delete('/:id',requireUser(true), (req, res, next) => {
    
    remove(req.params.id)
    .then(() => {
        res.send({message: 'User removed'});
    }).catch(next);

})

module.exports = router;