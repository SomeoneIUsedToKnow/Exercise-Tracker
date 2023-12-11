// @ts-check
/* B"H
*/

const express = require('express');
const {  update, findByEmail } = require('../models/users');
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


.post('/search', requireUser(),(req, res, next) => {

    const { email, password } = req.body;
    findByEmail(email, password)
    .then(x=>{
        res.send(x)
    }).catch(next)

})
module.exports = router;