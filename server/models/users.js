// @ts-check

const { userInfo } = require('os');
const { ObjectId, connect } = require('./mongo');







/**
 * @typedef {Object} Bank
 * @property {string} cardExpire
 * @property {string} cardNumber
 * @property {string} cardType
 * @property {string} currency
 * @property {string} iban
 */

/**
 * @typedef {Object} Coordinates
 * @property {number} lat
 * @property {number} lng
 */

/**
 * @typedef {Object} Address
 * @property {string} address
 * @property {string} [city]
 * @property {Coordinates} coordinates
 * @property {string} postalCode
 * @property {string} state
 */

/**
 * @typedef {Object} Company
 * @property {Address} address
 * @property {string} department
 * @property {string} name
 * @property {string} title
 */


/**
 * @typedef {Object} workout
 * @property {String} latitude
 * @property {String} longitude
 * @property {number} distance
 * @property {number} speed
 * @property {String} date 
 * @property {String} time
 */

/**
 * @typedef {Object} BaseUser
 * @property {string} email
 * @property {string} password
 * @property {Object[]} workouts
 * @property {User[]} friends
 * @property {boolean} isAdmin
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} token
 * 
 * 
 * 
 * 
 */

/**
 * @typedef {Object} HasId
 * @property {number} id
 */

/**
 * @typedef {BaseUser & HasId} User
 */

/**
 * @type { {users: User[]} }
 */


/**
 * @returns {User[]} An array of products.
 */


const COLLECTION_NAME = 'users';
const WORKOUT_COLLECTION = 'workouts'
const {create : createWorkout} = require ('./workouts')

const ProdCollection = 'products';

const jwt =  require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

async function getAll() {
  const col = await getCollection();
   const users = await col.find().toArray();
  return {users};
}

async function getCollection() {
  const db = await connect();
  return db.collection(COLLECTION_NAME);
}


async function getCollectionProducts() {
  const db = await connect();
  return db.collection(ProdCollection);
}




async function findByEmail(email, password) {
  try {
   const col = await getCollection()
    const item = await col.findOne({ email })
    if (!item) {
      throw {
        message: 'Invalid email or password',
        status: 400
      }
    }

   

    const user = item
   
    
    return { user};
  } catch (error) {
    throw error

  }
}

async function AddWorkout(user) {
 
  const col = await getCollection();
  const result = await col.findOneAndUpdate(
    { _id: new ObjectId(user.id) },
    { $set: user },
    { returnDocument: 'after' },
  );
  return result;
}

async function update(myUser) {

  const col = await getCollection();
  const user = await col.findOneAndUpdate(
    { _id: new ObjectId(myUser.id) },
    { $set: myUser },
    { returnDocument: 'after' },
  );
  return {user};
}



async function remove(id) {
  const col = await getCollection();
  const result = await col.deleteOne({ _id: new ObjectId(id) });
  if(result.deletedCount === 0) {
    throw new Error('User not found');
  } 
}



async function search(query) {
  const col = await getCollectionProducts();
  const products = await col.find({
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } },
    ],
  }).toArray();

  return products;
}


async function get(id) {
  const col = await getCollection();
  const user = await col.findOne({ _id: new ObjectId(id) });
  return {user};

}



async function create(user) {
  
  const col = await getCollection();
  const result = await col.insertOne(user);
  user._id = result.insertedId;

  return user;
}

async function login(email, password) {
  try {
   const col = await getCollection()
    const item = await col.findOne({ email })
    if (!item) {
      throw {
        message: 'Invalid email or password',
        status: 400
      }
    }

   

    if (item.password != password) {
      throw {
        message: 'Invalid credntials',
        status: 400
      }
    }

    const user = { ...item, password: undefined, admin: true};
    const token = await generateJWT(user);
    
    return { user, token };
  } catch (error) {
    throw error

  }
}

function generateJWT(user) {
  return new Promise((resolve, reject) => {
    jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } , (err, token) => {
      if(err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  })
}

function verifyJWT(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if(err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  })
}



module.exports = {
  getAll, update, AddWorkout, remove, search, get, create, login, verifyJWT, findByEmail
};