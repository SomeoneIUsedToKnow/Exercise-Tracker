// @ts-check
/* B"H
*/

const express = require('express');
const { getAll, AddWorkout, update, remove, search, get, create, login} = require('../models/users');
const router = express.Router();
const { requireUser } = require('../middleware/authorization')

router
.patch('/:id',requireUser(), (req, res, next) => {
    
    req.body.id = req.params.id;
    update(req.body)
    .then((user) => {
        res.send(user);
    }).catch(next);

})


module.exports = router;