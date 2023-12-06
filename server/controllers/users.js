// @ts-check
/* B"H
*/

const express = require('express');
const { getAll, AddWorkout, update, remove, search, get, create, login} = require('../models/users');
const router = express.Router();
const { requireUser } = require('../middleware/authorization')

router.get('/', (req, res, next) => {

   
    getAll()
    .then(users=>{
        res.send(users)
    }).catch(next)

})


.get('/search' , (req, res, next) => {

    search(req.query.q)
    .then((users) => {
        res.send(users);
    }).catch(next);

})
.get('/:id', (req, res, next) => {

    get(req.params.id)
    .then((user) => {
      if(user) {
        res.send( user );
      }else {
        res.status(404).send({error: 'User not found'});
      }
    }).catch(next);
  
  })

.post('/', (req, res, next) => {

    create(req.body)
    .then((user) => {
        res.send(user);
    }).catch(next);

})
/*

Pretty sure this is the same as create
.post('/register', (req, res, next) => {

    const user = register(req.body);
    res.send(user);

}) */
.post('/login',  (req, res, next) => {

        const { email, password } = req.body;
        login(email, password)
        .then(x=>{
            res.send(x)
        }).catch(next)

})

.patch('/:id', (req, res, next) => {
    
    req.body.id = req.params.id;
    update(req.body)
    .then((user) => {
        res.send(user);
    }).catch(next);

})
.patch('/addWorkout', (req, res, next) => {
    
    
    AddWorkout(req.body)
    .then((user) => {
        res.send(user);
    }).catch(next);

})

.delete('/:id', (req, res, next) => {
    
    remove(req.params.id)
    .then(() => {
        res.send({message: 'User removed'});
    }).catch(next);

})

module.exports = router;